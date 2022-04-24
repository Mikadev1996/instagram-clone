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
                        <small id="email-login-error"></small>
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" id="password-login" maxLength="16" required/>
                        <small id="password-login-error"></small>
                    </div>
                    <hr />
                    <div className="form-control ">
                        <button className="form-confirm" onClick={e => handleSignInForm(e)}>Log In</button>
                    </div>
                    <div>
                        <button  className="form-cancel" onClick={e => handleCancel(e)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;