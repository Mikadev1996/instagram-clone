import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from "./RouteSwitch";
import {getFirebaseConfig} from "./firebase-config";
import {initializeApp} from "firebase/app";
import {getFirestore, addDoc, collection, serverTimestamp, updateDoc} from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";

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

    uploadTask.on('state_changed',
        (snapshot) => {
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
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        },
        () => {
        }
    );
}


async function saveImagePost(file, caption) {
    try {
        const imageRef = await addDoc(collection(getFirestore(), 'posts'), {
            name: getUserName(),
            imageUrl: "LOADING_IMAGE_URL",
            caption: caption,
            profilePicUrl: getProfilePicUrl(),
            timestamp: serverTimestamp()
        });

        const filePath = `${getAuth().currentUser.uid}/${imageRef.id}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);

        // 3 - Generate a public URL for the file.
        const publicImageUrl = await getDownloadURL(newImageRef);

        // 4 - Update the chat message placeholder with the image's URL.
        await updateDoc(imageRef,{
            imageUrl: publicImageUrl,
            storageUri: fileSnapshot.metadata.fullPath
        });
    }
    catch (error) {
        console.log('Error uploading file to cloud: ', error);
    }
}

ReactDOM.render(
    <React.StrictMode>
        <RouteSwitch />
    </React.StrictMode>,
    document.getElementById('root')
);

export {isUserSignedIn, getUserName, getProfilePicUrl, getDefaultImage, getUserEmail, saveImagePost};