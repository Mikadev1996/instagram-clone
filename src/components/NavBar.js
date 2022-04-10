import React from "react";
import logo from './styles/logo.png';
import navbarStyles from './styles/NavBar.sass';
import SignUp from "./SignUp";

const NavBar = ({isSignedIn, openSignUp}) => {
    return (
        <nav>
            <div id="nav-content">
                <div id="nav-left">
                    <img src={logo} alt="logo"/>
                    {!isSignedIn && <button>Sign In</button>}
                    {!openSignUp && <button>Sign Up</button>}
                </div>
                <div>
                    <ul>
                        <li>Home</li>
                        <li>New Post</li>
                        <li>Notifications</li>
                        <li>Profile</li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;