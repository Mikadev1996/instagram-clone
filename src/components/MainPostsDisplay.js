import React, {useEffect, useState} from "react";
import NewPost from "./NewPost";
import MainPostStyle from './styles/MainPostsDisplay.sass'
import {getProfilePicUrl} from "../index";
import {getAuth} from "firebase/auth";
import {collection, getFirestore, onSnapshot, query, orderBy, limit} from "firebase/firestore";

//TODO: MAP POSTS FROM DATABASE TO NEWPOST COMPONENT

const MainPostsDisplay = () => {
    const [signedIn, setSignedIn] = useState(null);
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [images, setImages] = useState([]);
    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {
            setSignedIn(true);
            setUsername(user.displayName);
            setUserProfilePic(getProfilePicUrl());
        }
        else {
            setSignedIn(false);
            setUsername("");
            setUserProfilePic(null);
        }
    })

    function loadImages() {
        // Create the query to load the last 12 messages and listen for new ones.
        const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));

        // Start listening to the query.
        onSnapshot(recentMessagesQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                let image = change.doc.data();
                setImages([image]);
                // displayImages(change.doc.id, message.timestamp, message.name,
                //     message.text, message.profilePicUrl, message.imageUrl);
            });
        });
    }
    loadImages();

    // function displayImages(id, timestamp, name, text, picUrl, imageUrl) {
    //     const div = document.getElementById(id)
    //
    //     // profile picture
    //     if (picUrl) {
    //         div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
    //     }
    //
    //     div.querySelector('.name').textContent = name;
    //     const messageElement = div.querySelector('.message');
    //
    //     if (imageUrl) { // If the message is an image.
    //         const image = document.createElement('img');
    //         image.addEventListener('load', function() {
    //             messageListElement.scrollTop = messageListElement.scrollHeight;
    //         });
    //         image.src = imageUrl + '&' + new Date().getTime();
    //         messageElement.innerHTML = '';
    //         messageElement.appendChild(image);
    //     }
    //     // Show the card fading-in and scroll to view the new message.
    //     setTimeout(function() {div.classList.add('visible')}, 1);
    //     messageListElement.scrollTop = messageListElement.scrollHeight;
    //     messageInputElement.focus();
    // }


    return (
        <div className="content">
            <div id="container">
                {(images.length > 0) && images.map((data) => {
                    return (
                        <NewPost postUrl={data.imageUrl} profilePic={data.profilePicUrl} username={data.name}/>
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