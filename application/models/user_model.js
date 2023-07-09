const {execute} = require('./query_executor');

_create =
    async (username, email, password, first_name, last_name) => {
      const query = 'insert into user_account (username, email, password, first_name, last_name) ' +
          'values (:username, :email, :password, :first_name, :last_name)';
      const binds = [username, email, password, first_name, last_name];
      const result = await execute(query, binds);
      if (result.error.length > 0)
        return {msg: result.error};
      else
        return true;
    };

_get_by_username =
    async (username) => {
      const query = 'select * from user_account where username = :username';
      const result = await execute(query, [username]);
      return result.data;
    };

_update_jwt_refresh =
    async (user_id, jwt_refresh) => {
      const query = 'update user_account set jwt_refresh = :jwt_refresh where id = :id';
      const binds = [jwt_refresh, user_id];
      return await execute(query, binds);
    };

_get_by_jwt_refresh =
    async (jwt_refresh) => {
      const query = 'select * from user_account where jwt_refresh = :jwt_refresh';
      const result = await execute(query, [jwt_refresh]);
      return result.data;
    };
_get_by_id =
    async (user_id) => {
      const query = 'select * from user_account where id = :id';
      return (await execute(query, [user_id])).data[0];
    };
module.exports = {
  create: _create,
  get_by_username: _get_by_username,
  update_jwt_refresh: _update_jwt_refresh,
  get_by_jwt_refresh: _get_by_jwt_refresh,
  get_by_id: _get_by_id,
};