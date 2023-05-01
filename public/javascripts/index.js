const sendOtpBtn = document.getElementById('send-otp');
const countdown = document.getElementById('countdown');
let timeLeft = 30;
let countdownTimer;

var resendOtp = () => {
  sendOtpBtn.disabled = true;
  countdown.style.display = 'block';

  countdownTimer = setInterval(function () {
    timeLeft--;
    countdown.textContent = `Resend OTP in ${timeLeft} seconds`;
    if (timeLeft === 0) {
      clearInterval(countdownTimer);
      sendOtpBtn.disabled = false;
      countdown.textContent = '';
      timeLeft = 30;
    }
  }, 1000);
};

document.querySelector('#login-number').addEventListener('focus', () => {
  // console.log('234352');
  document.querySelector('.input-field').style.borderBottom = '2.1px solid #03c097	';
});

document.querySelector('#login-number').addEventListener('blur', () => {
  document.querySelector('.input-field').style.borderBottom = '2px solid grey';
});

var BACKSPACE_KEY = 8;
var ENTER_KEY = 13;
var TAB_KEY = 9;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var ZERO_KEY = 48;
var NINE_KEY = 57;

function otp(elementId) {
  var inputs = document.querySelectorAll('.js-otp-input');
  var callback = null;

  function init(completeCallback) {
    callback = completeCallback;
    for (i = 0; i < inputs.length; i++) {
      registerEvents(i, inputs[i]);
    }
  }

  function destroy() {
    for (i = 0; i < inputs.length; i++) {
      registerEvents(i, inputs[i]);
    }
  }

  function registerEvents(index, element) {
    element.addEventListener('input', function (ev) {
      onInput(index, ev);
    });
    element.addEventListener('paste', function (ev) {
      onPaste(index, ev);
    });
    element.addEventListener('keydown', function (ev) {
      onKeyDown(index, ev);
    });
  }

  function onPaste(index, ev) {
    ev.preventDefault();
    var curIndex = index;
    var clipboardData = ev.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('Text');
    for (i = 0; i < pastedData.length; i++) {
      if (i < inputs.length) {
        if (!isDigit(pastedData[i])) break;
        inputs[curIndex].value = pastedData[i];
        curIndex++;
      }
    }
    if (curIndex == inputs.length) {
      inputs[curIndex - 1].focus();
      callback(retrieveOTP());
    } else {
      inputs[curIndex].focus();
    }
  }

  function onKeyDown(index, ev) {
    var key = ev.keyCode || ev.which;
    if (key == LEFT_KEY && index > 0) {
      ev.preventDefault(); // prevent cursor to move before digit in input
      inputs[index - 1].focus();
    }
    if (key == RIGHT_KEY && index + 1 < inputs.length) {
      ev.preventDefault();
      inputs[index + 1].focus();
    }
    if (key == BACKSPACE_KEY && index > 0) {
      if (inputs[index].value == '') {
        // Empty and focus previous input and current input is empty
        inputs[index - 1].value = '';
        inputs[index - 1].focus();
      } else {
        inputs[index].value = '';
      }
    }
    if (key == ENTER_KEY) {
      // force submit if enter is pressed
      ev.preventDefault();
      if (isOTPComplete()) {
        callback(retrieveOTP());
      }
    }
    if (key == TAB_KEY && index == inputs.length - 1) {
      // force submit if tab pressed on last input
      ev.preventDefault();
      if (isOTPComplete()) {
        callback(retrieveOTP());
      }
    }
  }

  function onInput(index, ev) {
    var value = ev.data || ev.target.value;
    var curIndex = index;
    for (i = 0; i < value.length; i++) {
      if (i < inputs.length) {
        if (!isDigit(value[i])) {
          inputs[curIndex].value = '';
          break;
        }
        inputs[curIndex++].value = value[i];
        if (curIndex == inputs.length) {
          if (isOTPComplete()) {
            callback(retrieveOTP());
          }
        } else {
          inputs[curIndex].focus();
        }
      }
    }
  }

  function retrieveOTP() {
    var otp = '';
    for (i = 0; i < inputs.length; i++) {
      otp += inputs[i].value;
    }
    console.log(otp);

    document.querySelector('.otp-value').value = otp;
    return otp;
  }

  function isDigit(d) {
    return d >= '0' && d <= '9';
  }

  function isOTPComplete() {
    var isComplete = true;
    var i = 0;
    while (i < inputs.length && isComplete) {
      if (inputs[i].value == '') {
        isComplete = false;
      }
      i++;
    }
    return isComplete;
  }

  return {
    init: init,
  };
}

var otpModule = otp('otp-inputs');
otpModule.init(function (passcode) {});

/////////////////////////////SEND DATA TO UPDATE PROFILE

const profileUsername = document.querySelector('.user-profile-username>input');
const nameEditBtn = document.querySelector('.user-profile-username #name-edit-btn');
const profileAbout = document.querySelector('.user-profile-about>textarea');
const aboutEditBtn = document.querySelector('.user-profile-about button');

const profilePhoto = document.querySelector('.profile-photo-input');
const profilePhotoFrame = document.querySelector('.profile-photo-fram');

const statusProfilePhotoFrame = document.querySelector('.status-profile-photo-fram');

const profileSaveBtn = document.querySelector('.user-profile-saveBtn button');
nameEditBtn.addEventListener('click', () => {
  // console.log('click');
  profileUsername.disabled = false;
  profileUsername.focus();
  profileSaveBtn.style.display = 'initial';
  profileUsername.style.backgroundColor = 'rgba(139, 139, 139, 0.17)';
  // profileUsername.disabled = true;
});

aboutEditBtn.addEventListener('click', () => {
  // console.log('click');
  profileAbout.disabled = false;
  profileAbout.focus();
  profileAbout.style.backgroundColor = 'rgba(139, 139, 139, 0.17)';
  profileSaveBtn.style.display = 'initial';
  // profileUsername.disabled = true;
});

profilePhoto.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function (event) {
    profilePhotoFrame.src = event.target.result;
  });
  profileSaveBtn.style.display = 'initial';

  reader.readAsDataURL(file);
});

profileSaveBtn.addEventListener('click', () => {
  profileSaveBtn.style.backgroundColorolor = 'rgb(67, 181, 143)';
  profileUsername.disabled = true;
  profileAbout.disabled = true;
  profileAbout.style.backgroundColor = 'transparent';
  profileUsername.style.backgroundColor = 'transparent';
  profileSaveBtn.style.display = 'none';

  updateProfile({
    photo: profilePhoto,
    name: profileUsername.value,
    about: profileAbout.value,
  });
});

var navIcon = document.querySelectorAll('#nav-icon');
var mainNav = document.querySelector('.main-nav');
var navPage = document.querySelector('.nav-chat');
var icons = document.querySelectorAll('#nav-icon i');

document.querySelector(`.${navPage.getAttribute('class')} i`).style.backgroundColor = '#64636334';
document.querySelector(`.${navPage.getAttribute('class')} i`).style.borderRight = '3px solid #02c49a';

navIcon.forEach((icon) => {
  icon.addEventListener('mouseenter', () => {
    icon.style.backgroundColor = '#64636334';
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.backgroundColor = 'transparent';
  });
});
navIcon.forEach((icon) => {
  // console.log(icon);
  icon.addEventListener('click', (e) => {
    let id = e.target.parentElement.getAttribute('class');
    navPage = document.querySelector(`.${id}`);
    icons.forEach((i) => {
      i.style.border = 'none';
      i.style.backgroundColor = 'transparent';
    });
    document.querySelector(`.${id} i`).style.backgroundColor = '#64636334';

    document.querySelector(`.${id} i`).style.borderRight = '3px solid #02c49a';
  });
});

/////////////////////////////MENUE DOM MANUPULATION

var navChat = document.querySelector('.nav-chat i');
var navCall = document.querySelector('.nav-call i');
var navStatus = document.querySelector('.nav-status i');

var chatService = document.querySelector('.chat-service');
var callService = document.querySelector('.call-service');
var statusService = document.querySelector('.status-service');

var callContainer = document.querySelector('.call-container');
var chatContainer = document.querySelector('.chat-container');
var statusContainer = document.querySelector('.status-container');

navChat.addEventListener('click', () => {
  chatService.style.display = 'initial';
  callService.style.display = 'none';
  statusService.style.display = 'none';

  chatContainer.style.display = 'initial';
  callContainer.style.display = 'none';
  statusContainer.style.display = 'none';
});
navCall.addEventListener('click', () => {
  chatService.style.display = 'none';
  callService.style.display = 'initial';
  statusService.style.display = 'none';

  chatContainer.style.display = 'none';
  callContainer.style.display = 'initial';
  statusContainer.style.display = 'none';
});
navStatus.addEventListener('click', () => {
  chatService.style.display = 'none';
  callService.style.display = 'none';
  statusService.style.display = 'initial';

  chatContainer.style.display = 'none';
  callContainer.style.display = 'none';
  statusContainer.style.display = 'initial';
});

///////////////////////PROFIOLE ????????????????

var profileIcon = document.querySelector('.profile-icon');
var userProfileDiv = document.querySelector('.user-profile-wrap');
var floaterClose = document.querySelector('.profile-closing-wrap');
profileIcon.addEventListener('click', () => {
  floaterClose.style.display = 'initial';
  userProfileDiv.style.display = 'initial';

  // console.log('profile');
});

floaterClose.addEventListener('click', () => {
  // console.log('close');
  floaterClose.style.display = 'none';
  userProfileDiv.style.display = 'none';
  userGroupInfo.style.display = 'none';
});

document.querySelector('.g-next').addEventListener('click', () => {
  document.querySelector('.add-group').style.display = 'none';
  document.querySelector('.welcome-wraper').style.display = 'none';

  gflag = 1;
});

// var roomflag = 1;
var userGroupInfo = document.querySelector('.room-parti');
document.querySelector('.container nav .left').addEventListener('click', () => {
  userGroupInfo.style.display = 'initial';
  floaterClose.style.display = 'initial';
});

document.querySelector('.input input').addEventListener('click', () => {
  document.querySelector('.input').style.borderBottom = ' 2px solid red';
});

var gflag = 1;

document.querySelector('.g-cancel').addEventListener('click', () => {
  document.querySelector('.add-group').style.display = 'none';
  gflag = 1;
});

document.querySelector('#grp-btn').addEventListener('click', () => {
  document.querySelector('.input').style.borderBottom = ' 1px solid #dadadabc';
  if (gflag) {
    document.querySelector('.add-group').style.display = 'initial';
    gflag = 0;
  } else {
    document.querySelector('.add-group').style.display = 'none';
    gflag = 1;
  }
});

const selfStatusImg = document.querySelector('.self-status img-div img');

///////////////PRINT USER INFO
function printUserInfo(data) {
  var profileIcon = document.querySelector('#profileImgIcon img');
  const about = document.querySelector('#my-about-input');
  const name = document.querySelector('#my-name-input');

  // con
  // img.setAttribute('src', data.profileImg);

  const url = data.profileImg;
  // console.log(url);

  profileIcon.src =
    url ||
    'https://firebasestorage.googleapis.com/v0/b/whatsappclone-d3f9a.appspot.com/o/defaultprofile%2FprofileImg.webp?alt=media&token=70115bb1-280e-4714-bea1-bb5313be6e43';
  profilePhotoFrame.src =
    url ||
    'https://firebasestorage.googleapis.com/v0/b/whatsappclone-d3f9a.appspot.com/o/defaultprofile%2FprofileImg.webp?alt=media&token=70115bb1-280e-4714-bea1-bb5313be6e43';
  profileAbout.textContent = data.about || '';
  profileUsername.value = data.username || '';

  statusProfilePhotoFrame.src =
    url ||
    'https://firebasestorage.googleapis.com/v0/b/whatsappclone-d3f9a.appspot.com/o/defaultprofile%2FprofileImg.webp?alt=media&token=70115bb1-280e-4714-bea1-bb5313be6e43';
}

//////////////////////PRINT ALL USERS

function printAllUser(data) {
  document.querySelector('.online-user').innerHTML = '';
  if (data.length) {
    let html = '<p style="padding: 0 5px; color: aliceblue  ;"> Users</p>';
    data.forEach((doc) => {
      const u = doc.data();
      // console.log(u);
      const li = `<div class="user" user-id="${doc.id}">
          <div class="img-div">
            <img src="${u.profileImg}" alt="">
          </div>
          <div class="about">
            <h4>${u.username || u.phoneNumber}</h4> 
            <span>// send </span>
          </div>
          <div class="user-active on">
            <i class="ri-checkbox-blank-circle-fill"></i>
            <p>online</p>
            
          </div>
        </div>`;

      if (u.id !== user.id) {
        html += li;
      }
    });
    document.querySelector('.online-user').innerHTML = html;

    var u = document.querySelectorAll('.users-div .user');
    var m = document.querySelectorAll('.users-div .user .about h4');

    u.forEach((elm, i) => {
      // console.log(elm)
      elm.addEventListener('click', (e) => {
        const userId = elm.getAttribute('user-id');

        getUser(userId);

        // message = prompt("type your message");

        // socket.emit('private_chat', {
        //   to: privateMessageTo,
        //   message: message
        // });
      });
      //
    });
  } else {
    // guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
}

function printOfflineUser(data) {
  // Disable the div by changing its properties

  document.querySelector('.offline-user').innerHTML = ``;
  if (data.length) {
    let html = '<p style="padding: 0 5px; color: aliceblue  ;">Offline</p>';
    data.forEach((doc) => {
      const u = doc.data();
      // console.log(user)
      const li = `<div  class="user" user-id="${doc.id}">
          <div class="img-div">
            <img src="${u.profileImg}" alt="">
          </div>
          <div class="about">
            <h4>${u.username || u.phoneNumber}</h4> 
            <span>// send </span>
          </div>
          <div class="user-active on">
            <i class="ri-checkbox-blank-circle-fill"></i>
            <p>online</p>
            
          </div>
        </div>`;

      if (u.id !== user.id) {
        html += li;
      }
    });
    document.querySelector('.offline-user').innerHTML = html;

    var u = document.querySelectorAll('.users-div .user');
    var m = document.querySelectorAll('.users-div .user .about h4');

    u.forEach((elm, i) => {
      // console.log(elm)
      elm.addEventListener('click', (e) => {
        const userId = elm.getAttribute('user-id');

        getUser(userId);

        // message = prompt("type your message");

        // socket.emit('private_chat', {
        //   to: privateMessageTo,
        //   message: message
        // });
      });
      //
    });
  } else {
    // guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
}

//PRINTING ALL ROOM TO MEMBERAS

function printAllRoom(data) {
  // console.log(joinedRoom)
  document.querySelector('.room-s').innerHTML = `<option selected> ${joinedRoom.roomName}</option>`;
  if (data.length) {
    let html = '';
    data.forEach((doc) => {
      const room = doc.data();
      const li = `<option value="${doc.id}">'${room.roomName}'</option>`;

      if (joinedRoom.roomId !== doc.id) {
        html += li;
      }
    });
    document.querySelector('.room-s').innerHTML += html;
  } else {
    // guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
}

///////////////////////////////STATUS WIEWS
function printAllStatus(data) {
  console.log('PRINT ALL STATUS & USERS');
  if (data.length) {
    let userhtml = '<p style="color: antiquewhite;">Recent update</p>';
    var htmlAll = '';
    var closingparentTime = 0;
    data.forEach((doc) => {
      const u = doc.data();
      // console.log(u, 'status .........');

      if (u.status && u.id === User.id) {
        console.log('.........MY STATUS ..........');

        const status = u.status;
        let html = '';
        // console.log(status, 'personal status');
        status.forEach((e) => {
          const getTimeInsttant = getTimeAgo(e.timestamp.seconds);
          console.log(e.timestamp.seconds);
          const li = `<div class="swiper-slide">
                      <div class="status-profile-users">
                        <div class="div-img">
                          <img src="${u.profileImg}" alt="" />
                        </div>
                        <div class="status-username">
                          <h4>${u.username}</h4>
                          <p>${getTimeInsttant}</p>
                        </div>
                      </div>
                      <div class="status-img">
                        <img src="${e.post}" alt="" />
                      </div>
                    </div>`;

          html += li;
        });

        document.querySelector('.self-status-append').innerHTML = html;
      } else {
        if (u.status) {
          console.log('......ALL STATUS.........');

          const status = u.status;
          var lastPostAt;
          let html = '';
          var timer = 0;
          status.forEach((e) => {
            // console.log(e);
            const getTimeInsttant = getTimeAgo(e.timestamp.seconds);
            lastPostAt = getTimeInsttant

            const li = `<div class="swiper-slide">
                      <div class="status-profile-users">
                        <div class="div-img">
                          <img src="${u.profileImg}" alt="" />
                        </div>
                        <div class="status-username">
                          <h4>${u.username}</h4>
                          <p>${getTimeInsttant}</p>
                        </div>
                      </div>
                      <div class="status-img">
                        <img src="${e.post}" alt="" />
                      </div>
                    </div>`;

            html += li;
            timer = timer + 7000;
          });
          closingparentTime = timer;

          // console.log(timer,closingparentTime );
          htmlAll += ` <div class="swiper-slide child-slides" data-swiper-autoplay="${timer}">
                    <div class="swiper mySwiper2 swiper-v">
                      <div class="swiper-wrapper ">
                        
                        ${html}



                      </div>
                      <div class="swiper-button-next child-swiper-next"></div>
                      <div class="swiper-button-prev child-swiper-prev"></div>
                      <div class="swiper-pagination"></div>
                      <div class="autoplay-progress">
                        <svg viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span></span>
                      </div>
                    </div>
                  </div>`;

      
          const use = `<div class="status-user" userId="${u.id}">
                        <div class="img-div">
                          <img src="${u.profileImg}" alt="" />
                        </div>
                        <div class="about">
                          <h4>${u.username}</h4>
                        </div>
                        <div class="user-active on">
                        
                        <p>${lastPostAt}</p>
                      </div>
                       </div>`;

          userhtml += use;
        }
      }
    });

    // console.log(htmlAll);
    document.querySelector('.parent-swaper-append').innerHTML = htmlAll;

    document.querySelector('.recent-update').innerHTML = userhtml;

    // const selfstatusDiv = document.querySelector('.self-status-viewer');

    const allSatusView = document.querySelector('.all-status-viewer');

    var swipers = [];
    const selfstatusDiv = document.querySelector('.self-status-viewer');
    const viewYrStatus = document.querySelector('.show-yr-status');
    const allStatusDiv = document.querySelector('.all-status-viewer');
    const crossS = document.querySelectorAll('.cross-status');

    // const progressCircle = document.querySelector('.autoplay-progress svg');
    // const progressContent = document.querySelector(
    //   '.autoplay-progress span'
    // );

    var parentSwiper = new Swiper('.mySwiper', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 20,
      observer: true,
      controller: {
        inverse: true,
      },

      observeParents: true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
        stopOnLastSlide: true,
      },
      on: {
        slideChange: function () {
          // get the index of the parent swiper's active slide
          var parentSlideIndex = this.activeIndex;

          // loop through each child swiper and set its active slide index to zero
          for (var i = 0; i < swipers.length; i++) {
            swipers[i].slideTo(0);

            swipers[i].autoplay.start();
          }
        },
        reachEnd: function () {
          console.log('All slides have been swiped', closingparentTime);
          setTimeout(closeAllSlides, closingparentTime + 1000);
          // Execute your function here
        },
      },
    });

    var childSwipers = document.querySelectorAll('.mySwiper2');
    var swipers = [];

    for (var i = 0; i < childSwipers.length; i++) {
      const progressCircle = childSwipers[i].querySelector('.autoplay-progress svg');
      const progressContent = childSwipers[i].querySelector('.autoplay-progress span');
      swipers[i] = new Swiper(childSwipers[i], {
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
          stopOnLastSlide: true,
        },

        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // },
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },

        slidesPerView: 'auto',
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.child-swiper-next',
          prevEl: '.child-swiper-prev',
        },
        on: {
          autoplayTimeLeft(s, time, progress) {
            if (progressCircle) {
              progressCircle.style.setProperty('--progress', 1 - progress);
              // console.log(progressCircle); // check if progressCircle is null
              progressContent.textContent = `${Math.ceil(time / 1000)}s`;
            }
          },
          reachEnd: function () {
            // console.log('All slides have been swiped', closingparentTime);
            setTimeout(closeprivatestory, 7000);
            // Execute your function here
          },
        },
      });
    }

    function closeprivatestory() {
      //  allStatusDiv.style.display = 'none';
      selfstatusDiv.style.display = 'none';
    }

    function closeAllSlides() {
      allStatusDiv.style.display = 'none';
      // selfstatusDiv.style.display = 'none';
    }

    viewYrStatus.addEventListener('click', (e) => {
      // console.log('click');
      allStatusDiv.style.display = 'none';
      selfstatusDiv.style.display = 'initial';

      for (var i = 0; i < swipers.length; i++) {
        swipers[i].slideTo(0);
        swipers[i].autoplay.start();
      }
    });

    crossS.forEach((e) => {
      e.addEventListener('click', () => {
        selfstatusDiv.style.display = 'none';
        allStatusDiv.style.display = 'none';
      });
    });

    function showAllStatus(index) {
      console.log('click', index);

      parentSwiper.slideTo(index - 1);
      parentSwiper.autoplay.start();

      for (var i = 0; i < swipers.length; i++) {
        swipers[i].slideTo(0);
        swipers[i].autoplay.start();
      }

      selfstatusDiv.style.display = 'none';
      allStatusDiv.style.display = 'initial';
    }

    var um = document.querySelectorAll('.status-user');

    um.forEach((elm, index) => {
      // console.log(elm)
      elm.addEventListener('click', (e) => {
        // console.log(index-1);
        showAllStatus(index);
      });
      //
    });

    // selfstatusDiv.style.display = 'initial';

    // selfstatusDiv.style.display = 'initial';

    // selfstatusDiv.style.display = 'none';
  }
}

///////////////////////////////CALLING FUNCTIONS //////////////////////////

document.querySelector('#decline-btn').addEventListener('click', () => {
  document.querySelector('.video-calling-fet').style.display = 'none';
});

function getTimeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp * 1000); // convert seconds to milliseconds
  const seconds = Math.round((now - then) / 1000); // convert milliseconds to seconds

  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
}

/////////////////////////////////////PRINT CALL HISTORY //////////////////////////////////

function printCallHistory(data) {
  // console.log(joinedRoom)
  // document.querySelector('.room-s').innerHTML = `<option selected> ${joinedRoom.roomName}</option>`;
  if (data.length) {
    let html = '';
    data.forEach((doc) => {
      const log = doc.data();

      const mytime = getTimeAgo(log.startTime.seconds);
      // console.log(log.callerName);
      var li;
      if (log.private === 'true') {
        li = `<div class="call-user" userId="">
                    <div class="img-div">
                      <img src="${log.callTo.profileImg}" alt="" />
                      </div>
                    <div class="about">
                      <h4>${log.callTo.username}</h4>
                      <span><i class="fa-solid fa-video"></i> ${log.type}</span>
                    </div>
                    <div class="user-active on">
                      
                      <p>${mytime}</p>
                      </div>
                  </div>`;
      } else {
        li = `<div class="call-user" userId="">
                    <div class="img-div">
                      <img src="" alt="" />
                    </div>
                    <div class="about">
                      <h4>${log.callTo.roomName} (${log.callerName})</h4>
                     <span><i class="fa-solid fa-video"></i> ${log.type}</span>
                    </div>
                    <div class="user-active on">
                     
                      <p>${mytime}</p>
                    </div>
                  </div>`;
      }

      html += li;
    });
    document.querySelector('.calling-div').innerHTML = html;
  } else {
    // guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
}
