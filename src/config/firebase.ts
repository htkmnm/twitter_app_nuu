import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
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
export const db = firebase.firestore();

//GoogleLogin機能
const provider = new firebase.auth.GoogleAuthProvider();
export const googleLogin = async () => {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */

            // This gives you a Google Access Token. You can use it to access the Google API.

            // The signed-in user info.
            var user = result.user;
            console.log(user?.displayName)
            // ...
        })
};

export const userCurrent = async () => {
    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;
        if (user) {
            // User is signed in.
        } else {
            // No user is signed in.
        }
    });
}

//Login確認メール
export const emailVerification = async () => {
    const user = firebase.auth().currentUser;

    user!.sendEmailVerification().then(function () {
        console.log('確認メール送信')
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
};

//password再設定
export const resetPassword = async (emailAddress: string) => {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress)
        .then(function () {
            console.log("email sent")
            // Email sent.
        })
};

export default firebase;