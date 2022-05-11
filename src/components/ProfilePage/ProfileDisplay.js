import React, {useState} from "react";
import EditProfileMenu from "./EditProfileMenu";
import PreviewPost from "./PreviewPost";
import ProfileInfo from "./ProfileInfo";

const ProfileDisplay = ({username, userPosts, userProfilePic, editProfile, updateProfile, handleEditProfile}) => {

    return (
        <div className="content">
            {editProfile && <EditProfileMenu handleEditProfile={handleEditProfile} updateProfile={updateProfile}/>}
            <div className="profile-container">
                <ProfileInfo username={username} userProfilePic={userProfilePic} userPosts={userPosts} handleEditProfile={handleEditProfile}/>
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
    )
}

export default ProfileDisplay;