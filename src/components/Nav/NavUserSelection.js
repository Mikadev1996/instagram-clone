import React from "react";
import {Link} from "react-router-dom";

const NavUserSelection = ({uid, handleCreateNewPostMenu, userProfilePic, signedIn}) => {
    return (
        <div id="nav-right">
            <ul>
                <Link to="/"><li>Home</li></Link>
                {signedIn && <li onClick={(e) => handleCreateNewPostMenu(e)}>New Post</li>}
                {signedIn && <Link to={`/user/${uid}`}><img src={userProfilePic} alt="user-profile-pic"
                                                className="nav-profile-pic"/></Link>}
            </ul>
        </div>
    )
}

export default NavUserSelection;