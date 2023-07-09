const {execute} = require('./query_executor');

_add =
    async (text, date, time, user_id) => {
      const query = 'insert into event (text, event_date, user_account_id) ' +
          'values (:text, to_date(:event_date , \'YYYY-MM-DD HH24-MI\'), :user_id )';
      const binds = [text, (date + ' ' + time).replace(':', '-'), user_id];
      return (await execute(query, binds)).data.rowsAffected > 0;
    };

_update =
    async (text, date, time, event_id, user_id) => {
      const query = [
        'update event set text = :text where user_account_id = :user_id and id = :id',
        'update event set event_date = to_date(:date_time , \'YYYY-MM-DD HH24-MI\')' +
        ' where user_account_id = :user_id and id = :id',
      ];
      const binds = [
        [text, user_id, event_id],
        [(date + ' ' + time).replace(':', '-'), user_id, event_id],
      ];
      let rows_affected = 0;
      rows_affected += (await execute(query[0], binds[0])).data.rowsAffected;
      rows_affected += (await execute(query[1], binds[1])).data.rowsAffected;
      return rows_affected > 0;
    };

_join =
    async (event_id, user_id) => {
      const query = 'insert into joined_event (event_id, user_account_id) ' +
          'values (:event_id, :user_id)';
      const binds = [event_id, user_id];
      return (await execute(query, binds)).data.rowsAffected > 0;
    };

_undo_join =
    async (event_id, user_id) => {
      const query = 'delete from joined_event where user_account_id = :user_id' +
          ' and event_id = :event_id';
      const binds = [user_id, event_id];
      return (await execute(query, binds)).data.rowsAffected > 0;
    };

_delete =
    async (event_id, user_id) => {
      const query = 'delete from event where user_account_id = :user_id' +
          ' and id = :event_id';
      const binds = [user_id, event_id];
      return (await execute(query, binds)).data.rowsAffected > 0;
    };

_get_interested =
    async (event_id) => {
      const query = 'select * from joined_event where event_id = :event_id';
      return (await execute(query, [event_id])).data;
    };

_get_next_events =
    async () => {
      const query = 'select * from event where event_date >= sysdate order by event_date';
      return (await execute(query, [])).data;
    };

_get_previous_events =
    async () => {
      const query = 'select * from event where event_date < sysdate order by event_date DESC';
      return (await execute(query, [])).data;
    };

_get_all =
    async () =>
        (await _get_next_events()).concat(await _get_previous_events()) ;

module.exports = {
  add: _add,
  update: _update,
  join: _join,
  undo_join: _undo_join,
  delete: _delete,
  get_interested: _get_interested,
  get_all: _get_all,
};