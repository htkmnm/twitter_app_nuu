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

firebase.firestore().settings({
    ignoreUndefinedProperties: true,
})

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

//Logout機能
export const userLogout = async () => {
    firebase.auth()
        .signOut()
        .then(() => {
            console.log('Logout')
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
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

export const sendMessage = async (name: string, message: string, avater: string) => {
    console.log(name, '/', message, 'check')
    await db
        .collection("messages")
        .add({
            name,
            message,
            createAt: new Date(),
            avater
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
};

export default firebase;