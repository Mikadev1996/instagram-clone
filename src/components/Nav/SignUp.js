import React, {useState} from "react";
import SignUpStyle from '../styles/SignUp.scss'

const SignUp = ({handleCancel, handleSignUpForm}) => {
    return (
         <div className="new-post-menu">
             <div className="signup-container">
                 <h1 className="header" >Sign Up</h1>
                 <form className="form">
                     <div className="form-control">
                         <label htmlFor="username" >Username</label>
                         <input type="text" placeholder="Username" id="username" maxLength="16"/>
                         <i className="fas fa-check-circle"></i>
                         <i className="fas fa-exclamation-circle"></i>
                         <small id="username-signup-error">Error Message</small>
                     </div>
                     <div className="form-control">
                         <label htmlFor="email" >Email</label>
                         <input type="email" placeholder="Email" id="email" />
                         <i className="fas fa-check-circle"></i>
                         <i className="fas fa-exclamation-circle"></i>
                         <small id="email-signup-error">Error Message</small>
                     </div>

                     <div className="form-control">
                         <label htmlFor="password">Password</label>
                         <input type="password" placeholder="Password" id="password" maxLength="16" />
                         <i className="fas fa-check-circle"></i>
                         <i className="fas fa-exclamation-circle"></i>
                         <small id="password-signup-error">Error Message</small>
                     </div>

                     <div className="form-control">
                         <label htmlFor="password-check">Password Check</label>
                         <input type="password" placeholder="Password Check" id="password-check" maxLength="16" />
                         <i className="fas fa-check-circle"></i>
                         <i className="fas fa-exclamation-circle"></i>
                         <small id="passwordCheck-signup-error">Error Message</small>
                     </div>
                     <div className="form-control ">
                         <button className="form-confirm" onClick={e => handleSignUpForm(e)}>Confirm</button>
                     </div>
                     <div className="form-control">
                         <button onClick={(e) => handleCancel(e)} className="form-cancel">Cancel</button>
                     </div>
                 </form>
             </div>
         </div>
    )
}

export default SignUp;