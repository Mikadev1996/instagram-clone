import React from "react";
import CreateNewPostStyle from './styles/CreateNewPostMenu.sass';

const CreateNewPostMenu = ({handleCreateNewPostMenu}) => {
    return (
        <div className="new-post-menu">
            <div className="new-post-container">
                <h1>Create new post</h1>
                <div>
                    Upload Image
                    Select from computer
                </div>
                <form>
                    <textarea id="caption" placeholder="Caption your post!" maxLength="50"/>
                    <button onClick={() => {}}>Submit Post</button>
                    <button onClick={(e) => handleCreateNewPostMenu(e)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewPostMenu;