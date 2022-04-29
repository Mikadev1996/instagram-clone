import React from "react";
import NewPostStyle from './styles/NewPost.sass';

const NewPost = ({postUrl, profilePic, username}) => {
    return (
        <div className="post">
            <div className="post-nav">
                <div>
                    <img className="nav-profile-pic" alt="profile-pic" src={profilePic} />
                </div>
                <div>
                    <p>{username}</p>
                </div>
            </div>
            <div>
                <img src={postUrl} alt="post" className="post-image"/>
            </div>
            <div className="post-info">
                <p>Likes</p>
                <p>{username}: Caption</p>
                <p>Date Posted</p>
            </div>
        </div>
    )
}

export default NewPost;