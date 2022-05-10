import React, {useContext, useState} from "react";
import NavBar from "../Nav/NavBar";
import HomePageStyle from '../styles/HomePage.scss';
import CreateNewPost from "../Nav/CreatePostMenu";
import PostsDisplay from "./PostsDisplay";
import CreatePostMenu from "../Nav/CreatePostMenu";

const HomePage = () => {
    return (
        <div className="app">
            <NavBar />
            <PostsDisplay />
        </div>
    )
}

export default HomePage;