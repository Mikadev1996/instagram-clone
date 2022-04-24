import React, {useEffect, useState} from "react";
import NewPost from "./NewPost";
import MainPostStyle from './styles/MainPostsDisplay.sass'
import {getUserName, isUserSignedIn} from "../index";

//TODO: MAP POSTS FROM DATABASE TO NEWPOST COMPONENT

const MainPostsDisplay = () => {
    const [signedIn, setSignedIn] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        isUserSignedIn().then((r) => {
            setSignedIn(r);
        })
        if (signedIn) {
            setUsername(getUserName())
        }
    })

    return (
        <div className="content">
            <div id="container">
                <NewPost />
                <NewPost />
                <NewPost />
            </div>
            <div id="main-profile-display">
                <p>Profile Pic</p>
                <p>{username}</p>
                <p>Sign out</p>
            </div>
        </div>
    )
}

export default MainPostsDisplay;