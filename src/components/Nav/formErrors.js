
function handleSignInError(errorCode) {
    const emailError = document.getElementById("email-login-error");
    const passwordError = document.getElementById("password-login-error");

    if (errorCode === "auth/user-not-found") {
        setErrorFor(passwordError, "User Not Found");
        setErrorFor(emailError, "User Not Found");
        return;
    } else {
        setSuccessFor(passwordError);
        setSuccessFor(emailError);
    }

    if (errorCode === "auth/invalid-email") {
        setErrorFor(emailError, "Invalid Email");
    } else {
        setSuccessFor(emailError);
    }

    if (errorCode === "auth/wrong-password") {
        setErrorFor(passwordError, "Invalid Password");
    } else {
        setSuccessFor(passwordError);
    }
}

function handleSignUpError(errorCode) {
    const userNameError = document.getElementById("username-signup-error");
    const emailError = document.getElementById("email-signup-error");
    const passwordError = document.getElementById("password-signup-error");
    const passwordCheckError = document.getElementById("passwordCheck-signup-error");
    if (errorCode === "passwords do not match" || errorCode === "auth/weak-password") {
        setErrorFor(passwordError, "Passwords Do Not Match");
        setErrorFor(passwordCheckError, "Passwords Do Not Match");
    } else {
        setSuccessFor(passwordError);
        setSuccessFor(passwordCheckError);
    }

    if (errorCode === "username already exists") {
        setErrorFor(userNameError);
    } else {
        setSuccessFor(userNameError);
    }

    if (errorCode === "auth/missing-email" || errorCode === "auth/email-already-exists") {
        setErrorFor(emailError, "Invalid Email");
    } else {
        setSuccessFor(emailError);
    }
}

function setErrorFor(input, msg) {
    input.textContent = msg;
    input.parentElement.className = "form-control error";

}

function setSuccessFor(input) {
    input.parentElement.className = "form-control success";
}

export {handleSignInError, handleSignUpError};