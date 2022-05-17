import React from "react";
import logo from '../../images/logo-white.png';
import navbarStyles from '../styles/NavBar.scss';
import loader from '../styles/loader.scss';
import {Link} from "react-router-dom";
import CreatePostMenu from "../HomePage/CreatePostMenu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NavUserSelection from "./NavUserSelection";
import NavSignIn from "./NavSignIn";

const NavBar = ({signedIn, handleCreateNewPost, handleOpenSignIn, handleOpenSignUp, handleSignOut, username, handleCreateNewPostMenu, handleCancel, handleSignUpForm, openSignUp, openSignIn, handleSignInForm, openNewPost, userProfilePic, uid}) => {
    return (
        <div>
            <nav>
                <div id="nav-content">
                    {signedIn === null && <div id="nav-left"><div className="loader"></div></div>}
                    {signedIn !== null &&
                    <NavSignIn
                        username={username}
                        handleOpenSignUp={handleOpenSignUp}
                        handleOpenSignIn={handleOpenSignIn}
                        handleSignOut={handleSignOut}
                        signedIn={signedIn}

                    />}
                    <NavUserSelection uid={uid}
                                      handleCreateNewPostMenu={handleCreateNewPostMenu}
                                      userProfilePic={userProfilePic}
                                      signedIn={signedIn}

                    />
                </div>
            </nav>
            {openSignUp && <SignUp handleCancel={handleCancel} handleSignUpForm={handleSignUpForm} /> }
            {openSignIn && <SignIn handleCancel={handleCancel} handleSignInForm={handleSignInForm}/>}
            {openNewPost && <CreatePostMenu handleCreateNewPostMenu={handleCreateNewPostMenu} handleCreateNewPost={handleCreateNewPost}/>}
        </div>

    )
}

export default NavBar;