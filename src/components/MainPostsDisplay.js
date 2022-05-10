import React, {useEffect, useState} from "react";
import NewPost from "./NewPost";
import MainPostStyle from './styles/MainPostsDisplay.sass'
import {getProfilePicUrl} from "../index";
import {getAuth} from "firebase/auth";
import examplePost from './styles/ExamplePost.png';
import {
    collection, doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    startAt
} from "firebase/firestore";

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
    const initialScrollHeight = document.body.scrollHeight
    window.onscroll = () => {
        if (window.scrollY + window.innerHeight === document.body.scrollHeight && (document.body.scrollHeight > initialScrollHeight)) {
            loadImagesOnScroll()
        }
    }

    async function loadImagesOnScroll() {
        console.log("end of page")

        const lastVisible2 = displayedPosts[displayedPosts.length - 1].postId;
        const lastVisibleRef = doc(getFirestore(), "posts", lastVisible2);
        const lastSnap = await getDoc(lastVisibleRef);
        console.log("last snap - ", lastSnap.data().caption)
        const next = query(collection(getFirestore(), "posts"),
            orderBy("timestamp", "desc"),
            startAfter(lastSnap.data().timestamp),
            limit(3));

        const nextSnap = await getDocs(next);
        nextSnap.forEach((doc) => {
            setDisplayedPosts(displayedPosts => [...displayedPosts, doc.data()])
        })
    }


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