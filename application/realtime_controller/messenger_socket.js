const controller = require('../controllers/messenger_controller');
const MESSENGER_PORT = process.env.MESSENGER_PORT || 8892;
const io = require('socket.io')(MESSENGER_PORT);
const online_users = {};

io.on('connection', socket => {
  let _user, friends = {};
  
  socket.on('new-connection', async user => {
    _user = user;
    const {get_friends_by_id} = require('../controllers/friendship_controller');
    friends = await get_friends_by_id(user.id);
    
    for (const socket_user in online_users)
      if (friends.includes(socket_user)) {
        socket.emit('user-connected', online_users[socket_user].user);
        online_users[socket_user].socket.emit('user-connected', user);
      }
    online_users[user.id] = {user: user, socket: socket};
    socket.emit('get-old-conversations',
        await controller.get_conversations(user.id),
    );
  });
  
  socket.on('disconnect', () => {
    for (const socket_user in online_users)
      if (socket_user !== _user.id)
        online_users[socket_user].socket.emit('user-disconnected', _user.id);
    delete online_users[_user.id];
  });
  
  socket.on('ev-message-received', async message => {
    await controller.receive_message(message.id);
    if (online_users[message.send_from])
      online_users[message.send_from].socket.emit('ev-message-received',
          message.id);
  });
  
  socket.on('message-fetch', async data => {
    const result = await controller.get_messages(data.chat_id, data.page_number,
        data.page_size);
    socket.emit('message-fetch', result);
  });
  
  socket.on('ev-message-read', async message => {
    await controller.read_message(message.id);
    if (online_users[message.send_from])
      online_users[message.send_from].socket.emit('ev-message-read',
          message.id);
  });
  
  socket.on('chat-message-send', async data => {
    const message = await controller.send_message(_user.id, data.user_id,
        data.message);
    if (online_users[data.user_id])
      online_users[data.user_id].socket.emit('chat-message-receive', message);
    socket.emit('message-sent-successfully',
        {...message, temp_id: data.temp_id});
  });
  
  socket.on('ev-message-typing-on', user_id => {
    if (online_users[user_id])
      online_users[user_id].socket.emit('ev-message-typing-on', _user.id);
  });
  
  socket.on('ev-message-typing-off', user_id => {
    if (online_users[user_id])
      online_users[user_id].socket.emit('ev-message-typing-off', _user.id);
  });
  
  
});


