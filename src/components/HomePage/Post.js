import React, {useEffect, useState} from "react";
import NewPostStyle from '../styles/NewPost.scss';
import moment from "moment";
import whiteLikeIcon from '../../images/white-like-icon.png';
import redLikeIcon from '../../images/red-like-icon.png';
import {getAuth} from "firebase/auth";
import {addProfileToDatabase, checkIfImageLiked, getProfilePicUrl, getUserProfilePic, likeImagePost} from "../../index";
import {doc, getDoc, getFirestore} from "firebase/firestore";

const Post = ({postUrl, profilePic, username, caption, timestamp, likes, id, posterUid}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [profileUrl, setProfileUrl] = useState("");
    let date;
    if (timestamp) {
        let d = new Date(timestamp * 1000);
        date = moment(d).format('MMMM Do YYYY, h:mm a');
    }

    useEffect(() => {
        checkIfImageLiked(id)
            .then(r => {
                if (r) {
                    setIsLiked(true);
                }
            });
        getUserProfilePic(posterUid)
            .then(r => {
                if (r) {
                    setProfileUrl(r);
                }
            })
    }, []);


    const likeIcon = isLiked ? redLikeIcon : whiteLikeIcon;

    return (
        <div className="post">
            <div className="post-nav">
                <div>
                    <img className="nav-profile-pic" alt="profile-pic" src={profileUrl} />
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
                    isLiked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
                    likeImagePost(id);
                }}/>
                <p className="post-likes">Liked by <strong>{likeCount}</strong> users</p>
                <p><strong>{username}</strong> {caption}</p>
                <p className="post-date">{date}</p>
            </div>
        </div>
    )
}

export default Post;