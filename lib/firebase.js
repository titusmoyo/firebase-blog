// This is where we'll add all of the functions for interacting with
// Firebase services in our app.

import firebase from 'firebase/app';
import 'firebase/database';

const initFirebase = async () => {
  // This check prevents us from initializing more than one app.
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
};

// Gets all posts from the database in reverse chronological order.
export const getPosts = async () => {
  // Because our exported functions can be called at any time from
  // any place in our app, we need to make sure we've initialized
  // a Firebase app every time these functions are invoked.
  initFirebase();

  const posts = await firebase
    .database()
    .ref('/posts')
    .orderByChild('dateCreated')
    .once('value')
    .then((snapshot) => {
      const snapshotVal = snapshot.val();

      const result = [];
      for (var slug in snapshotVal) {
        const post = snapshotVal[slug];
        result.push(post);
      }

      return result.reverse();
    });

  return posts;
};


function dtt(){
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAANdLEtpQ7Qg61HWWp0qXh8jiFZotd-Ns",
  authDomain: "nextjs-firebase-blog-7b934.firebaseapp.com",
  databaseURL: "https://nextjs-firebase-blog-7b934-default-rtdb.firebaseio.com",
  projectId: "nextjs-firebase-blog-7b934",
  storageBucket: "nextjs-firebase-blog-7b934.appspot.com",
  messagingSenderId: "213836057079",
  appId: "1:213836057079:web:0d8537cdb7992d6ef446f2"
};
}