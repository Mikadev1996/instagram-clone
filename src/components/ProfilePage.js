import React from "react";
import NavBar from "./NavBar";

const ProfilePage = () => {
    return (
        <div className="app">
            <NavBar/>
            <div className="content">
                <div>
                    All current signed in user posts
                </div>
            </div>
        </div>
    )
}

export default  ProfilePage;