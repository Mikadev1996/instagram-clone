import React from "react";
import logo from '../../images/logo-white.png';
import navbarStyles from '../styles/NavBar.scss';
import loader from '../styles/loader.scss';
import {Link} from "react-router-dom";
import CreatePostMenu from "./CreatePostMenu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const NavBar = ({signedIn, handleCreateNewPost, handleOpenSignIn, handleOpenSignUp, handleSignOut, username, handleCreateNewPostMenu, handleCancel, handleSignUpForm, openSignUp, openSignIn, handleSignInForm, openNewPost, userProfilePic}) => {
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
            {openNewPost && <CreatePostMenu handleCreateNewPostMenu={handleCreateNewPostMenu} handleCreateNewPost={handleCreateNewPost}/>}
        </div>

    )
}

export default NavBar;