import { cart, addToCart, totalCartQuantity } from "./cart.js";
import { products } from "../data/products.js";

const basaImageURL = "http://localhost:3000/images"
let cartQuantity = -1;

//const products = await loadProducts() || []; 
//const cart = await loadUserCart() || [];

async function displayProducts() {
    let displayProductsHTML = '';

    // Wait until products are fetched


    products.forEach((product) => {
        displayProductsHTML += `
            <div class="product-container">
                <div class="product-inner-container">
                    <div class="product-information">
                        <img class="product-image" src="${basaImageURL}/${product.image}">
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
            button.addEventListener('click', async () => {
                const productId = button.dataset.productId;
                const quantity = Number(document.querySelector(`.js-selector-quantity-${productId}`).value);
                let success = await addToCart(productId, quantity);
                if (success)
                    updateCartQuantity(quantity)
            });

            
        });

    document.querySelector('.js-user-greetings').innerHTML = `Hello ${JSON.parse(localStorage.getItem('user'))}`;

    const cartButton = document.querySelector('.js-cart-quantity')
    cartButton.addEventListener('click', (button) => {
        fetch(`http://localhost:3000/cart/${JSON.parse(localStorage.getItem('userId'))}`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({cart})
        })  
    })
    
}

displayProducts();
updateCartQuantity();

export function updateCartQuantity(quantity){
    
    const cartButton = document.querySelector('.js-cart-quantity')
    console.log(cartQuantity + quantity)
    if(cartQuantity == -1){
        cartQuantity = totalCartQuantity()
    }
    else{
        cartQuantity += quantity
    }
    cartButton.innerHTML = cartQuantity;
}