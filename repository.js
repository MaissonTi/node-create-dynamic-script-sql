import DB from './database';

export default class Repository {
  static async entityLog(ds_entidade, ds_id_entidade) {
    try {
      const result = await DB('tb_log')
        .where({
          ds_entidade,
          ds_id_entidade,
        })
        .select('*');

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  static async entityDetailLog(id_log) {
    try {
      const result = await DB('tb_log_detalhe')
        .where({
          id_log,
        })
        .select('*');

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
