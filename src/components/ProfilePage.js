import React, {useState} from "react";
import NavBar from "./NavBar";

const ProfilePage = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    return (
        <div className="app">
            <NavBar/>
            <div className="content">
                {editProfile && <div className="edit-profile">
                    <input type="text" placeholder="Enter a biography" maxLength="50"/>
                    <button>Submit</button>
                    <button onClick={() => setEditProfile(false)}>Cancel</button>
                </div>}
                <div className="profile-container">
                    <div className="profile-info">
                        Profile Preview
                        <p>Profile Picture</p>
                        <p>Bio</p>
                        {isSignedIn && <button className="edit-profile-btn">Edit</button>}
                    </div>
                    <div className="profile-user-posts">
                        All current signed in user posts
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  ProfilePage;