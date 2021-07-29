import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC5ngyuu00h7PmL4xdW30BWQ_-bHHzV4J4",
  authDomain: "job-search-light.firebaseapp.com",
  projectId: "job-search-light",
  storageBucket: "job-search-light.appspot.com",
  messagingSenderId: "1067921060745",
  appId: "1:1067921060745:web:13012f2288b2ab46fd2758",
  measurementId: "G-F4NJSWX83D"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

export default firebase;