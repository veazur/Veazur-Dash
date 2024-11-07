function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email.length === 0 || password.length === 0) {
        alert('Please enter your email and password.');
        return false;
    }

    return true;
}