document.querySelector("#regi").addEventListener("submit", function (e) {
    e.preventDefault();

    // Input values
    let name = document.querySelector("#name").value.trim();
    let email = document.querySelector("#email").value.trim().toLowerCase();
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirm-password").value;

    // Email validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Password length validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Confirm password match check
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Load existing users from localStorage
    let create = JSON.parse(localStorage.getItem("create")) || [];

    // Email already exists check
    let exists = create.find(user => user.email === email);
    if (exists) {
        alert("This email is already registered. Try logging in.");
        return;
    }

    // User object
    let storeDetails = {
        name: name,
        email: email,
        password: password
    };

    // Save to localStorage
    create.push(storeDetails);
    localStorage.setItem("create", JSON.stringify(create));

    alert("User registered successfully!");
    window.location.href = "login.html";
});