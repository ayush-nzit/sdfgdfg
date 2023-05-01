var username = document.querySelector('.username');
group = document.querySelector('#group');

function registerOnSocket() {
  console.log('......... REGISTER ON SOCKERT...............');
  socket.emit('register', user);
}

/////////////////////PRIVATE VIDEO CALL SETUP//////////

document.querySelector('.private-videocall-icon').addEventListener('click', () => {
  const randomPrivateId = User.id;

  socket.emit('privateVideoCallEmit', {
    user,
    to: privateMessageTo,
    randomPrivateId,
  });

  joinRoomInit(randomPrivateId);

  joinStream();


  calllogUpdate({
    private: 'true',
    callTo: privateMessageTo,
    callerName: 'you',
    type: 'Outgoing',
  });

});

socket.on('privateVideoCallEmit', (data) => {
  console.log(data);
  joinRoomInit(data.randomPrivateId);

  const videoCallingDiv = document.querySelector('.video-calling-fet');
  calllogUpdate({
    private: 'true',
    callTo: data.user,
    callerName: data.user.username,
    type: 'Incoming',
  });

  videoCallingDiv.style.display = 'initial';
});

//////////////private message///////////////////////////

document.querySelector('.p-send').addEventListener('click', function () {
  console.log('click');
  // console.log(message.value)
  if (message.value.trim().length > 0) {
    console.log(privateMessageTo, 'sending msg too');

    socket.emit('pmessage', {
      user,
      to: privateMessageTo,
      message: message.value,
    });

    const now = new Date();
    const hour = now.getHours() % 12 || 12;
    const minute = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const timeNow = `${hour}:${minute} ${ampm}`;
    output.innerHTML +=
      '<div class="left-shift"><div class="out-wrap"><span>~' +
      user.username +
      '</span> <p>' +
      message.value +
      '</p> <div class="timer">' +
      timeNow +
      '</div></div></div>';

    message.value = '';
  }
});

socket.on('pmessage', (data) => {
  output.innerHTML +=
    '<div class="out-wrap"> <span>~' +
    data.username +
    '</span> <p>' +
    data.text +
    '</p> <div class="timer">' +
    data.time +
    '</div> </div>';
  // console.log('Received message:', data);
});

//////////////private message END///////////////////////////

//////////////////JOIN ROOM FUNCTION /////////////////////
function joinRoom({ joinedRoom, lastRoom }) {
  // document.querySelector(
  //   '.room-s'
  // ).innerHTML = `<option selected> ${joinedRoom.roomName}</option>`;

  updateRoomKist();

  console.log(user, joinedRoom, lastRoom);

  document.querySelector(
    '.about-l h4'
  ).innerHTML = `${joinedRoom.roomName} <i style="font-size: 12px !important; padding: 10px; color: red; "> Group chat</i>`;

  document.querySelector('.group-videocall-icon').style.display = 'initial';
  document.querySelector('.private-videocall-icon').style.display = 'none';
  document.querySelector('.video-icon').setAttribute('data-id', `${joinedRoom.roomId}`);

  joinRoomInit(joinedRoom.roomId);

  // Socket.emit(leavePrivateChat, (user.id))

  // if (lastRoom.roomId !== 'xxxx') {
  //   socket.emit('leaveRoom', ({ user, lastRoom }))
  //   console.log('leaving room' )
  // }
  socket.emit('joinRoom', { user, joinedRoom, lastRoom });
}

////////////////////JOIN ROOM FUNCTION End /////////////

/////SELECT ROOM om

var selectRoom = document.querySelector('.room-s');

selectRoom.addEventListener('click', () => {
  console.log(selectRoom.value);
  getRoom(selectRoom.value);
});

////////////////SELECTB ROOM END

function sendRoomMessage({ joinedRoom, lastRoom }) {
  joinRoom({ joinedRoom, lastRoom });
  document.querySelector('.send').style.display = 'initial';
  document.querySelector('.p-send').style.display = 'none';

  document.querySelector('.welcome-wraper').style.display = 'none';
}

socket.on('message', (msg) => {
  // console.log(msg);
  if (joinedRoom.joinRoom !== 'Select group') {
    output.innerHTML += `<div class="alert"> <span>${msg}</span> </div>`;
  }
  // console.log(msg)
});

socket.on('leaving', (msg) => {
  console.log(msg);

  output.innerHTML += `<div class="alert"> <span>${msg}</span> </div>`;

  // console.log(msg)
});

// Receive a private message
socket.on('private message', ({ senderID, message }) => {
  console.log(`Received message from user with ID ${senderID}: ${message}`);
});

socket.on('private_chat', function (data) {
  var username = data.username;
  var message = data.message;
  // console.log(data)
  // if(data.username !== name ){
  output.innerHTML +=
    '<div class="out-wrap"> <span>~' +
    data.username +
    '</span> <p>' +
    data.text +
    '</p> <div class="timer">' +
    data.time +
    '</div> </div>';

  // }

  // alert(username + ': ' + message);
});

function sendPrivateMessageTo(to) {
  console.log(to);
  document.querySelector('.welcome-wraper').style.display = 'none';

  const url = to.profileImg;

  document.querySelector('.private-profile-wrap').style.display = 'block';
  document.querySelector('.group-profile-wrap').style.display = 'none';

  document.querySelector('.private-profile-wrap>.user-profile-img >img').src =
    url ||
    'https://firebasestorage.googleapis.com/v0/b/whatsappclone-d3f9a.appspot.com/o/defaultprofile%2FprofileImg.webp?alt=media&token=70115bb1-280e-4714-bea1-bb5313be6e43';

  document.querySelector('.left-c>.img-div-l img').src =
    url ||
    'https://firebasestorage.googleapis.com/v0/b/whatsappclone-d3f9a.appspot.com/o/defaultprofile%2FprofileImg.webp?alt=media&token=70115bb1-280e-4714-bea1-bb5313be6e43';

  document.querySelector('.private-profile-wrap .user-profile-username > input').value = to.username || '';
  document.querySelector('.private-profile-wrap .user-profile-about > textarea').textContent = to.about || '';

  socket.emit('privateMessage', to);
  output.innerHTML = '';

  document.querySelector('.group-videocall-icon').style.display = 'none';
  document.querySelector('.private-videocall-icon').style.display = 'initial';

  // // console.log(privateMessageTo)
  document.querySelector('.send').style.display = 'none';
  document.querySelector('.p-send').style.display = 'initial';

  document.querySelector(
    '.about-l h4'
  ).innerHTML = `${privateMessageTo.username} <i style="font-size: 12px !important; padding: 10px; color: rgb(0, 144, 10); "> Private Chat</i>`;
}

var output = document.querySelector('#output');
(handle = document.querySelector('#handle')),
  (message = document.querySelector('#message')),
  (btn = document.querySelector('.send'));
feedback = document.querySelector('.feedback');
join = document.querySelector('.join');
chatWindow = document.querySelector('.chat-window ');

//////////// EMIT MESSAGES TO ROOM
btn.addEventListener('click', function () {
  if (message.value.trim().length > 0) {
    console.log(message.value);
    socket.emit('chat', { joinedRoom, user, message: message.value });
    message.value = '';
  }
});

//////Typing msg to all grp user

message.addEventListener('input', () => {
  socket.emit('typing', { handle: User.username });
});

////////////EMIT MESSAGE TO ROOM
socket.on('chat', (data) => {
  if (data.username === user.username) {
    output.innerHTML +=
      '<div class="left-shift"><div class="out-wrap"><span>~' +
      data.username +
      '</span> <p>' +
      data.text +
      '</p> <div class="timer">' +
      data.time +
      '</div></div></div>';
  } else {
    output.innerHTML +=
      '<div class="out-wrap"> <span>~' +
      data.username +
      '</span> <p>' +
      data.text +
      '</p> <div class="timer">' +
      data.time +
      '</div> </div>';
  }
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

////////// EMIT TYPING BROADCAST
var timer;
socket.on('typing', (data) => {
  feedback.innerHTML = '<p><i>' + data.handle + ' is typing... </i></p>';
  clearTimeout(timer);
  timer = setTimeout(function () {
    feedback.innerHTML = '';
  }, 400);
});

////////////////////////////VIDEO CALLING FUNCTIONS //////////////////////////

var videoCallIcon = document.querySelector('.video-icon');

videoCallIcon.addEventListener('click', () => {
  console.log('click', joinedRoom, User);

  joinStream();

  socket.emit('videoCall', { User, joinedRoom });

  calllogUpdate({
    private: 'false',
    callTo: joinedRoom,
    callerName: 'You',
    type: 'Outgoing',
  });
});

socket.on('videoCall', ({ User, joinedRoom }) => {
  console.log('...................................................');
  console.log(User, joinedRoom);

  const videoCallingDiv = document.querySelector('.video-calling-fet');

  calllogUpdate({
    private: 'false',
    callTo: joinedRoom,
    callerName: User.username,
    type: 'Incoming',
  });

  videoCallingDiv.style.display = 'initial';
});
