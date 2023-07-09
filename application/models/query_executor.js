const oracle_db = require('oracledb');
const {connection_attr} = require('../config/db.config');

module.exports = {
  execute: async function(query, binds, as_object = true) {
    let connection, msg = '', result = false;
    try {
      connection = await oracle_db.getConnection(connection_attr);
      result = await connection.execute(query, binds, {autoCommit: true});
      if (as_object && query.toLowerCase().startsWith('select'))
        result = await asObject(result);
    } catch (e) {
      msg = e.message;
      console.log(msg);
      console.log(query);
      console.log(binds);
    } finally {
      connection.release();
    }
    return {data: result, error: msg};
  },
  execute_function: async function(query) {
    let connection, msg = '', result = false;
    try {
      connection = await oracle_db.getConnection(connection_attr);
      result = await connection.execute(query,
          {ret: {dir: oracle_db.BIND_OUT}});
    } catch (e) {
      msg = e.message;
      console.log(msg);
      console.log(query);
    } finally {
      connection.release();
    }
    return result.outBinds.ret;
  },
};


async function asObject(data) {
  let result = [];
  for (let i = 0; i < data.rows.length; i++) {
    let row = {};
    for (let j = 0; j < data.metaData.length; j++) {
      row[data.metaData[j].name.toLowerCase()] = data.rows[i][j];
    }
    result.push(row);
  }
  return result;
}