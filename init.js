var config = {
  apiKey: "AIzaSyB_Z99bH3ZNH7SmN1DNxiu9SQb4qyGyppg",
  authDomain: "class-number-importer.firebaseapp.com",
};

const app = firebase.initializeApp(config);
const auth = app.auth();
const signInWithPopup = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider).catch((error) => {
    console.log(error);
  });
};

signInWithPopup();

