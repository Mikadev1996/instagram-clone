import React from "react";
import NewPost from "./NewPost";

//TODO: MAP POSTS FROM DATABASE TO NEWPOST COMPONENT

const MainPostsDisplay = () => {
    return (
        <div className="content">
            <div id="container">
                <NewPost />
            </div>
        </div>
    )
}

export default MainPostsDisplay;