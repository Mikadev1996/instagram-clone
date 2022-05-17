import React, {useEffect, useState} from "react";
import Post from "./Post";
import MainPostStyle from '../styles/PostsDisplay.scss'
import {
    collection, doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import FloatInfo from "./FloatInfo";

const PostsDisplay = ({username, userProfilePic, newPost}) => {
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [noMorePosts, setNoMorePosts] = useState(false);

    // Load Images on page load
    useEffect(() => {
        async function loadImages() {
            console.log(username)
            if (username !== "") {
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
    }, [username]);

    useEffect(() => {
        if (newPost.length > 0) {
            setDisplayedPosts(displayedPosts => [newPost[0], ...displayedPosts]);
        }
    }, [newPost]);

    window.onscroll = () => {
        if (window.scrollY + window.innerHeight === document.body.scrollHeight) {
            loadImagesOnScroll()
        }
    }

    async function loadImagesOnScroll() {
        try {
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
        catch (error) {

        }
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
                              posterUid={data.posterUid}
                        />
                    )
                })}
                {noMorePosts &&
                <div id="no-more-posts">
                    No More Posts
                </div>}
            </div>
            <div id="main-profile-display">
                {userProfilePic !== null && <img src={userProfilePic}  alt="profile pic" id="main-display-user-image"/>}
                <p>{username}</p>
                {username !== "" && <FloatInfo />}
            </div>
        </div>
    )
}

export default PostsDisplay;