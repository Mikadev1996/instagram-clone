import React, {useState} from "react";
import logo from './styles/logo.png';
import navbarStyles from './styles/NavBar.sass';
import {Link} from "react-router-dom";

const NavBar = ({handleCreateNewPostMenu}) => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    function signIn() {
        setIsSignedIn(isSignedIn => !isSignedIn);
    }

    function signUp() {
        setOpenSignUp(signUp => !signUp);
    }

    return (
        <nav>
            <div id="nav-content">
                <div id="nav-left">
                    <img src={logo} alt="logo"/>
                    {!isSignedIn && <button onClick={() => signIn()}>Sign In</button>}
                    {!openSignUp && <button onClick={() => signUp()}>Sign Up</button>}
                </div>
                <div>
                    <ul>
                        <Link to="/"><li>Home</li></Link>
                        <li onClick={() => handleCreateNewPostMenu()}>New Post</li>
                        <li>Notifications</li>
                        <Link to="/user-page"><li>Profile</li></Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;