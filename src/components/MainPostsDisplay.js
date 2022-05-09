import React, {useEffect, useState} from "react";
import NewPost from "./NewPost";
import MainPostStyle from './styles/MainPostsDisplay.sass'
import {getProfilePicUrl} from "../index";
import {getAuth} from "firebase/auth";
import examplePost from './styles/ExamplePost.png';
import {collection, getDocs, getFirestore, limit, onSnapshot, orderBy, query} from "firebase/firestore";

//TODO: MAP POSTS FROM DATABASE TO NEWPOST COMPONENT

const MainPostsDisplay = () => {
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [counter, setCounter] = useState(0);

    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUsername(user.displayName);
            setUserProfilePic(getProfilePicUrl());
        }
        else {
            setUsername("");
            setUserProfilePic(null);
        }
    })


    // Load Images on page load
    useEffect(() => {
        async function loadImages() {
            setCounter(counter + 1);
            if (counter < 100) {
                const recentImagesQuery = query(collection(getFirestore(), 'posts'), orderBy('timestamp', 'desc'), limit(3));
                const querySnapshot = await getDocs(recentImagesQuery);
                querySnapshot.forEach((doc) => {
                    let post = {...doc.data(), postId: doc.id};
                    if (post.imageUrl !== "LOADING_IMAGE_URL") {
                        setDisplayedPosts(displayedPosts => [...displayedPosts, post]);
                    }
                })

            }
        }
        loadImages()
    }, []);

    // Load Images on end of scroll
    useEffect(() => {
        const container = document.getElementById("container");
        window.onscroll = () => {
            console.log("container scrollHeight: ", container.scrollHeight);
            console.log("body scrollHeight: ", document.body.scrollHeight);
            console.log(`scrollY: `, window.scrollY);
            // if ((window.innerHeight + window.scrollY) >= window.offsetHeight) {
            //     console.log("bottom of page")
            // }
        }

    }, []);


    return (
        <div className="content">
            <div id="container">
                <NewPost profilePic={userProfilePic} postUrl={examplePost} username={username}/>
                {(displayedPosts.length > 0) && displayedPosts.map((data) => {
                    return (
                        <NewPost postUrl={data.imageUrl}
                                 profilePic={data.profilePicUrl}
                                 username={data.name} caption={data.caption}
                                 timestamp={data.timestamp.seconds}
                                 likes={data.likes}
                                 id={data.postId}
                                 key={data.postId}
                        />
                    )
                })}
            </div>
            <div id="main-profile-display">
                {userProfilePic !== null && <img src={userProfilePic}  alt="profile pic" id="main-display-user-image"/>}
                <p>{username}</p>
            </div>
        </div>
    )
}

export default MainPostsDisplay;