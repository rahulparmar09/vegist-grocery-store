const searchOpenIcons = document.querySelector(".seach-open"); // search icon
const searchModal = document.querySelector(".seach-modal");
const searchClose = document.querySelector(".close-modall");

// open
searchOpenIcons.addEventListener("click", () => {
    searchModal.style.display = "block"; // 
});

// close button
searchClose.addEventListener("click", () => {
    searchModal.style.display = "none"; // 
});

// drawer mobile
function toggleDropdown(id) {
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
}

// date componet
const targetDate = new Date().getTime() + (365 * 24 * 60 * 60 * 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);


// Hover img
const hoverImages = document.querySelectorAll(".hover-img");

hoverImages.forEach(img => {
    const originalSrc = img.getAttribute("data-original");
    const hoverSrc = img.getAttribute("data-hover");

    img.addEventListener("mouseenter", () => {

        img.src = hoverSrc;

    });

    img.addEventListener("mouseleave", () => {
        setTimeout(() => {

            img.src = originalSrc;
        }, 100);
    });
});


// print name user
const Uname = document.querySelector("#Uname");
const logout = document.querySelector("#logout");

// get local
const username = localStorage.getItem("username");

if (username && Uname) {
    Uname.innerHTML = username;
}

if (username) {
    logout.addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.href = "/products/login.html";
    });
}
//cart button 
const cartButton = document.querySelector(".cart");

cartButton.addEventListener("click", () => {
    window.location.href = "/products/cart.html";
});

