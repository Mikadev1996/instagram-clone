import React, {useState} from "react";
import logo from './styles/logo.png';
import navbarStyles from './styles/NavBar.sass';
import {Link} from "react-router-dom";
import CreateNewPostMenu from "./CreateNewPostMenu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const NavBar = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);

    function handleSignUp(e) {
        e.preventDefault();
        setOpenSignUp(openSignUp => !openSignUp);
    }

    function handleSignIn(e) {
        e.preventDefault();
        setOpenSignIn(openSignIn => !openSignIn);
    }

    function handleCreateNewPostMenu(e) {
        e.preventDefault();
        setOpenNewPost(openNewPost => !openNewPost);
    }

    return (
        <div>
            <nav>
                <div id="nav-content">
                    <div id="nav-left">
                        <img src={logo} alt="logo"/>
                        <button onClick={(e) => handleSignIn(e)}>Sign In</button>
                        <button onClick={(e) => handleSignUp(e)}>Sign Up</button>
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
            {openSignUp && <SignUp handleSignUp={handleSignUp} />}
            {openSignIn && <SignIn handleSignIn={handleSignIn} />}
            {openNewPost && <CreateNewPostMenu handleCreateNewPostMenu={handleCreateNewPostMenu}/>}
        </div>

    )
}

export default NavBar;