import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import ProfileStyle from './styles/ProfilePage.sass';
import PreviewPost from "./PreviewPost";
import {getProfilePicUrl, getUserName, isUserSignedIn} from "../index";
import EditProfileMenu from "./EditProfileMenu";
import {getAuth} from "firebase/auth";
import {collection, getDocs, getFirestore, limit, orderBy, query, where} from "firebase/firestore";
import NewPost from "./NewPost";

const ProfilePage = () => {
    const [editProfile, setEditProfile] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [signedIn, setSignedIn] = useState(null);
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

    useEffect(() => {
        async function loadUserImages() {
            const recentImagesQuery = query(collection(getFirestore(), 'posts'), where("name", "==", username));
            const querySnapshot = await getDocs(recentImagesQuery);
            querySnapshot.forEach((doc) => {
                let post = {...doc.data(), postId: doc.id};
                if (post.imageUrl !== "LOADING_IMAGE_URL") {
                    console.log(post);
                    setUserPosts(userPosts => [...userPosts, post]);
                }
            })
        }
        loadUserImages()
    }, [username]);

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
                            {(userPosts.length > 0) && userPosts.map((data) => {
                                return (
                                    <PreviewPost imageUrl={data.imageUrl}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  ProfilePage;