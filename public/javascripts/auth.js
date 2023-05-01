const modalLogin = document.querySelector('#modal-login');
const modalMain = document.querySelector('#modal-main');


// document.querySelector('.loading-page').style.display = 'none';
// module.exports = formatMessage;

var User; //

var uid;

setTimeout(closeLoding, 10000);

function closeLoding() {
  document.querySelector('.loading-page').style.display = 'none';

  // selfstatusDiv.style.display = 'none';
}

// const test = document.querySelector('#test-login');
// test.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const name = test['login-name'].value;

//   var number = test['login-number'].value;

//   db.collection('usersDAO')
//     .doc('657567567567567')
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         // User exists, continue with your application logic
//         User = doc.data()
//         console.log('User exists', User);
//       } else {
//         // User does not exist, create a new document with additional fields
//         const userRef = db.collection('usersDAO');
//         userRef
//           .add({
//             username: 'fghfgh',
//             phoneNumber: 'number',
//             status: 'true',
//             id: 'user.uid',
//           })
//           .then(() => {

//             User = {
//               username: 'username',
//               phoneNumber: 'number',
//               status: 'true',
//               id: '11111',
//             };

//             console.log('User created successfully!', User);

//             databaseRun()
//           })
//           .catch((error) => {
//             console.error('Error creating user: ', error);
//           });
//       }
//     })
// });

// listen for auth status changes

function updateStatusLogout() {
  console.log(User);

  db.collection('usersDAO')
    .doc(user.id)
    .update({
      // status: 'false',
    })
    .then(() => {
      console.log('click');

      console.log('1');
      auth.signOut();
    });
  console.log('2');
}

function setUser(uid) {
  // console.log(uid);
  db.collection('usersDAO')
    .doc(uid)
    .get()
    .then((doc) => {
      // console.log(doc.data(), uid);
      // console.log(doc.data());

      User = doc.data();

      console.log('User set ',User);
      if (User) {
        databaseRun();
      }
    })
    .catch((e) => {
      console.log(e.messsage);
    });
}

auth.onAuthStateChanged((user) => {
  // console.log(user, user.uid);
  if (user) {
    console.log('User loged in', user.uid);
    modalMain.style.display = 'initial';
    modalLogin.style.display = 'none';
    const uid = user.uid;

    setUser(uid);
  } else {
    modalLogin.style.display = 'flex';
    modalMain.style.display = 'none';

    console.log('user logged out');
    document.querySelector('.loading-page').style.display = 'none';

    // document.querySelector('#modal-login').style.display = 'flex';
  }
});

window.onload = function () {
  render();
};
function render() {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'recaptcha-container'
  );
  recaptchaVerifier.render();
}

//login-OTP
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const number = loginForm['login-number'].value;

  //it takes two parameter first one is number,,,second one is recaptcha
  auth
    .signInWithPhoneNumber(number, window.recaptchaVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      coderesult = confirmationResult;

      resendOtp();
      console.log(coderesult);
    })
    .catch(function (error) {
      alert(error.message);
    });
});

const otpForm = document.querySelector('#otp-form');
otpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const number = loginForm['login-number'].value;
  // const username = loginForm['login-name'].value;
  const code = otpForm['otp-number'].value;

  coderesult
    .confirm(code)
    .then(function (cred) {
      // document.querySelector('.loading-page').style.display = 'flex';
      var user = cred.user;
      console.log(user, user.uid);

      db.collection('usersDAO')
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // User exists, continue with your application logic
            User = doc.data();
            console.log('User exists', User);
            databaseRun();
          } else {
            // User does not exist, create a new document with additional fields
            const userRef = db.collection('usersDAO').doc(user.uid);
            userRef
              .set({
                
                phoneNumber: number,
                id: user.uid,
                profileImg:
                  'https://firebasestorage.googleapis.com/v0/b/whatsappclone-d3f9a.appspot.com/o/defaultprofile%2FprofileImg.webp?alt=media&token=70115bb1-280e-4714-bea1-bb5313be6e43',
              })
              .then(() => {
                User = {
                  about: 'Hey there! I am using WhatsApp.',
                  phoneNumber: number,
                  id: user.uid,
                  profileImg:
                    'https://firebasestorage.googleapis.com/v0/b/whatsappclone-d3f9a.appspot.com/o/defaultprofile%2FprofileImg.webp?alt=media&token=70115bb1-280e-4714-bea1-bb5313be6e43',
                };
                console.log('User created successfully!', User);
              })
              .catch((error) => {
                console.error('Error creating user: ', error);
              });

            // console.log('sds');
            setUser(user.uid);
          }
        })
        .catch((error) => {
          console.error('Error fetching user: ', error);
        });

      //   .doc(user.uid)
      //   .set({
      //     username: username,
      //     phoneNumber: number,
      //     status: 'true',
      //     id: user.uid,
      //   })
      //   .then(() => {

      //     //     console.log(User, 'User')

      //     database()
      //     daoRun();
      //     console.log('Document successfully written!');
      //   })
      //   .catch((error) => {
      //     console.error('Error writing document: ', error);
      //   });
    })

    .catch(function (error) {
      var invalid = document.querySelector('.invalid-otp p');
      invalid.style.display = 'initial';
      invalid.style.animation = 'error 1s ease-in-out 0s both';
      var otps = document.querySelectorAll('.form-control--otp');
      otps.forEach((e) => {
        e.style.borderBottom = '2px solid red';
      });
      // alert(error.message);
    });
});

// logout
const logout = document.querySelectorAll('#logout');

logout.forEach((log) => {
  log.addEventListener('click', (e) => {
    e.preventDefault();

    console.log('logout run');
    updateStatusLogout();
  });
});
