import React from "react";
import NewPost from "./NewPost";
import MainPostStyle from './styles/MainPostsDisplay.sass'

//TODO: MAP POSTS FROM DATABASE TO NEWPOST COMPONENT

const MainPostsDisplay = () => {
    return (
        <div className="content">
            <div id="container">
                <NewPost />
                <NewPost />
                <NewPost />
            </div>
            <div id="main-profile-display">
                <p>Profile Pic</p>
                <p>Username</p>
                <p>Sign out</p>
            </div>
        </div>
    )
}

export default MainPostsDisplay;