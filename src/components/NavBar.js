import React from "react";
import logo from './styles/logo.png';
import navbarStyles from './styles/NavBar.sass';

const NavBar = ({isSignedIn, openSignUp}) => {
    return (
        <nav>
            <div id="nav-content">
                <div><img src={logo} alt="logo"/></div>
                <div>
                    <ul>
                        <li>Home</li>
                        <li>New Post</li>
                        <li>Notifications</li>
                        <li>Profile</li>
                        {!isSignedIn && <button>Sign In</button>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;