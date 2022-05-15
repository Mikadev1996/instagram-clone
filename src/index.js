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
    getDoc,
    doc,
    arrayUnion,
    arrayRemove,
    increment,
} from "firebase/firestore";
import {getAuth, updateProfile} from 'firebase/auth';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
const db = getFirestore(app);


async function getDefaultImage() {
    const defaultImageRef = ref(getStorage(), "gs://instagram-clone-9a4b3.appspot.com/default_photo.png");
    return await getDownloadURL(defaultImageRef);
}

function isUserSignedIn() {
    return !!getAuth().currentUser;
}

function getUserName() {
    return getAuth().currentUser.displayName;
}

function getProfilePicUrl() {
    return getAuth().currentUser.photoURL;
}

async function getUserProfilePic(uid) {
    const userRef = doc(getFirestore(), "users", uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    return userData.profilePicUrl;
}

async function getUserProfileBio(uid) {
    const userRef = doc(getFirestore(), "users", uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    return userData.bio;
}

async function checkIfImageLiked(postId) {
    const userRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    return (userData.likedPosts.includes(postId));
}

async function getPost(postId) {
    const postRef = doc(getFirestore(), "posts", postId);
    const postSnap = await getDoc(postRef);
    return {...postSnap.data(), postId};
}

async function likeImagePost(postId) {
    const userRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
    const postRef = doc(getFirestore(), "posts", postId);
    const userSnap = await getDoc(userRef);
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

async function addProfileToDatabase(username) {
    await setDoc(doc(getFirestore(), 'users', getAuth().currentUser.uid), {
        username: username,
        userid: getAuth().currentUser.uid,
        likedPosts: [],
        bio: "",
        profilePicUrl: "https://firebasestorage.googleapis.com/v0/b/instagram-clone-9a4b3.appspot.com/o/default_photo.png?alt=media&token=97360e51-f17e-4989-9ced-a0bd4f066e2b",
    })
}

async function saveImagePost(file, caption) {
    try {
        const imageRef = await addDoc(collection(getFirestore(), 'posts'), {
            name: getUserName(),
            posterUid: getAuth().currentUser.uid,
            imageUrl: "LOADING_IMAGE_URL",
            likes: 0,
            caption: caption,
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

        return imageRef.id;
    }
    catch (error) {
        console.log('Error uploading file to cloud: ', error);
    }
}

async function updateDatabaseUserProfile(file, bio) {
    try {
        const userRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
        if (file) {
            const filePath = `${getAuth().currentUser.uid}/${userRef.id}/${file.name}`;
            const newImageRef = ref(getStorage(), filePath);
            const fileSnapshot = await uploadBytesResumable(newImageRef, file);
            const publicImageUrl = await getDownloadURL(newImageRef);

            await updateDoc(userRef, {
                profilePicUrl: publicImageUrl,
            })

            updateProfile(getAuth().currentUser, {
                photoURL: publicImageUrl,
            })
        }

        if (bio) {
            await updateDoc(userRef, {
                bio: bio,
            })
        }
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

export {isUserSignedIn, getUserName, getProfilePicUrl, getDefaultImage, saveImagePost, addProfileToDatabase, likeImagePost, checkIfImageLiked, updateDatabaseUserProfile, getPost, getUserProfilePic, getUserProfileBio};