import React from "react";
import NavBar from "./components/Nav/NavBar";
import UserDetails from "./UserDetails";

const UserPage = () => {

    return (
        <div className="app">
            <NavBar />
            <UserDetails />
        </div>
    )
}

export default UserPage;