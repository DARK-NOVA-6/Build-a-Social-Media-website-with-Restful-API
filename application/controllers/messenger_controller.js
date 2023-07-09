const model = require('../models/messenger_model');

_send_message =
    async (sender, receiver, message) => {
      return await model.get_message_by_id(
          await model.send_message(sender, receiver, message));
    };

_read_message =
    async (message_id) => {
      return await model.read_message(message_id);
    };

_get_messages =
    async (chat_id, page_number, page_size) => {
      return await model.get_messages(chat_id,
          (page_number - 1) * page_size + 1, page_number * page_size);
    };

_receive_all_message =
    async (user_id) => {
      await model.receive_all_message(user_id);
    };

_receive_message =
    async (message_id) =>
        await model.receive_message(message_id);

_get_conversations =
    async (user_id) => {
      await _receive_all_message(user_id);
      const result = await model.get_conversations(user_id);
      for (let resultElement of result) {
        resultElement.last_message = (await _get_messages(resultElement.id, 1,
            1))[0];
        resultElement.unread = await model.count_unread(resultElement.id, user_id);
      }
      return result;
    };


_get_message_by_id =
    async (chat_line_id) =>
        await model.get_message_by_id(chat_line_id);


module.exports = {
  send_message: _send_message,
  read_message: _read_message,
  receive_message: _receive_message,
  get_messages: _get_messages,
  get_message_by_id: _get_message_by_id,
  get_conversations: _get_conversations,
};