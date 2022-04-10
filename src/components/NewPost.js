import React from "react";
import examplePost from './styles/ExamplePost.png';

const NewPost = () => {
    return (
        <div className="post">
            <div className="post-nav">
                <p>Profile Pic</p>
                <p>Username</p>
                <div>
                    <img src={examplePost} place="post"/>
                </div>
            </div>
        </div>
    )
}

export default NewPost;