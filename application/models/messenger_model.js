const {execute} = require('./query_executor');

_get_chat_id =
    async (_sender, _receiver) => {
      const sender = _sender > _receiver ? _sender : _receiver;
      const receiver = _sender > _receiver ? _receiver : _sender;
      const query_chat = 'select id from chat where user_account_id = :user_id1' +
          ' and user_account_id1 = :user_id2';
      let temp_chat_id = (await execute(query_chat, [sender, receiver])).data;
      if (temp_chat_id.length === 0) {
        const query_ = 'insert into chat (user_account_id, user_account_id1) ' +
            'values (:user_id1 ,:user_id2)';
        await execute(query_, [sender, receiver]);
        temp_chat_id = (await execute(query_chat, [sender, receiver])).data;
      }
      return temp_chat_id[0].id;
    };

_receive_all_message =
    async (user_id) => {
      const query1 = 'update chat_line set received_date = sysdate ' +
          ' where send_from = 2 and received_date is null and' +
          ' chat_id in (select id from chat where chat.user_account_id > chat.user_account_id1' +
          ' and chat.user_account_id = :user_id )';
      const query2 = 'update chat_line set received_date = sysdate' +
          ' where send_from = 1 and received_date is null and' +
          ' chat_id in (select id from chat where chat.user_account_id < chat.user_account_id1' +
          ' and chat.user_account_id = :user_id )';
      await execute(query1, [user_id]);
      await execute(query2, [user_id]);
    };

_get_conversations =
    async (user_id) => {
      const query = 'select * from chat where user_account_id = :user_id or user_account_id1 = :user_id';
      return (await execute(query, [user_id])).data;
    };

_get_message_by_id =
    async (chat_line_id) => {
      const query = 'select * from chat_line where id = :chat_line_id';
      const result = (await execute(query, [chat_line_id])).data[0];
      result.send_from = await _get_id_send_from(result.send_from,
          result.chat_id);
      return result;
    };

_get_messages =
    async (chat_id, start, end) => {
      const col = ' id , message, send_date, received_date, read_time, send_from, chat_id ';
      const query0 = '(select ' + col + ' from chat_line ' +
          'where chat_id = :chat_id order by send_date DESC)';
      const query1 = '(select rownum as r, ' + col + 'from ' + query0 + ')';
      const query2 = 'select ' + col + ' from ' + query1 +
          ' where r >= :start_row and r <= :end_row';
      const result = (await execute(query2, [chat_id, start, end])).data;
      for (let resultElement of result)
        resultElement.send_from = await _get_id_send_from
        (resultElement.send_from, chat_id);
      return result;
    };

_read_message =
    async (message_id) => {
      const query = 'update chat_line set read_time = sysdate where id = :id';
      await execute(query, [message_id]);
    };

_receive_message =
    async (message_id) => {
      const query = 'update chat_line set received_date = sysdate where id = :id';
      await execute(query, [message_id]);
    };

_send_message =
    async (_sender, _receiver, message) => {
      const send_from = _sender > _receiver ? 1 : 2;
      const chat_id = await _get_chat_id(_sender, _receiver);
      const query = 'insert into chat_line (message, chat_id,send_from) values' +
          ' (:message, :chat_id, :send_from)';
      await execute(query, [message, chat_id, send_from]);
      const query_ = 'select max(id) as id from chat_line where chat_id = :chat_id';
      return (await execute(query_, [chat_id])).data[0].id;
    };

_get_id_send_from =
    async (send_from, chat_id) => {
      const query = 'select user_account_id, user_account_id1 from chat where id =:id';
      const result = (await execute(query, [chat_id])).data[0];
      return send_from === 1 ? result.user_account_id : result.user_account_id1;
    };

_count_unread =
    async (chat_id, user_id) => {
      const temp = await _get_id_send_from(1, chat_id) ;
      const send_from = temp != user_id? 1          : 2;
      const query = 'select count(*) as c from chat_line where chat_id = :chat_id' +
          ' and read_time is null and send_from = :send_from';
      return (await execute(query, [chat_id, send_from])).data[0].c;
    };

module.exports = {
  get_conversations: _get_conversations,
  get_messages: _get_messages,
  get_message_by_id: _get_message_by_id,
  read_message: _read_message,
  send_message: _send_message,
  receive_message: _receive_message,
  receive_all_message: _receive_all_message,
  count_unread: _count_unread,
};