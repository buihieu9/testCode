let init = () => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCHwB8S2pGDecPzik0xB1JNyluCVohyTlk",
    authDomain: "chat-app-bc2a8.firebaseapp.com",
    databaseURL: "https://chat-app-bc2a8.firebaseio.com",
    projectId: "chat-app-bc2a8",
    storageBucket: "chat-app-bc2a8.appspot.com",
    messagingSenderId: "922317285890",
    appId: "1:922317285890:web:fbac59705c66cf64a7551b",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      console.log(user);
      if (user.emailVerified) {
        console.log(user.emailVerified);
        let currentUser = await model.getInfoUser(user.email);
        model.currentUser = {
          displayName: user.displayName,
          email: user.email,
          isTeacher: currentUser.isTeacher,
        };
        view.setActiveScreen("selectRoomScreen");
        // model.loadRooms()
      } else {
        // firebase.auth().signOut();
        view.setActiveScreen("loginScreen");
      }
    } else {
      view.setActiveScreen("loginScreen");
    }
  });
};

window.onload = init;
getDataFromDoc = (doc) => {
  const data = doc.data();
  data.id = doc.id;
  return data;
};
getDataFromDocs = (docs) => {
  return docs.map((item) => getDataFromDoc(item));
  // for (let index = 0; index < listData.length; index++) {
  //     const element = getDataFromDoc(docs[index])
  //     listData.push(element)
  // }
  // return listData;
};
