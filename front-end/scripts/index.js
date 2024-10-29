import { hasUserToken } from "./utils.js";
import { cart, addToCart } from "./cart.js";
import { loadProducts } from "../data/products.js";

async function displayProducts() {
    let displayProductsHTML = '';

    // Wait until products are fetched
    const products = await loadProducts() || []; 

    console.log(products);

    products.forEach((product) => {
        displayProductsHTML += `
            <div class="product-container">
                <div class="product-inner-container">
                    <div class="product-information">
                        <img class="product-image" src="${product.image}">
                        <p class="product-name">${product.name}</p>
                        <p class="price">${(product.priceCents / 100).toFixed(2)}$</p>
                    </div>
                </div> 
                <div class="product-purchase-information">
                    <p>Quantity</p>
                    <select class="js-selector-quantity-${product.id}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                    <button class="buy-button js-buy-button" data-product-id="${product.id}">Buy</button>
                </div>
            </div>
        `;
    });

    document.querySelector('.js-display-products').innerHTML = displayProductsHTML;

    // Attach event listeners after the HTML is rendered
    document.querySelectorAll('.js-buy-button')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                const quantity = Number(document.querySelector(`.js-selector-quantity-${productId}`).value);
                addToCart(productId, quantity);
            });
        });

    document.querySelector('.js-user-greetings').innerHTML = `Hello ${JSON.parse(localStorage.getItem('user'))}`;
}

// Run the displayProducts function
displayProducts();
