import React, {useContext, useState} from "react";
import NavBar from "./NavBar";
import HomePageStyle from './styles/HomePage.sass';
import CreateNewPost from "./CreateNewPostMenu";
import MainPostsDisplay from "./MainPostsDisplay";
import CreateNewPostMenu from "./CreateNewPostMenu";

const HomePage = () => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [openNewPost, setOpenNewPost] = useState(false);

    function handleCreateNewPostMenu() {
        setOpenNewPost(openNewPost => !openNewPost);
    }

    function signIn() {
        setIsSignedIn(isSignedIn => !isSignedIn);
    }

    function signUp() {
        setOpenSignUp(signUp => !signUp);
    }

    return (
        <div className="app">
            <NavBar
                signUp={signUp}
                signIn={signIn}
                isSignedIn={isSignedIn}
                openSignUp={openSignUp}
                handleCreateNewPostMenu={handleCreateNewPostMenu}
            />
            {openNewPost && <CreateNewPostMenu handleCreateNewPostMenu={handleCreateNewPostMenu}/>}
            <MainPostsDisplay />
        </div>
    )
}

export default HomePage;