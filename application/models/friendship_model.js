const {execute, execute_function} = require('./query_executor');

_get_suggested =
    async (user_id, page_number, page_count = 20) => {
      const query = 'declare ret varchar2(1000); ' +
          'begin :ret := get_suggested_friends(' + user_id + ', ' +
          (page_count * (page_number - 1) + 1) + ', ' +
          page_count + '); end;';
      return (await execute_function(query) || '').split(' ');
    };

_get_common =
    async (user_id, user_id2) => {
      const query = 'declare ret varchar2(1000); ' +
          'begin :ret := get_common_friends(' + user_id + ', ' +
          user_id2 + '); end;';
      return (await execute_function(query) || '').split(' ');
    };

_get_count_common =
    async (user_id, user_id2) =>
        (await _get_common(user_id, user_id2)).length;

_get_user_friends =
    async (user_id) => {
      const query = 'declare ret varchar2(1000); ' +
          'begin :ret := get_user_friends(' + user_id + '); end;';
      return (await execute_function(query) || '').split(' ');
    };

_get_sent_requests =
    async (user_id) => {
      const query = 'select user_account_id1 as user_id2, send_date from request_friendship where user_account_id = :user_id';
      return (await execute(query, [user_id])).data;
    };
_get_received_requests =
    async (user_id) => {
      const query = 'select user_account_id as user_id2, send_date from request_friendship where user_account_id1 = :user_id';
      return (await execute(query, [user_id])).data;
    };

_delete_friend_request =
    async (user_id1, user_id2, table) => {
      const query = 'delete from ' + table +
          ' where user_account_id = :user_id1 and user_account_id1 = :user_id2';
      return (await execute(query,
          [user_id1, user_id2])).data.rowsAffected > 0;
    };
_deny_request =
    async (user_id, user_id2) =>
        await _delete_friend_request(user_id, user_id2, 'request_friendship') ||
        await _delete_friend_request(user_id2, user_id, 'request_friendship');

_accept_request =
    async (user_id, user_id2) => {
      if (await _delete_friend_request(user_id, user_id2,
          'request_friendship') === true) {
        const query = 'insert into friendship (user_account_id, user_account_id1) values' +
            '(:user_id1,:user_id2)';
        await execute(query, [user_id, user_id2]);
        return true;
      } else
        return false;
    };

_send_request =
    async (user_id, user_id2) => {
      const query = 'insert into request_friendship (user_account_id, user_account_id1) values' +
          ' (:user_id1, :user_id2)';
      return !(await execute(query, [user_id2, user_id])).error;
    };
_delete_friend =
    async (user_id, user_id2) =>
        await _delete_friend_request(user_id, user_id2, 'friendship') ||
        await _delete_friend_request(user_id2, user_id, 'friendship');

module.exports = {
  get_suggested: _get_suggested,
  get_count_common: _get_count_common,
  get_common: _get_common,
  get_user_friends: _get_user_friends,
  get_sent_requests: _get_sent_requests,
  get_received_requests: _get_received_requests,
  deny_request: _deny_request,
  accept_request: _accept_request,
  delete_friend: _delete_friend,
  send_request: _send_request,
};