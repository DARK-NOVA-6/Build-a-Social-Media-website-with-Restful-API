online_friends = {};
conversations = {};
counter_messages = {};
setTimeout(() => {
  var random_number = 1;
  
  const socket = io('http://localhost:8892', {transports: ['websocket']});
  socket.emit('new-connection', user);
  
  socket.on('user-connected', friend_user => {
    console.log('ac');
    console.log(friend_user);
    online_friends[friend_user.id] = friend_user;
  });
  
  socket.on('get-old-conversations', convs => {
    console.log('one call ... getting conversations');
    console.log(convs);
  });
  
  socket.on('user-disconnected', friend_user_id => {
    console.log('dis');
    console.log(friend_user_id);
    delete online_friends[friend_user_id];
  });
  
  socket.on('chat-message-receive', data => {
    console.log('message received...');
    console.log(data);
    if (counter_messages[data.chat_id])
      counter_messages [data.chat_id]++;
    else
      counter_messages [data.chat_id] = 1;
    socket.emit('ev-message-received',
        {id: data.id, send_from: data.send_from});
  });
  
  read_message = (message_id, send_from) => {
    socket.emit('ev-message-read', {id: message_id, send_from: send_from});
  };
  
  send_message = (user_id, message) => {
    const data = {user_id: user_id, message: message, temp_id: ++random_number};
    console.log('sent message ...');
    console.log(data);
    socket.emit('chat-message-send', data);
    if (counter_messages[message.chat_id])
      counter_messages [message.chat_id]++;
    else
      counter_messages [message.chat_id] = 1;
  };
  
  socket.on('message-fetch', data => {
    console.log('older ::');
    console.log(data);
  });
  get_older_message = (chat_id) => {
    if (!counter_messages[chat_id])
      counter_messages [chat_id] = 0;
    socket.emit('message-fetch', {
      chat_id: chat_id,
      page_number: ++counter_messages [chat_id],
      page_size: 1,
    });
  };
  
  socket.on('message-sent-successfully', message => {
    console.log('message sent successfully');
    console.log(message);
  });
  
  socket.on('ev-message-received', message_id => {
    console.log('The message has been received to the other user');
    console.log(message_id);
  });
  
  socket.on('ev-message-read', message_id => {
    console.log('The message has been read from the other user');
    console.log(message_id);
  });
  
  socket.on('ev-message-typing-on', user_id => {
    console.log('user ' + user_id + ' is typing ...');
  });
  
  socket.on('ev-message-typing-off', user_id => {
    console.log('user ' + user_id + ' stopped typing.');
  });
  temp_timeout = null;
  typing_event = () => {
    user_id_t = document.getElementById('id1').value;
    if (temp_timeout !== null)
      clearTimeout(temp_timeout);
    else
      socket.emit('ev-message-typing-on', user_id_t);
    temp_timeout = setTimeout(() => {
      socket.emit('ev-message-typing-off', user_id_t);
      temp_timeout = null;
    }, 1000);
  };
  
}, 500);