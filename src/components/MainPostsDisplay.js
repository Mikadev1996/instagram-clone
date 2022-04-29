import React, {useEffect, useState} from "react";
import NewPost from "./NewPost";
import MainPostStyle from './styles/MainPostsDisplay.sass'
import {getProfilePicUrl, loadImages} from "../index";
import {getAuth} from "firebase/auth";
import examplePost from './styles/ExamplePost.png';
import {collection, getDocs, getFirestore, limit, onSnapshot, orderBy, query} from "firebase/firestore";

//TODO: MAP POSTS FROM DATABASE TO NEWPOST COMPONENT

const MainPostsDisplay = () => {
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [images, setImages] = useState([]);
    const [queryImages, setQueryImages] = useState([]);
    const [newPostCount, setNewPostCount] = useState(0);

    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUsername(user.displayName);
            setUserProfilePic(getProfilePicUrl());
        }
        else {
            setUsername("");
            setUserProfilePic(null);
        }
    })

    useEffect(() => {
        async function loadImages() {
            const recentImagesQuery = query(collection(getFirestore(), 'posts'), orderBy('timestamp'), limit(3));
            const querySnapshot = await getDocs(recentImagesQuery);
            querySnapshot.forEach((doc) => {
                setQueryImages( queryImages => [...queryImages, doc.data()]);
            })

            onSnapshot(recentImagesQuery, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    setNewPostCount(newPostCount => newPostCount + 1);
                    let image = change.doc.data();
                    setQueryImages(queryImages => [...queryImages, image]);
                });
            });
            setImages(queryImages);
        }
        loadImages().then(r => {
            console.log(images);
        });
    }, [queryImages]);

    return (
        <div className="content">
            <div id="container">
                <NewPost profilePic={userProfilePic} postUrl={examplePost} username={username}/>
                {(images.length > 0) && images.map((data) => {
                    return (
                        <NewPost postUrl={data.imageUrl} profilePic={data.profilePicUrl} username={username} />
                    )
                })}
            </div>
            <div id="main-profile-display">
                {userProfilePic !== null && <img src={userProfilePic}  alt="profile pic" id="main-display-user-image"/>}
                <p>{username}</p>
            </div>
        </div>
    )
}

export default MainPostsDisplay;