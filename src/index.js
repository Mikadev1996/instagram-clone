import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from "./RouteSwitch";
import {getFirebaseConfig} from "./firebase-config";
import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword} from 'firebase/auth';

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
const db = getFirestore(app);

function signOutUser() {
    signOut(getAuth()).then(() => {
    }).catch(error => {
        console.log(error.message);
    })
}

function signUpUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log(user);
        }
    })

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            console.log(isUserSignedIn());
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })

}

function signInUser() {
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })

}

async function isUserSignedIn() {
    return !!getAuth().currentUser;
}

function getUserName() {
    return getAuth().currentUser.displayName;
}

ReactDOM.render(
    <React.StrictMode>
        <RouteSwitch />
    </React.StrictMode>,
    document.getElementById('root')
);

export {signUpUser, signOutUser, signInUser, isUserSignedIn, getUserName};