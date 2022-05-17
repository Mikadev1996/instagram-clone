import React from "react";
import logo from "../../images/logo-white.png";

const NavSignIn = ({signedIn, username, handleSignOut, handleOpenSignIn, handleOpenSignUp}) => {
    return (
        <div id="nav-left">
            <img src={logo} alt="logo" className="nav-logo"/>
            {signedIn === false && <button onClick={(e) => handleOpenSignIn(e)}>Sign In</button>}
            {signedIn === false && <button onClick={(e) => handleOpenSignUp(e)}>Sign Up</button>}
            {signedIn === true && <button onClick={(e) => handleSignOut(e)}>Sign Out</button>}
            {signedIn === true && <p>{username}</p>}
        </div>
    )
}

export default NavSignIn;