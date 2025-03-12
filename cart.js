// cart.js

// Retrieve cart from local storage or initialize it
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(item) {
    cart.push(item);
    saveCart();
    alert(`${item.name} has been added to the cart.`);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Render cart items on the cart page
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '0';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Initialize the cart rendering if on the cart page
if (document.querySelector('.cart-items')) {
    renderCart();
}

// Add event listeners for 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const name = productElement.querySelector('h3').textContent;
        const price = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        const item = { name, price };
        addToCart(item);
    });
});
