import React, {useState} from "react";
import NavBar from "./components/Nav/NavBar";
import UserDetails from "./UserDetails";
import {useParams} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {getProfilePicUrl, updateDatabaseUserProfile} from "./index";

const UserPage = () => {
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const { uid } = useParams()
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
        if (getAuth().currentUser.uid === uid) {
            setIsCurrentUser(true);
        }
    })

    const handleEditProfile = () => {
        setEditProfile(editProfile => !editProfile);
    }

    const updateProfile = () => {
        const newProfilePic = document.getElementById("new-profile-image").files[0];
        const profileBio = document.getElementById("new-profile-bio").value;
        updateDatabaseUserProfile(newProfilePic, profileBio).then(r => {
            setEditProfile(false);
        })
    }

    return (
        <div className="app">
            <NavBar />
            <UserDetails uid={uid}
                         isCurrentUser={isCurrentUser}
                         editProfile={editProfile}
                         updateProfile={updateProfile}
                         handleEditProfile={handleEditProfile}
            />
        </div>
    )
}

export default UserPage;