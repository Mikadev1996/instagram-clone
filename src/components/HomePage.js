import React, {useState} from "react";
import NavBar from "./NavBar";
import HomePageStyle from './styles/HomePage.sass';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NewPost from "./CreateNewPost";
import MainPostsDisplay from "./MainPostsDisplay";

const HomePage = () => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [openNewPost, setOpenNewPost] = useState(false);

    return (
        <div className="app">
            <NavBar
                isSignedIn={isSignedIn}
                openSignUp={openSignUp}
            />
            {openNewPost && <NewPost />}
            <MainPostsDisplay />
        </div>
    )
}

export default HomePage;