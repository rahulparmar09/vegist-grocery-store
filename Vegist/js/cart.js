const ProductItem = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.querySelector("#cart-items");
const totalElement = document.querySelector("#total");
const RemoveAll = document.querySelector(".remove-all");
const cartTitle = document.querySelector(".cart");
let total = 0;

if (ProductItem.length === 0) {
    cartTitle.innerHTML = `🛒 <span class="text-xl text-gray-600 font-medium">Your cart is empty</span>`;
}

ProductItem.forEach(cart => {
    const item = document.createElement("div");
    item.className =
        "flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-gray-300 pb-5";
    item.innerHTML = `
        <img src="${cart.image}" class="w-28 h-28 rounded object-cover object-top" />
        <span class="text-lg font-semibold flex-1">${cart.name}</span>
        <span class="text-lg font-bold text-gray-800">$${cart.price}</span>
        <div class="flex border border-gray-400 rounded">
          <button class="decrement w-10 text-xl text-gray-500 hover:text-red-500">-</button>
          <span class="number w-10 flex items-center justify-center border-x border-gray-400">${cart.quantity}</span>
          <button class="increment w-10 text-xl hover:text-green-500">+</button>
        </div>
        <button class="remove bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm">Remove</button>
      `;

    cartItems.appendChild(item);
    const price = cart.price;
    const numberEl = item.querySelector(".number");
    const incrementBtn = item.querySelector(".increment");
    const decrementBtn = item.querySelector(".decrement");

    total += price * cart.quantity;
    totalElement.textContent = total.toFixed(2);

    // Quantity +
    incrementBtn.addEventListener("click", () => {
        let quantity = parseInt(numberEl.textContent);
        quantity++;
        numberEl.textContent = quantity;
        total += price;
        totalElement.textContent = total.toFixed(2);
        cart.quantity = quantity;
        updateLocalStorage(cart.name, quantity);
    });

    // Quantity -
    decrementBtn.addEventListener("click", () => {
        let quantity = parseInt(numberEl.textContent);
        if (quantity > 1) {
            quantity--;
            numberEl.textContent = quantity;
            total -= price;
            totalElement.textContent = total.toFixed(2);
            cart.quantity = quantity;
            updateLocalStorage(cart.name, quantity);
        }
    });

    // Remove item
    item.querySelector(".remove").addEventListener("click", () => {
        const qty = parseInt(numberEl.textContent);
        total -= price * qty;
        totalElement.textContent = total.toFixed(2);
        item.remove();

        let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
        updatedCart = updatedCart.filter(product => product.name !== cart.name);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        if (updatedCart.length === 0) {
            cartTitle.innerHTML = `🛒 <span class="text-xl text-gray-600 font-medium">Your cart is empty</span>`;
        }
    });
});

// Update localStorage qty
function updateLocalStorage(name, newQty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map(product => {
        if (product.name === name) {
            product.quantity = newQty;
        }
        return product;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove All Button
if (ProductItem.length !== 0) {

    RemoveAll.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cartItems.innerHTML = "";
        cartTitle.innerHTML = `🛒 <span class="text-xl text-gray-600 font-medium">Your cart is empty</span>`;
        totalElement.textContent = "0";

        setTimeout(() => {
            alert("Thank you for shopping ! visit again");
            window.location.href = "/index.html";
        }, 1000);

    });
} else {
    RemoveAll.addEventListener("click", () => {
    alert("Please go for shopping !");
    window.location.href = "/products/fruit.html";

    });
}