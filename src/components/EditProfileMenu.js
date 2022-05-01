import React from "react";
import EditProfileStyles from './styles/EditProfileMenu.scss.css';

const EditProfileMenu = ({handleEditProfile, updateProfile}) => {
    return (
        <div className="new-post-menu">
            <div className="new-post-container">
                <div className="edit-profile-header">
                    <h1>Edit Profile</h1>
                </div>
                <div className="edit-profile-inputs">
                    <input type="file" accept="image/png, image/jpeg" name="Upload Image" id="new-profile-image" placeholder="Upload Photo" className="custom-file-input"/>
                    <textarea placeholder="Enter a biography" maxLength="150" id="new-profile-bio"/>
                </div>
                <div className="edit-profile-options">
                    <button onClick={() => updateProfile()}>Submit</button>
                    <button onClick={() => handleEditProfile()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditProfileMenu;