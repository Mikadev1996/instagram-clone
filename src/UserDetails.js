import React, {useEffect, useState} from "react";
import {getUserData, loadUserImages, updateDatabaseUserProfile} from "./index";
import ProfileDisplay from "./components/ProfilePage/ProfileDisplay";

const UserDetails = ({uid, isCurrentUser}) => {
    const [userData, setUserData] = useState({});
    const [editProfile, setEditProfile] = useState(false);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        getUserData(uid).then(r => {
            setUserData(r)
        });
    }, [])

    useEffect(() => {
        if (userData.username !== "") {
            loadUserImages(userData.username)
                .then(querySnap => {
                    querySnap.forEach((doc) => {
                        let post = {...doc.data(), postId: doc.id};
                        if (post.imageUrl !== "LOADING_IMAGE_URL") {
                            setUserPosts(userPosts => [...userPosts, post]);
                        }
                    })
                })
        }
    }, [userData.username])

    const handleEditProfile = () => {
        setEditProfile(editProfile => !editProfile);
    }

    const updateProfile = () => {
        const newProfilePic = document.getElementById("new-profile-image").files[0];
        const profileBio = document.getElementById("new-profile-bio").value;
        updateDatabaseUserProfile(newProfilePic, profileBio).then(r => {
            setEditProfile(false);
            setUserData({...userData, ...r })
        })
    }

    return (
        <div>
            <h1>test</h1>
            <ProfileDisplay
                username={userData.username}
                userProfilePic={userData.profilePicUrl}
                userBio={userData.bio}
                userPosts={userPosts}
                isCurrentUser={isCurrentUser}
                editProfile={editProfile}
                updateProfile={updateProfile}
                handleEditProfile={handleEditProfile}
            />
        </div>
    )
}

export default UserDetails;