import React from "react";

const ProfileInfo = ({username, userProfilePic, userPosts, handleEditProfile, userBio}) => {
    return (
        <div className="profile-info">
            <div className="profile-info-picture"><img src={userProfilePic} alt="user-profile-pic" className="page-profile-pic"/></div>
            <div className="profile-info-details">
                <div className="profile-info-detail">
                    <p className="profile-username"><strong>{username}</strong></p>
                    <button onClick={() => handleEditProfile()}>Edit Profile</button>
                </div>
                <ul className="profile-info-detail">
                    <li><strong>{userPosts.length}</strong> Posts</li>
                </ul>
                <div className="profile-info-detail">
                    {userBio}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;