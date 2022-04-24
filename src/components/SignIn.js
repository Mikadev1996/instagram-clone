import React from "react";
import SignInStyles from './styles/SignIn.scss';

const SignIn = ({handleCancel, handleSignInForm}) => {
    return (
        <div className="new-post-menu">
            <div className="signup-container">
                <h1 className="header" >Log In</h1>
                <form className="form">
                    <div className="form-control">
                        <label htmlFor="email" >Email</label>
                        <input type="email" placeholder="Email" id="email-login" required/>
                        <small>Error Message</small>
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" id="password-login" maxLength="16" required/>
                        <small>Error Message</small>
                    </div>
                    <hr />
                    <div className="form-control">
                        <button onClick={e => handleSignInForm(e)}>Log In</button>
                    </div>
                    <div className="form-cancel">
                        <button onClick={e => handleCancel(e)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;