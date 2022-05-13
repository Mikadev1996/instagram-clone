import React, {useContext, useState} from "react";
import NavBar from "../Nav/NavBar";
import HomePageStyle from '../styles/HomePage.scss';
import CreateNewPost from "./CreatePostMenu";
import PostsDisplay from "./PostsDisplay";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {addProfileToDatabase, getPost, getProfilePicUrl, getUserName, isUserSignedIn, saveImagePost} from "../../index";
import {handleSignInError, handleSignUpError} from "../Nav/formErrors";

const HomePage = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [signedIn, setSignedIn] = useState(null);
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [newPost, setNewPost] = useState([]);

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

            });
    }

    function handleSignUpForm(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordCheck = document.getElementById("password-check").value;
        if (password !== passwordCheck) {
            handleSignUpError("passwords do not match");
            return;
        } else if (username === "mikadev1996") {
            handleSignUpError("username already exists");
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                Promise.all([
                    updateProfile(auth.currentUser, {
                        displayName: username,
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/instagram-clone-9a4b3.appspot.com/o/default_photo.png?alt=media&token=97360e51-f17e-4989-9ced-a0bd4f066e2b",
                    }),
                    addProfileToDatabase(username)
                ])
                    .then(() => {
                        setSignedIn(true);
                        setOpenSignUp(false);
                    })
            })
            .catch(error => console.log(error.code, error.message));
    }

    function handleSignInForm(e) {
        e.preventDefault();
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSignedIn(true);
                setOpenSignIn(false);
            })
            .catch((error) => {
                handleSignInError(error.code);
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

                getPost(r)
                    .then(r => {
                        setNewPost(newPost => [r]);
                    })
            })
    }

    return (
        <div className="app">
            <NavBar
                handleCreateNewPost={handleCreateNewPost}
                handleCancel={handleCancel}
                handleCreateNewPostMenu={handleCreateNewPostMenu}
                handleSignUpForm={handleSignUpForm}
                handleSignInForm={handleSignInForm}
                handleOpenSignIn={handleOpenSignIn}
                handleOpenSignUp={handleOpenSignUp}
                handleSignOut={handleSignOut}
                signedIn={signedIn}
                username={username}
                userProfilePic={userProfilePic}
                openNewPost={openNewPost}
                openSignUp={openSignUp}
                openSignIn={openSignIn}
            />
            <PostsDisplay
                newPost={newPost}
                username={username}
                userProfilePic={userProfilePic}

            />
        </div>
    )
}

export default HomePage;