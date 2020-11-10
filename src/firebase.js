import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAef-AV1ff1lKTniKx7MSapenBJolTchgU",
  authDomain: "whatsapp-mern-610ba.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-610ba.firebaseio.com",
  projectId: "whatsapp-mern-610ba",
  storageBucket: "whatsapp-mern-610ba.appspot.com",
  messagingSenderId: "906400000608",
  appId: "1:906400000608:web:a6d8221faac59b64953105"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;
