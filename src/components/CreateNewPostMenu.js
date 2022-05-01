import React, {useState} from "react";
import CreateNewPostStyle from './styles/CreateNewPostMenu.sass';

const CreateNewPostMenu = ({handleCreateNewPostMenu, handleCreateNewPost}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="new-post-menu">
            <div className="new-post-container">
                <h1>Create new post</h1>
                <div>
                    {!isLoading && <input type="file" accept="image/png, image/jpeg" name="Upload Image" id="user-upload-image"/>}
                    {isLoading && <div className="spinner"></div>}
                </div>
                <form>
                    <textarea id="image-caption" placeholder="Caption your post!" maxLength="50"/>
                    <button onClick={(e) => {
                        setIsLoading(true);
                        handleCreateNewPost(e)}}
                    >
                        Submit Post</button>
                    <button onClick={(e) => handleCreateNewPostMenu(e)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewPostMenu;