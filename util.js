import fs from 'fs';

const cast = (value) => {
  if (parseInt(value)) return parseInt(value);

  if (value === 'NULL' || value === 'false' || value === 'true') return value;

  return `'${value}'`;
};

const sql_field_value = (to_from) => {
  const fields_array = [];
  const values_array = [];

  to_from.map((item) => {
    fields_array.push(item.para);
    values_array.push(cast(item.value));
  });

  const values = values_array.toString();
  const fields = fields_array.toString();

  return { fields, values };
};

export const create_sql = (table, to_from) => {
  const { fields, values } = sql_field_value(to_from);

  const sql = `begin;\nINSERT INTO ${table}(${fields})\nVALUES(${values});\ncommit;`;

  return sql;
};

export const create_file = (name, text) => {
  let resultFile = fs.createWriteStream(`result/${name}.sql`);
  resultFile.on('error', function (err) {
    logError('Erro ao criar documento');
  });
  resultFile.write(text);
  resultFile.end();
};

export const logError = (text) => {
  console.log('\x1b[31m', '\n Erro: \n ' + text, '\x1b[0m');
};

export const logSuccess = (text) => {
  console.log('\x1b[32m', '\n' + text, '\x1b[0m');
};

export const logInfo = (text) => {
  console.log('\x1b[34m', '\n' + text, '\x1b[0m');
};
