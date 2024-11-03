import { productById } from "../data/products.js"
import { getUserCart, saveUserCart } from "../data/user-carts.js";
import { hasUserToken } from './utils.js';

if(!hasUserToken()){
    window.location.href ="../html/login.html";
}
let displayHTML = ''

const displayProducts = document.querySelector('.js-cart-display');

if(displayProducts){
    displayCart()
}

function displayCart(){
    displayHTML = ''
    cart.forEach( item => {
        const curProduct = productById(item.productId);
        displayHTML += 
        `
            <div class = "cart-product js-cart-product-${item.productId}">
                <p>${curProduct.name} : Quantity : ${item.quantity}</p>
                <button class="js-remove-item" data-product-id="${item.productId}">Remove</button>
                <button class="js-update-quantity" data-product-id="${item.productId}">Update</button>
                <div class="js-on-quantity-update-${item.productId}"></div>
            </div>
        `
    })
    displayProducts.innerHTML = displayHTML;

    document.querySelectorAll('.js-remove-item')
        .forEach( (button) => {
            button.addEventListener('click', () => {
                const idToRemove = button.dataset.productId;
                removeItemFromCart(idToRemove);
                saveCart()
                displayCart();
            })
        })

    document.querySelectorAll('.js-update-quantity')
        .forEach( (button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                const onUpdate = document.querySelector(`.js-on-quantity-update-${productId}`);
                onUpdate.innerHTML = `
                    <input type='text' placeholder="New Quantity" class="js-new-quantity-${productId}">
                    <button class="js-quantity-save-${productId}"">Save</button>
                `
                document.querySelector(`.js-quantity-save-${productId}`)
                        .addEventListener('click', () => {
                            const productId = button.dataset.productId;
                            const onUpdate = document.querySelector(`.js-on-quantity-update-${productId}`);
                            const newQuantity = document.querySelector(`.js-new-quantity-${productId}`).value;
                            const cartItem = cart[findItemIndexFromProductId(productId)]
                            if(newQuantity == 0){
                                removeItemFromCart(productId);
                            } else if (newQuantity < 0){
                                onUpdate.innerHTML='';
                                return;
                            } else {
                                cartItem.quantity = newQuantity
                                onUpdate.innerHTML='';
                            }

                            saveCart();
                            displayCart();
                })
            })

    })

    document.querySelector('.js-cart-price').innerHTML = calculateCartPrice();
    document.querySelector('.js-order-button')
        .addEventListener('click', () => {
            if(totalCartQuantity() > 0){
                window.location.href = "../html/order.html";
            }
        })
    
}

function removeItemFromCart(productId) {
    const index = findItemIndexFromProductId(productId);
    if (index !== -1) {  // Check if the item exists
        cart.splice(index, 1);  // Remove the item from the cart
    }
}

function findItemIndexFromProductId(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            return i;  // Return the index of the item
        }
    }
    return -1;  // Return -1 if not found
}

function saveCart(){
    saveUserCart(JSON.parse(localStorage.getItem('user')), cart);
}

function findProductInCart(productId) {
    for (const item of cart) {
        if (item.productId === productId) {
            return item;
        }
    }
    return false;
}

function totalCartQuantity() {
    let totalQuantity = 0;
    for (const item of cart){
        totalQuantity += item.quantity;
    }

    return totalQuantity;
}

function calculateCartPrice(){
    let totalPrice = 0
    for(const cartItem of cart){
        const product = productById(cartItem.productId);
        totalPrice += cartItem.quantity * product.priceCents;
    }

    return (totalPrice / 100).toFixed(2);
}

function addToCart(productId, quantity){
    
    const itemFound = findProductInCart(productId)
    if(!itemFound){
        cart.push({productId, quantity})
    } else {
        itemFound.quantity += quantity;
    }
    document.querySelector('.js-cart-quantity')
        .innerHTML = totalCartQuantity();

    saveCart();
}

function cleanCart(){
    cart.splice(0, cart.length);
    saveCart();
}

module.exports = {cart, cleanCart, addToCart, calculateCartPrice}