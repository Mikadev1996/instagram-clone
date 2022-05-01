import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from "./RouteSwitch";
import {getFirebaseConfig} from "./firebase-config";
import {initializeApp} from "firebase/app";
import {
    getFirestore,
    addDoc,
    collection,
    serverTimestamp,
    updateDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    getDocs
} from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import NewPost from "./components/NewPost";

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

async function saveImagePost(file, caption) {
    try {
        const imageRef = await addDoc(collection(getFirestore(), 'posts'), {
            name: getUserName(),
            imageUrl: "LOADING_IMAGE_URL",
            likes: 0,
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

async function loadImages() {
    let tempArr = [];
    const recentImagesQuery = query(collection(getFirestore(), 'posts'), orderBy('timestamp', 'desc'), limit(12));
    const querySnapshot = await getDocs(recentImagesQuery);
    querySnapshot.forEach((doc) => {
        tempArr.push(doc.data());
    })
    onSnapshot(recentImagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            let image = change.doc.data();
            displayImages(change.doc.id, image.timestamp, image.name, image.profilePicUrl, image.imageUrl);
        });
    });
}

function displayImages(id, timestamp, name, picUrl, imageUrl) {
    const imageContainer = document.getElementById("container");
    const image = <NewPost profilePic={picUrl} postUrl={imageUrl}/>
    // imageContainer.innerHTML = '';
    // imageContainer.appendChild(image);
}

ReactDOM.render(
    <React.StrictMode>
        <RouteSwitch />
    </React.StrictMode>,
    document.getElementById('root')
);

export {isUserSignedIn, getUserName, getProfilePicUrl, getDefaultImage, getUserEmail, saveImagePost, loadImages};