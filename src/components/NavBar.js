import React, {useEffect, useState} from "react";
import logo from './styles/logo-white.png';
import navbarStyles from './styles/NavBar.sass';
import loader from './styles/loader.css';
import {Link} from "react-router-dom";
import CreateNewPostMenu from "./CreateNewPostMenu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {isUserSignedIn, getProfilePicUrl, getUserName, saveImagePost} from "../index";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import handleFormError from "./formErrors";

const NavBar = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [signedIn, setSignedIn] = useState(null);
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);

    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {
            setSignedIn(true);
            setUsername(getUserName());
            setUserProfilePic(getProfilePicUrl());
        }
        else {
            setSignedIn(false);
        }
    })

    function handleOpenSignUp(e) {
        e.preventDefault();
        setOpenSignUp(true);
    }

    function handleOpenSignIn(e) {
        e.preventDefault();
        setOpenSignIn(true);
    }

    function handleSignOut(e) {
        e.preventDefault();
        signOut(getAuth()).then(() => {
            setSignedIn(false);
        })
            .then(() => {
                isUserSignedIn().then(r => console.log(r));
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    function handleSignUpForm(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSignedIn(true);
                setOpenSignUp(false);
            })
            .then((r) => {
                updateProfile(auth.currentUser, {
                    displayName: username,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/instagram-clone-9a4b3.appspot.com/o/default_photo.png?alt=media&token=97360e51-f17e-4989-9ced-a0bd4f066e2b"
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    }

    function handleSignInForm(e) {
        e.preventDefault();
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .then(() => {
                setSignedIn(true);
                setOpenSignIn(false);
            })
            .catch((error) => {
                console.log(error.code);
                handleFormError(error.code);
            })
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

    function handleCreateNewPost(e) {
        e.preventDefault();
        const image = document.getElementById("user-upload-image").files[0];
        const caption = document.getElementById("image-caption").value;
        saveImagePost(image, caption)
            .then((r) => {
                setOpenNewPost(false);
            })
    }

    return (
        <div>
            <nav>
                <div id="nav-content">
                    {signedIn === null && <div id="nav-left"><div className="loader"></div></div>}
                    {signedIn !== null &&
                    <div id="nav-left">
                        <img src={logo} alt="logo" className="nav-logo"/>
                        {signedIn === false && <button onClick={(e) => handleOpenSignIn(e)}>Sign In</button>}
                        {signedIn === false && <button onClick={(e) => handleOpenSignUp(e)}>Sign Up</button>}
                        {signedIn === true && <button onClick={(e) => handleSignOut(e)}>Sign Out</button>}
                        {signedIn === true && <p>{username}</p>}
                    </div>}
                    <div id="nav-right">
                        <ul>
                            <Link to="/"><li>Home</li></Link>
                            {signedIn && <li onClick={(e) => handleCreateNewPostMenu(e)}>New Post</li>}
                            {signedIn && <Link to="/user-page"><img src={userProfilePic} alt="user-profile-pic" className="nav-profile-pic"/></Link>}
                        </ul>
                    </div>
                </div>
            </nav>
            {openSignUp && <SignUp handleCancel={handleCancel} handleSignUpForm={handleSignUpForm} /> }
            {openSignIn && <SignIn handleCancel={handleCancel} handleSignInForm={handleSignInForm}/>}
            {openNewPost && <CreateNewPostMenu handleCreateNewPostMenu={handleCreateNewPostMenu} handleCreateNewPost={handleCreateNewPost}/>}
        </div>

    )
}

export default NavBar;