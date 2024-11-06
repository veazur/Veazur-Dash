function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const uppercasePattern = /[A-Z]/;

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }

    if (!uppercasePattern.test(password)) {
        alert('Password must contain at least one uppercase letter.');
        return false;
    }

    if (firstName.length === 0 || lastName.length === 0) {
        alert('Please enter first and last name.');
        return false;
    }

    return true;
}