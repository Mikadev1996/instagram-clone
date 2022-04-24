import React, {useEffect, useState} from "react";
import logo from './styles/logo.png';
import navbarStyles from './styles/NavBar.sass';
import loader from './styles/loader.css';
import {Link} from "react-router-dom";
import CreateNewPostMenu from "./CreateNewPostMenu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {isUserSignedIn, getUserName} from "../index";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import handleFormError from "./formErrors";

const NavBar = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [signedIn, setSignedIn] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        isUserSignedIn().then((r) => {
            setSignedIn(r);
        })
        if (signedIn) {
            setUsername(getUserName())
        }

    }, [signedIn]);

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
                }).then(() => {
                    console.log("username updated?")
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

    return (
        <div>
            <nav>
                <div id="nav-content">
                    {signedIn === null && <div id="nav-left"><div className="loader"></div></div>}
                    {signedIn !== null &&
                    <div id="nav-left">
                        <img src={logo} alt="logo"/>
                        {signedIn === false && <button onClick={(e) => handleOpenSignIn(e)}>Sign In</button>}
                        {signedIn === false && <button onClick={(e) => handleOpenSignUp(e)}>Sign Up</button>}
                        {signedIn === true && <button onClick={(e) => handleSignOut(e)}>Sign Out</button>}
                        {signedIn === true && <p>{username}</p>}
                    </div>}
                    <div id="nav-right">
                        <ul>
                            <Link to="/"><li>Home</li></Link>
                            <li onClick={(e) => handleCreateNewPostMenu(e)}>New Post</li>
                            <li>Notifications</li>
                            <Link to="/user-page"><li onClick={() => console.log(getUserName())}>Profile</li></Link>
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