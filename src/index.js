import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from "./RouteSwitch";
import {getFirebaseConfig} from "./firebase-config";
import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDownloadURL, getStorage, ref, uploadBytesResumable,} from "firebase/storage";

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

function getUserEmail() {
    return getAuth().currentUser.email.split("@")[0];
}


function getProfilePicUrl() {
    return getAuth().currentUser.photoURL;
}

function uploadImage(file, metadata, name) {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + `${getUserEmail()}/` + name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
}
ReactDOM.render(
    <React.StrictMode>
        <RouteSwitch />
    </React.StrictMode>,
    document.getElementById('root')
);

export {isUserSignedIn, getUserName, getProfilePicUrl, getDefaultImage, uploadImage, getUserEmail};