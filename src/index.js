import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from "./RouteSwitch";
import {getFirebaseConfig} from "./firebase-config";
import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDownloadURL, getStorage, ref} from "firebase/storage";

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
const db = getFirestore(app);
async function getDefaultImage() {
    const defaultImageRef = ref(getStorage(), "gs://instagram-clone-9a4b3.appspot.com/default_photo.png");
    return await getDownloadURL(defaultImageRef);
}

async function isUserSignedIn() {
    return !!getAuth().currentUser;
}

function getUserName() {
    return getAuth().currentUser.displayName;
}

function getProfilePicUrl() {
    return getAuth().currentUser.photoURL;
}

function initFirebaseAuth() {
    onAuthStateChanged(getAuth(), authStateObserver);
}
function authStateObserver(user) {
    if (user) {
        const profilePicUrl = getProfilePicUrl();
        const userName = getUserName();
        console.log(profilePicUrl, userName);
    }
}
ReactDOM.render(
    <React.StrictMode>
        <RouteSwitch />
    </React.StrictMode>,
    document.getElementById('root')
);

export {isUserSignedIn, getUserName, getProfilePicUrl, getDefaultImage, initFirebaseAuth};