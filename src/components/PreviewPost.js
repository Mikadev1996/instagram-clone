import React from "react";

const PreviewPost = ({imageUrl}) => {

    return (
        <div className="grid-item">
            <img src={imageUrl} alt="post"/>
        </div>
    )
}

export default PreviewPost;