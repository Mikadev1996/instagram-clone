import React from "react";

const SignIn = ({handleSignIn}) => {
    return (
        <div className="new-post-menu">
            <div className="signup-container">
                <h1 className="header" >Log In</h1>
                <form className="form">
                    <div className="form-control">
                        <label htmlFor="email" >Email</label>
                        <input type="email" placeholder="Email" id="email-login" />
                        <small>Error Message</small>
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" id="password-login" maxLength="16" />
                        <small>Error Message</small>
                    </div>
                    <hr />
                    <div className="form-control">
                        <button>Log In</button>
                    </div>
                    <div className="form-cancel">
                        <button onClick={e => handleSignIn(e)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;