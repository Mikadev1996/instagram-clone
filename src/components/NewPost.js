import React from "react";
import examplePost from './styles/ExamplePost.png';
import NewPostStyle from './styles/NewPost.sass';

const NewPost = () => {
    return (
        <div className="post">
            <div className="post-nav">
                <div>
                    <p>Profile Pic</p>
                </div>
                <div>
                    <p>Username</p>
                </div>
            </div>
            <div>
                <img src={examplePost} alt="post" />
            </div>
        </div>
    )
}

export default NewPost;