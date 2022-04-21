import React, {useState} from "react";
import SignUpStyle from './styles/SignUp.sass'

const SignUp = ({handleSignUp}) => {
    return (
         <div className="new-post-menu">
             <div className="signup-container">
                 <h1 className="header" >Sign Up</h1>
                 <form className="form">
                     <div className="form-control">
                         <label htmlFor="email" >Email</label>
                         <input type="email" placeholder="Email" id="email" />
                         <small>Error Message</small>
                     </div>

                     <div className="form-control">
                         <label htmlFor="password">Password</label>
                         <input type="password" placeholder="Password" id="password" maxLength="16" />
                         <small>Error Message</small>
                     </div>

                     <div className="form-control">
                         <label htmlFor="password-check">Password Check</label>
                         <input type="password" placeholder="Password Check" id="password-check" maxLength="16" />
                         <small>Error Message</small>
                     </div>
                     <div className="form-control">
                         <button>Confirm</button>
                     </div>
                     <div className="form-control">
                         <button onClick={(e) => handleSignUp(e)} id="form-cancel">Cancel</button>
                     </div>
                 </form>
             </div>
         </div>
    )
}

export default SignUp;