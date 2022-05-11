import React, {useEffect, useState} from "react";
import Post from "./Post";
import MainPostStyle from '../styles/MainPostsDisplay.scss'
import {getProfilePicUrl} from "../../index";
import {getAuth} from "firebase/auth";
import {
    collection, doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    startAfter,
    onSnapshot,
} from "firebase/firestore";

//TODO: MAP POSTS FROM DATABASE TO NEWPOST COMPONENT

const PostsDisplay = () => {
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [counter, setCounter] = useState(0);
    const [noMorePosts, setNoMorePosts] = useState(false);

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

    window.onscroll = () => {
        if (window.scrollY + window.innerHeight === document.body.scrollHeight) {
            loadImagesOnScroll()
        }
    }

    async function loadImagesOnScroll() {
        const lastVisible2 = displayedPosts[displayedPosts.length - 1].postId;
        const lastVisibleRef = doc(getFirestore(), "posts", lastVisible2);
        const lastSnap = await getDoc(lastVisibleRef);

        const next = query(collection(getFirestore(), "posts"),
            orderBy("timestamp", "desc"),
            startAfter(lastSnap.data().timestamp),
            limit(3));

        const nextSnap = await getDocs(next);
        if (nextSnap.empty) {
            setNoMorePosts(true);
            return
        }
        nextSnap.forEach((doc) => {
            let post = {...doc.data(), postId: doc.id};
            setDisplayedPosts(displayedPosts => [...displayedPosts, post]);
        })

    }


    return (
        <div className="content">
            <div id="container">
                {(displayedPosts.length > 0) && displayedPosts.map((data) => {
                    return (
                        <Post postUrl={data.imageUrl}
                              profilePic={data.profilePicUrl}
                              username={data.name} caption={data.caption}
                              timestamp={data.timestamp.seconds}
                              likes={data.likes}
                              id={data.postId}
                              key={data.postId}
                        />
                    )
                })}
                {noMorePosts && <div id="no-more-posts">
                    No More Posts
                </div>}
            </div>
            <div id="main-profile-display">
                {userProfilePic !== null && <img src={userProfilePic}  alt="profile pic" id="main-display-user-image"/>}
                <p>{username}</p>
            </div>
        </div>
    )
}

export default PostsDisplay;