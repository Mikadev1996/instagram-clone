import React from "react";
import CreateNewPostStyle from './styles/CreateNewPostMenu.sass';

const CreateNewPostMenu = ({handleCreateNewPostMenu}) => {
    return (
        <div id="new-post-menu">
            <div><h1>Create new post</h1></div>
            <div>
                Upload Image
                Select from computer
            </div>
            <form>
                <input type="text" id="caption" placeholder="Caption your post!"/>
                <button onClick={() => {}}>Submit Post</button>
                <button onClick={() => handleCreateNewPostMenu()}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateNewPostMenu;