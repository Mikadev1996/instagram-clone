import React from 'react';
import ReactDOM from 'react-dom';
import RouteSwitch from "./RouteSwitch";
import {getFirebaseConfig} from "./firebase-config";
import {initializeApp} from "firebase/app";
import {
    getFirestore,
    addDoc,
    setDoc,
    collection,
    serverTimestamp,
    updateDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    getDocs,
    getDoc,
    doc,
    arrayUnion,
    arrayRemove,
    increment,
} from "firebase/firestore";
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

function getProfilePicUrl() {
    return getAuth().currentUser.photoURL;
}

async function checkIfImageLiked(postId) {
    const userRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    return (userData.likedPosts.includes(postId));
}

async function likeImagePost(postId) {
    const userRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
    const postRef = doc(getFirestore(), "posts", postId);
    const userSnap = await getDoc(userRef);
    const postSnap = await getDoc(postRef);
    const userData = userSnap.data();


    if (!userData.likedPosts.includes(postId)) {
        await updateDoc(userRef, {
            likedPosts: arrayUnion(postId)
        })
        await updateDoc(postRef, {
            likes: increment(1)
        })
    }
    else {
        await updateDoc(userRef, {
            likedPosts: arrayRemove(postId)
        })
        await updateDoc(postRef, {
            likes: increment(-1)
        })
    }
}

async function addProfileToDatabase() {
    await setDoc(doc(getFirestore(), 'users', getAuth().currentUser.uid), {
        username: getUserName(),
        userid: getAuth().currentUser.uid,
        likedPosts: [],
    })
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

ReactDOM.render(
    <React.StrictMode>
        <RouteSwitch />
    </React.StrictMode>,
    document.getElementById('root')
);

export {isUserSignedIn, getUserName, getProfilePicUrl, getDefaultImage, saveImagePost, addProfileToDatabase, likeImagePost, checkIfImageLiked};