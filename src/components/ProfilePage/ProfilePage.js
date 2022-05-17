import React, {useEffect, useState} from "react";
import NavBar from "../Nav/NavBar";
import ProfileStyle from '../styles/ProfilePage.scss';
import {getProfilePicUrl, getUserData, loadUserImages, updateDatabaseUserProfile} from "../../index";
import {getAuth} from "firebase/auth";
import ProfileDisplay from "./ProfileDisplay";

const ProfilePage = () => {
    const [editProfile, setEditProfile] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [userBio, setUserBio] = useState("");
    const isCurrentUser = true;

    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUsername(user.displayName);
            setUserProfilePic(getProfilePicUrl());
            getUserData(getAuth().currentUser.uid).then(userdata => setUserBio(userdata.bio));
        }
        else {
            setUsername("");
            setUserProfilePic(null);
        }
    })

    const handleEditProfile = () => {
        setEditProfile(editProfile => !editProfile);
    }

    useEffect(() => {
        if (username !== "") {
            loadUserImages(username)
                .then(querySnap => {
                    querySnap.forEach((doc) => {
                        let post = {...doc.data(), postId: doc.id};
                        if (post.imageUrl !== "LOADING_IMAGE_URL") {
                            setUserPosts(userPosts => [...userPosts, post]);
                        }
                    })
                })
        }
    }, [username]);

    const updateProfile = () => {
        const newProfilePic = document.getElementById("new-profile-image").files[0];
        const profileBio = document.getElementById("new-profile-bio").value;
        updateDatabaseUserProfile(newProfilePic, profileBio).then(r => {
            setEditProfile(false);
        })
    }

    return (
        <div className="app">
            <NavBar
                username={username}
                userProfilePic={userProfilePic}
            />
            <ProfileDisplay
                username={username}
                userProfilePic={userProfilePic}
                editProfile={editProfile}
                userPosts={userPosts}
                handleEditProfile={handleEditProfile}
                updateProfile={updateProfile}
                userBio={userBio}
                isCurrentUser={isCurrentUser}
            />
        </div>
    )
}

export default  ProfilePage;