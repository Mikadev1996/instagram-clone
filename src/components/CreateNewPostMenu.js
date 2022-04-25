import React from "react";
import CreateNewPostStyle from './styles/CreateNewPostMenu.sass';
import {uploadImage} from "../index";

const CreateNewPostMenu = ({handleCreateNewPostMenu, handleCreateNewPost}) => {
    return (
        <div className="new-post-menu">
            <div className="new-post-container">
                <h1>Create new post</h1>
                <div>
                    <input type="file" accept="image/png, image/jpeg" name="Upload Image" id="user-upload-image"/>
                    Upload Image
                    Select from computer
                </div>
                <form>
                    <textarea id="caption" placeholder="Caption your post!" maxLength="50"/>
                    <button onClick={(e) => {handleCreateNewPost(e)}}>Submit Post</button>
                    <button onClick={(e) => handleCreateNewPostMenu(e)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewPostMenu;