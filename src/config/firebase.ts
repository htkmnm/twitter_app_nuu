import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"
import 'firebase/storage';

const {
    REACT_APP_FIREBASE_APIKEY,
    REACT_APP_FIREBASE_AUTHDOMAIN,
    REACT_APP_FIREBASE_DATABASEURL,
    REACT_APP_FIREBASE_PROJECTID,
    REACT_APP_FIREBASE_STORAGEBUCKET,
    REACT_APP_FIREBASE_MESSAGINGSENDERID,
    REACT_APP_FIREBASE_APPID
} = process.env;

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_APIKEY,
    authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: REACT_APP_FIREBASE_DATABASEURL,
    projectId: REACT_APP_FIREBASE_PROJECTID,
    storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: REACT_APP_FIREBASE_APPID
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const googleLogin = async () => {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.

            // The signed-in user info.
            var user = result.user;
            console.log(user?.displayName)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
};

export const emailVerification = async () => {
    const user = firebase.auth().currentUser;

    user!.sendEmailVerification().then(function () {
        console.log('確認メール送信')
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}

export const resetPassword = async () => {
    var auth = firebase.auth();
    var emailAddress = "noreply@twitter-app-nuu.firebaseapp.com"

    auth.sendPasswordResetEmail(emailAddress)
        .then(function () {
            console.log("email sent")
            // Email sent.
        })
        .catch(function (error) {
            // An error happened.
            var errorCode = error.code;
        });
};

export default firebase;