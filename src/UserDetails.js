import React from "react";

const UserDetails = ({uid}) => {
    return (
        <div className="content">
            <div>
                This users UID: {uid}
            </div>
        </div>
    )
}

export default UserDetails;