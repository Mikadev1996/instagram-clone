import React, {useEffect, useState} from "react";
import NewPost from "./NewPost";
import MainPostStyle from './styles/MainPostsDisplay.sass'
import {getProfilePicUrl, loadImages} from "../index";
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

    useEffect(() => {
        async function loadImages() {
            setCounter(counter + 1);
            if (counter < 100) {
                console.log("test");
                const recentImagesQuery = query(collection(getFirestore(), 'posts'), orderBy('timestamp'), limit(12));
                const querySnapshot = await getDocs(recentImagesQuery);
                // querySnapshot.forEach((doc) => {
                //     console.log("query")
                //     setDisplayedPosts( displayedPosts => [...displayedPosts, doc.data()]);
                // })

                onSnapshot(recentImagesQuery, (snapshot) => {
                    console.log("onSnapshot");
                    snapshot.docChanges().forEach((change) => {
                        let image = change.doc.data();
                        console.log(image)
                        if (image.imageUrl !== "LOADING_IMAGE_URL") {
                            setDisplayedPosts(displayedPosts => [...displayedPosts, image]);
                        }
                    });
                });
            }
        }
        loadImages()
    }, []);

    return (
        <div className="content">
            <div id="container">
                <NewPost profilePic={userProfilePic} postUrl={examplePost} username={username}/>
                {(displayedPosts.length > 0) && displayedPosts.map((data) => {
                    return (
                        <NewPost postUrl={data.imageUrl} profilePic={data.profilePicUrl} username={username} caption={data.caption} timestamp={data.timestamp.seconds} likes={data.likes}/>
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