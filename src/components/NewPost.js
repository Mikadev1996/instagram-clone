import React from "react";
import NewPostStyle from './styles/NewPost.sass';
import moment from "moment";

const NewPost = ({postUrl, profilePic, username, caption, timestamp, likes}) => {
    let date;
    if (timestamp) {
        let d = new Date(timestamp * 1000);
        date = moment(d).format('MMMM Do YYYY, h:mm a');
    }
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
                <p className="post-likes">Liked by <strong>{likes}</strong> users</p>
                <p><strong>{username}</strong> {caption}</p>
                <p className="post-date">{date}</p>
            </div>
        </div>
    )
}

export default NewPost;