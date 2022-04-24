import React, {useState} from "react";
import logo from './styles/logo.png';
import navbarStyles from './styles/NavBar.sass';
import {Link} from "react-router-dom";
import CreateNewPostMenu from "./CreateNewPostMenu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {signUpUser, signOutUser, isUserSignedIn, getUserName, signInUser} from "../index";

const NavBar = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [signedIn, setSignedIn] = useState(null);

    function handleOpenSignUp(e) {
        e.preventDefault();
        setOpenSignUp(true);
    }

    function handleOpenSignIn(e) {
        e.preventDefault();
        setOpenSignIn(true);
    }

    function handleSignUpForm(e) {
        e.preventDefault();
        signUpUser();
    }

    function handleSignInForm(e) {
        e.preventDefault();
        signInUser();
    }

    function handleCancel(e) {
        e.preventDefault();
        setOpenSignUp(false);
        setOpenSignIn(false);
    }

    function handleCreateNewPostMenu(e) {
        e.preventDefault();
        setOpenNewPost(openNewPost => !openNewPost);
    }

    function testFn() {
        console.log(isUserSignedIn());
    }

    return (
        <div>
            <nav>
                <div id="nav-content">
                    <div id="nav-left">
                        <img src={logo} alt="logo"/>
                        <button onClick={(e) => handleOpenSignIn(e)}>Sign In</button>
                        <button onClick={(e) => handleOpenSignUp(e)}>Sign Up</button>
                        <button onClick={() => testFn()}>Test Button</button>
                    </div>
                    <div id="nav-right">
                        <ul>
                            <Link to="/"><li>Home</li></Link>
                            <li onClick={(e) => handleCreateNewPostMenu(e)}>New Post</li>
                            <li>Notifications</li>
                            <Link to="/user-page"><li>Profile</li></Link>
                        </ul>
                    </div>
                </div>
            </nav>
            {openSignUp && <SignUp handleCancel={handleCancel} handleSignUpForm={handleSignUpForm} /> }
            {openSignIn && <SignIn handleCancel={handleCancel} handleSignInForm={handleSignInForm}/>}
            {openNewPost && <CreateNewPostMenu handleCreateNewPostMenu={handleCreateNewPostMenu}/>}
        </div>

    )
}

export default NavBar;