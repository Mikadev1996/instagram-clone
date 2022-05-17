import React, {useState} from "react";
import NavBar from "./components/Nav/NavBar";
import UserDetails from "./UserDetails";
import {useParams} from "react-router-dom";
import {getAuth} from "firebase/auth";

const UserPage = () => {
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const { uid } = useParams()
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
        if (getAuth().currentUser.uid === uid) {
            setIsCurrentUser(true);
            console.log("current user = true");
        } else {
            console.log("not current user");
            console.log(getAuth().currentUser.uid)
            console.log(uid);
        }
    })

    return (
        <div className="app">
            <NavBar />
            <UserDetails uid={uid} isCurrentUser={isCurrentUser}/>
        </div>
    )
}

export default UserPage;