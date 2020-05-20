import Repository from './repository';
import _ from 'lodash';

import { create_sql, create_file, logInfo, logError } from './util';

class Services {
  async startProcess(id_entity, { table, entity, to_from }) {
    logInfo(`Buscando entidades do ${entity} id ${id_entity}. Aguarde...`);

    const result = await this.findValues(entity, id_entity, to_from);

    if (result) {
      const sql = create_sql(table, result);
      await create_file(table, sql);

      console.log(`Consulta concluida! Arquivo criado "${table}.sql"`);
    } else {
      logError(`Valor não encontrado para ${entity} de id ${id_entity}`);
    }
  }

  async findValues(entity, id_entity, to_from) {
    const query = await Repository.entityLog(entity, id_entity);

    if (query.length > 0) {
      console.log('Log encontrados', _.map(query, 'id_log'));

      console.log('Copiado valores DE_PARA');
      await Promise.all(
        query.map(async (record) => {
          const result = await Repository.entityDetailLog(record.id_log);

          result.map((item) => {
            to_from.map((de_para) => {
              if (de_para.de === 'ID') de_para.value = id_entity;

              if (!de_para.hasOwnProperty('value')) de_para.value = 'NULL';

              if (
                de_para.de === item.nm_atributo &&
                item.ds_valor_atual !== null
              ) {
                de_para.value = de_para.relationship
                  ? item.ds_valor_atual.split(':')[0]
                  : item.ds_valor_atual;
              }
            });
          });
        }),
      );

      return to_from;
    }
  }
}

export default new Services();
