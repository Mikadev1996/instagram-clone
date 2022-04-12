import React from "react";
import logo from './styles/logo.png';
import navbarStyles from './styles/NavBar.sass';
import SignUp from "./SignUp";
import {Link} from "react-router-dom";

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
                        <Link to="/"><li>Home</li></Link>
                        <li>New Post</li>
                        <li>Notifications</li>
                        <Link to="user-page"><li>Profile</li></Link>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;