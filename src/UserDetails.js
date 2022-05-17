import React, {useEffect, useState} from "react";
import {getUserData, loadUserImages} from "./index";
import ProfileDisplay from "./components/ProfilePage/ProfileDisplay";

const UserDetails = ({uid, isCurrentUser, editProfile, updateProfile, handleEditProfile}) => {
    const [userData, setUserData] = useState({});
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
    }, [userData])

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