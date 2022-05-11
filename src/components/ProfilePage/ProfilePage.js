import React, {useEffect, useState} from "react";
import NavBar from "../Nav/NavBar";
import ProfileStyle from '../styles/ProfilePage.scss';
import PreviewPost from "./PreviewPost";
import {getProfilePicUrl, updateDatabaseUserProfile} from "../../index";
import {getAuth} from "firebase/auth";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import ProfileDisplay from "./ProfileDisplay";

const ProfilePage = () => {
    const [editProfile, setEditProfile] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);

    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUsername(user.displayName);
            setUserProfilePic(getProfilePicUrl());
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
        async function loadUserImages() {
            if (username !== "") {
                const recentImagesQuery = query(collection(getFirestore(), 'posts'), where("name", "==", username));
                const querySnapshot = await getDocs(recentImagesQuery);
                querySnapshot.forEach((doc) => {
                    let post = {...doc.data(), postId: doc.id};
                    if (post.imageUrl !== "LOADING_IMAGE_URL") {
                        setUserPosts(userPosts => [...userPosts, post]);
                    }
                })
            }
        }
        loadUserImages()
    }, [username]);


    const updateProfile = () => {
        const newProfilePic = document.getElementById("new-profile-image").files[0];
        const profileBio = document.getElementById("new-profile-bio");
        updateDatabaseUserProfile(newProfilePic, profileBio).then(r => {
            console.log("profile update done?")
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
            />
        </div>
    )
}

export default  ProfilePage;