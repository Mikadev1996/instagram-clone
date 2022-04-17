import React, {useState} from "react";
import logo from './styles/logo.png';
import navbarStyles from './styles/NavBar.sass';
import {Link} from "react-router-dom";
import CreateNewPostMenu from "./CreateNewPostMenu";

const NavBar = () => {
    const [openNewPost, setOpenNewPost] = useState(false);

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
                        <button>Sign In</button>
                        <button>Sign Up</button>
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
            {openNewPost && <CreateNewPostMenu handleCreateNewPostMenu={handleCreateNewPostMenu}/>}
        </div>

    )
}

export default NavBar;