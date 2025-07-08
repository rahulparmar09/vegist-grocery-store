document.querySelector("#regi").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.querySelector("#email").value.trim().toLowerCase();
    let password = document.querySelector("#password").value;
    const popup = document.getElementById("popup");

    const users = JSON.parse(localStorage.getItem("create")) || [];
    const foundUser = users.find(user => user.email === email);

    if (!foundUser) {
        alert("User not found!");
        return;
    }

    if (foundUser.password === password) {
        // Show success popup
        popup.classList.remove("hidden");

        // Save current user name to localStorage
        localStorage.setItem("username", foundUser.name);

        // Redirect after 2s
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 2000);
    } else {
        alert("Invalid Password!");
    }
});