import React, {useContext, useState} from "react";
import NavBar from "./NavBar";
import HomePageStyle from './styles/HomePage.sass';
import CreateNewPost from "./CreateNewPostMenu";
import MainPostsDisplay from "./MainPostsDisplay";
import CreateNewPostMenu from "./CreateNewPostMenu";

const HomePage = () => {
    return (
        <div className="app">
            <NavBar />
            <MainPostsDisplay />
        </div>
    )
}

export default HomePage;