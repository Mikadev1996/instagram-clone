import React, {useEffect, useState} from "react";
import NewPost from "./NewPost";
import MainPostStyle from './styles/MainPostsDisplay.sass'
import {getProfilePicUrl, getUserName, initFirebaseAuth, isUserSignedIn} from "../index";
import {getAuth, onAuthStateChanged} from "firebase/auth";

//TODO: MAP POSTS FROM DATABASE TO NEWPOST COMPONENT

const MainPostsDisplay = () => {
    const [signedIn, setSignedIn] = useState(null);
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);
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

    useEffect(() => {
        return () => {
        };
    }, []);


    return (
        <div className="content">
            <div id="container">
                <NewPost />
                <NewPost />
                <NewPost />
            </div>
            <div id="main-profile-display">
                {userProfilePic !== null && <img src={userProfilePic}  alt="profile pic" id="main-display-user-image"/>}
                <p>{username}</p>
            </div>
        </div>
    )
}

export default MainPostsDisplay;