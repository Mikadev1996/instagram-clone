function handleFormError(errorCode) {
    if (errorCode === "auth/invalid-email") {
        const emailError = document.getElementById("email-login-error");
        emailError.textContent = "Invalid Email";
        emailError.parentElement.className = "form-control error";
    }
    if (errorCode === "auth/wrong-password") {
        const emailError = document.getElementById("password-login-error");
        emailError.textContent = "Invalid Password";
        emailError.parentElement.className = "form-control error";
    }
    if (errorCode === "auth/user-not-found") {
        const emailError = document.getElementById("password-login-error");
        emailError.textContent = "Invalid Password";
        emailError.parentElement.className = "form-control error";
    }
}

export default handleFormError;