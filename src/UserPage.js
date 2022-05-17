import React from "react";
import NavBar from "./components/Nav/NavBar";
import UserDetails from "./UserDetails";
import {useParams} from "react-router-dom";
import {getAuth} from "firebase/auth";

const UserPage = () => {
    const { uid } = useParams()
    const auth = getAuth();
    return (
        <div className="app">
            <NavBar />
            <UserDetails uid={uid} />
        </div>
    )
}

export default UserPage;