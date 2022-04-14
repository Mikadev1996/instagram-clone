import React, {useState} from "react";
import NavBar from "./NavBar";
import ProfileStyle from './styles/ProfilePage.sass';
import PreviewPost from "./PreviewPost";

const ProfilePage = () => {
    const [editProfile, setEditProfile] = useState(false);

    return (
        <div className="app">
            <NavBar />
            <div className="content">
                {editProfile && <div className="edit-profile">
                    <input type="text" placeholder="Enter a biography" maxLength="50"/>
                    <button>Submit</button>
                    <button onClick={() => setEditProfile(false)}>Cancel</button>
                </div>}
                <div className="profile-container">
                    <div className="profile-info">
                        <div><p>Profile Picture</p></div>
                        <div>
                            <div>
                                <p>Username</p>
                                <button>Edit Profile</button>
                            </div>
                            <ul>
                                <li>No. Posts</li>
                                <li>No. Followers</li>
                                <li>No. Following</li>
                            </ul>
                            <div>
                                User Biography
                            </div>
                        </div>
                    </div>
                    <hr className="profile-separator"/>
                    <div className="profile-user-posts">
                        <h1 className="posts-title">POSTS</h1>
                        <div className="grid-container">
                            <PreviewPost />
                            <PreviewPost />
                            <PreviewPost />
                            <PreviewPost />
                            <PreviewPost />
                            <PreviewPost />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  ProfilePage;