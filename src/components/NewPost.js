import React, {useState} from "react";
import NewPostStyle from './styles/NewPost.sass';
import moment from "moment";
import whiteLikeIcon from './styles/white-like-icon.png';
import redLikeIcon from './styles/red-like-icon.png';
import {getAuth} from "firebase/auth";
import {addProfileToDatabase, getProfilePicUrl, likeImagePost} from "../index";

const NewPost = ({postUrl, profilePic, username, caption, timestamp, likes, id}) => {
    const [isLiked, setIsLiked] = useState(false);
    let date;
    if (timestamp) {
        let d = new Date(timestamp * 1000);
        date = moment(d).format('MMMM Do YYYY, h:mm a');
    }

    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {

        }
    })

    const likeIcon = isLiked ? redLikeIcon : whiteLikeIcon;

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
                <img src={likeIcon} alt="like" className="like-icon" onClick={() => {
                    setIsLiked(!isLiked);
                    likeImagePost(id);
                }}/>
                <p className="post-likes">Liked by <strong>{likes}</strong> users</p>
                <p><strong>{username}</strong> {caption}</p>
                <p className="post-date">{date}</p>
            </div>
        </div>
    )
}

export default NewPost;