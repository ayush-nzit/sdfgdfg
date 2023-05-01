var user;
var joinedRoom = { roomName: 'Select group', roomId: 'xxxx' };
var privateMessageTo;
var lastRoom;

function databaseRun() {
  user = User;
  console.log('..........DATABASE RUNNING.......', User);
  ///////REGISTER USER ON SOCKET
  registerOnSocket();

  // FEATCHING DATA TO PRINT USER
  db.collection('usersDAO').onSnapshot(
    (querySnapshot) => {
      var users = [];
      // querySnapshot.forEach((doc) => {
      //   // console.log(doc.id, " => ", doc.data());
      // });

      printAllUser(querySnapshot.docs);
    },
    (error) => {
      console.error('Error getting documents:', error);
    }
  );

  // db.collection('usersDAO')
  //   .where('status', '==', 'false')
  //   .onSnapshot(
  //     (querySnapshot) => {
  //       var users = [];
  //       querySnapshot.forEach((doc) => {
  //         // console.log(doc.id, " => ", doc.data());
  //       });

  //       printOfflineUser(querySnapshot.docs);
  //     },
  //     (error) => {
  //       console.error('Error getting documents:', error);
  //     }
  //   );

  ///////////FEATCHING ALL USER FROM DATABASE

  // db.collection('group').onSnapshot(
  //   (querySnapshot) => {
  //     var room = [];
  //     querySnapshot.forEach((doc) => {
  //       // console.log(doc.id, " => ", doc.data());
  //       //  console.log(doc.id, " => ", doc.data());
  //     });

  //     printAllRoom(querySnapshot.docs);
  //   },
  //   (error) => {
  //     console.error('Error getting documents:', error);
  //   }
  // );

  updateRoomKist();

  const setProfileIn = Math.floor(Math.random() * (30000 - 9000 + 1)) + 9000;
  if (!User.username) {
    // console.log('chal gaya')
    setTimeout(setProfileDetails, setProfileIn);
  }

  const userID = User.id;

  const userRef = firestore.collection('usersDAO').doc(userID);

  console.log('.............. FEATCJINNG USER DATA...................');
  userRef.onSnapshot(
    (doc) => {
      const data = doc.data();
      // console.log(data, User);
      printUserInfo(data);
    }, 
    (error) => {
      console.error('Error getting documents:', error);
    }
  );

  ///////// FEATCHING ALL STATUS

  db.collection('usersDAO').onSnapshot(
    (querySnapshot) => {
      var users = [];

      querySnapshot.forEach(e => {
        console.log(e.data())
      })
      printAllStatus(querySnapshot.docs);
    },
    (error) => {
      console.error('Error getting documents:', error);
    }
  );

  // const statusFedRef = db.collection('usersDAO').doc(User.id).collection('statusFed').orderBy('postTime', 'desc');
  // statusFedRef.onSnapshot((querySnapshot) => {
  //   // console.log(querySnapshot.docs)
  //   printAllStatus({ User, docs : querySnapshot.docs});
  // });



  
  ////////////////////////FEATCHING ALL CALL LOGS////////////////////////////////

  const callLogsRef = db
    .collection('usersDAO')
    .doc(User.id)
    .collection('callLogs')
    .orderBy('startTime', 'desc');
  callLogsRef.onSnapshot((querySnapshot) => {
   

    // console.log(querySnapshot.docs)
    printCallHistory(querySnapshot.docs)
  });

  ////////////////////////////////////database end////////////////////////////////

  document.querySelector('.loading-page').style.display = 'none';


}

//////////////////////////////////////////FUNCTIONS///////////////////

function updateRoomKist() {
  db.collection('group').onSnapshot(
    (querySnapshot) => {
      var room = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        //  console.log(doc.id, " => ", doc.data());
      });

      printAllRoom(querySnapshot.docs);
    },
    (error) => {
      console.error('Error getting documents:', error);
    }
  );




  
}

/////////////////////////// CALL HISTORY SETUP////////////////////////////////

function calllogUpdate({ private, callTo,callerName, type }) {
  // Get the file that was selected

  // Add a new call log to the user's call logs collection
  const callLogRef = db
    .collection('usersDAO')
    .doc(User.id)
    .collection('callLogs')
    .doc();
  const callLogId = callLogRef.id;
  const callLog = {
    private,
    callTo,
    callerName: callerName || 'private',
    startTime: new Date(),
    type,
  };
  callLogRef
    .set(callLog)
    .then(() => {
      console.log('done', callLogId);
    })
    .catch((error) => {
      console.error('Error saving call log: ', error);
    });
}

/////////////////////////////UPDATE PROFILE

function setProfileDetails() {
  floaterClose.style.display = 'initial';
  userProfileDiv.style.display = 'initial';
}

function updateProfile(update) {
  // Get the file that was selected

  const username = update.name;
  const about = update.about;
  const file = update.photo.files[0] || '';
  // console.log(update, username, about, file);

  // Create a reference to the file in Firebase Storage
  const storageRef = storage
    .ref()
    .child(`profile/user_${User.id}/${file.name}`);

  // Upload the file to Firebase Storage
  storageRef
    .put(file)
    .then((snapshot) => {
      // Get the download URL for the uploaded file
      return snapshot.ref.getDownloadURL();
    })
    .then((downloadURL) => {
      // Update the user's Firestore document with the download URL
      const userId = firebase.auth().currentUser.uid;
      const userRef = firestore.collection('usersDAO').doc(userId);
      // console.log(userId);
      return userRef.update({
        username: update.name,
        about: update.about,
        profileImg: downloadURL,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

////CREATING NEW GROUP

var newGroupName = document.querySelector('.grp-input');
document.querySelector('.g-next').addEventListener('click', () => {
  var room = newGroupName.value;

  const newRoom = {
    roomName: room,
    // merberIds: [user.id]
  };

  db.collection('group')
    .add(newRoom)
    .then((docRef) => {
      db.collection('group')
        .doc(docRef.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("User fields:", doc.data());
            console.log(lastRoom, joinedRoom, 'joinedRoom');

            lastRoom = joinedRoom;
            joinedRoom = doc.data();

            joinedRoom.roomId = doc.id;

            document.querySelector('.room-s');

            // console.log(lastRoom, joinedRoom, 'joinedRoom');
            joinRoom({ joinedRoom, lastRoom });

            // console.log('No such document!');
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // close the create modal & reset form
      console.log('created group');
    })
    .catch((err) => {
      console.log(err.message);
    });

  document.querySelector('.send').style.display = 'initial';
  document.querySelector('.p-send').style.display = 'none';
  output.innerHTML = '';
});

/////U{LOADING IMG FOR STATUS }

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  // Get the file that was selected
  const file = event.target.files[0];
  console.log(event, file);

  // Create a reference to the file in Firebase Storage
  const storageRef = storage.ref().child(`status/user_${User.id}/${file.name}`);

  // Update the user's Firestore document with the download URL
  const userId = firebase.auth().currentUser.uid;
  const userRef = firestore.collection('usersDAO').doc(userId);
  // console.log(userId);

  var status;
  // Upload the file to Firebase Storage
  storageRef
    .put(file)
    .then((snapshot) => {
      // Get the download URL for the uploaded file
      return snapshot.ref.getDownloadURL();
    })
    .then((downloadURL) => {
      status = {
        post: downloadURL,
        timestamp: new Date(),
      };

      return userRef.update({
        status: firebase.firestore.FieldValue.arrayUnion(status),
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  // Set a timer to delete the status update after 24 hours
  setTimeout(() => {
    firebase
      .firestore()
      .collection('usersDAO')
      .doc(userId)
      .get()
      .then((doc) => {
        const status = doc.data().status;
        const updatedstatus = status.filter((statusUpdate) => {
          // Return only the status updates that were added more than 24 hours ago
          return Date.now() - statusUpdate.timestamp.toDate().getTime() > 86400000;
        });
        // Update the user document with the new status updates array
        firebase.firestore().collection('users').doc(userId).update({
          status: updatedstatus,
        });
      });
  }, 86400000);
}

//  GET USER AND REAQUEST TO JOIN

function getUser(userId) {
  db.collection('usersDAO')
    .doc(userId)
    .get()
    .then((doc) => {
      var userData;
      if (doc.exists) {
        // do something with the user data
        userData = doc.data();
        userData.id = userId;
        console.log(userData);

        privateMessageTo = userData;
      } else {
        console.log('No such user document!');
      }

      sendPrivateMessageTo(privateMessageTo);
      console.log(privateMessageTo);
      return userData;
    })
    .catch((error) => {
      console.log('Error getting user document:', error);
    });
}

///////////GET ROOM AND RERQUEST TO JOIN

function getRoom(roomId) {
  db.collection('group')
    .doc(roomId)
    .get()
    .then((doc) => {
      var roomData;
      if (doc.exists) {
        // do something with the user data

        lastRoom = joinedRoom;

        roomData = doc.data();
        roomData.roomId = doc.id;
        // console.log(roomData);

        joinedRoom = roomData;

        console.log(lastRoom, joinedRoom, 'ejssss');

        if (joinedRoom.roomId !== lastRoom.roomId) {
          console.log(lastRoom, joinedRoom, 'ejssss');
          // lastRoom = joinedRoom;
          output.innerHTML = '';

          console.log('run2');

          sendRoomMessage({ joinedRoom, lastRoom });
        }
      } else {
        console.log('No such user document!');
      }
    })
    .catch((error) => {
      console.log('Error getting user document:', error);
    });
}
