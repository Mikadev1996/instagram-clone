import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import ProfileStyle from './styles/ProfilePage.sass';
import PreviewPost from "./PreviewPost";
import {getProfilePicUrl, getUserName, isUserSignedIn} from "../index";
import EditProfileMenu from "./EditProfileMenu";
import {getAuth} from "firebase/auth";

const ProfilePage = () => {
    const [editProfile, setEditProfile] = useState(false);
    const [signedIn, setSignedIn] = useState(null);
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);

    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {
            setSignedIn(true);
            setUsername(getUserName());
            setUserProfilePic(getProfilePicUrl());
        }
        else {
            setSignedIn(false);
        }
    })

    const handleEditProfile = () => {
        setEditProfile(editProfile => !editProfile);
    }

    const updateProfile = () => {
        const newProfilePic = document.getElementById("new-profile-image").files[0];
        const profileBio = document.getElementById("new-profile-bio");
    }

    return (
        <div className="app">
            <NavBar />
            <div className="content">
                {editProfile && <EditProfileMenu handleEditProfile={handleEditProfile} updateProfile={updateProfile}/>}
                <div className="profile-container">
                    <div className="profile-info">
                        <div className="profile-info-picture"><img src={userProfilePic} alt="user-profile-pic" className="page-profile-pic"/></div>
                        <div className="profile-info-details">
                            <div className="profile-info-detail">
                                <p className="profile-username">{username}</p>
                                <button onClick={() => handleEditProfile()}>Edit Profile</button>
                            </div>
                            <ul className="profile-info-detail">
                                <li>No. Posts</li>
                                <li>No. Followers</li>
                                <li>No. Following</li>
                            </ul>
                            <div className="profile-info-detail">
                                User Biography
                            </div>
                        </div>
                    </div>
                    <hr className="profile-separator"/>
                    <div className="profile-user-posts">
                        <h1 className="posts-title">POSTS</h1>
                        <div className="grid-container">
                            <PreviewPost />
                            <PreviewPost />
                            <PreviewPost />
                            <PreviewPost />
                            <PreviewPost />
                            <PreviewPost />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  ProfilePage;