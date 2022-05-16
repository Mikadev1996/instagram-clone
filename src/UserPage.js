import React from "react";
import NavBar from "./components/Nav/NavBar";
import UserDetails from "./UserDetails";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const { uid } = useParams()
    return (
        <div className="app">
            <NavBar />
            <UserDetails uid={uid} />
        </div>
    )
}

export default UserPage;