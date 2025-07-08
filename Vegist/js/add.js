function updateCartCount() {
    const cartCountEl = document.getElementById("cart-count");
    if (!cartCountEl) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQty = 0;

    cart.forEach(item => {
        totalQty += item.quantity || 1;
    });

    if (totalQty > 0) {
        cartCountEl.classList.remove("hidden");
        cartCountEl.textContent = totalQty;
    } else {
        cartCountEl.classList.add("hidden");
    }
}

//Update count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

const addTocart = document.querySelectorAll(".add-cart");

addTocart.forEach(button => {
    button.addEventListener("click", () => {
        const user = localStorage.getItem("username");
        if (!user) {
            alert("Please login first!");
            window.location.href = "/products/login.html";
            return;
        }

        const product = button.closest(".product");
        const name = product.querySelector("h3").textContent;
        const price = parseFloat(product.querySelector("h4").textContent.replace("$", ""));
        const image = product.querySelector("img").src;

        const productObj = { name, price, image, quantity: 1 };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const exists = cart.find(item => item.name === productObj.name);
        if (exists) {
            alert("This item is already in the cart.");
        } else {
            cart.push(productObj);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart!");
            updateCartCount(); // Update badge after adding
        }
    });
});


