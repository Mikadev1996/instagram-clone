import React from "react";

const PreviewPost = ({imageUrl}) => {

    return (
        <div className="grid-div">
            <img src={imageUrl} alt="post" className="grid-item"/>
        </div>
    )
}

export default PreviewPost;