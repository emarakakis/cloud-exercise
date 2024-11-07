import { productById } from "../data/products.js";
import { hasUserToken } from './utils.js';

export let cart = await loadUserCart()

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
            button.addEventListener('click', async () => {
                const idToRemove = button.dataset.productId;

                const res = await fetch(`http://localhost:3000/cart/rmv/${JSON.parse(localStorage.getItem('userId'))}-${idToRemove}`,{
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });

                const data = await res.json();

                cart = data.cart
                

                //removeItemFromCart(idToRemove);
                //saveCart()
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
                        .addEventListener('click', async () => {
                            const productId = button.dataset.productId;
                            const onUpdate = document.querySelector(`.js-on-quantity-update-${productId}`);
                            const newQuantity = Number(document.querySelector(`.js-new-quantity-${productId}`).value);
                            console.log(typeof newQuantity)
                            const cartItem = cart[findItemIndexFromProductId(productId)]
                            if(newQuantity == 0){
                                //Make the remove fetch a function and call it here!
                                //removeItemFromCart(productId);
                            } else if (newQuantity < 0){
                                onUpdate.innerHTML='';
                                return;
                            } else {
                                onUpdate.innerHTML='';
                                const res = await fetch(`http://localhost:3000/cart/upt/${JSON.parse(localStorage.getItem('userId'))}-${productId}`,{
                                    method: 'POST',
                                    headers: {
                                    'Content-Type': 'application/json',
                                    },
                                    body : JSON.stringify({quantity: newQuantity})
                                });
                                
                                const data = await res.json();

                                cart = data.success ? data.cart : cart;
                            }

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

function removeItemFromCart(cart, productId) {
    const index = findItemIndexFromProductId(cart, productId);
    if (index !== -1) {  // Check if the item exists
        cart.splice(index, 1);  // Remove the item from the cart
    }
}

function findItemIndexFromProductId(cart, productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            return i;  // Return the index of the item
        }
    }
    return -1;  // Return -1 if not found
}

function findProductInCart(cart, productId) {
    for (const item of cart) {
        if (item.productId === productId) {
            return item;
        }
    }
    return false;
}

export function totalCartQuantity() {
    let totalQuantity = 0;
    for (const item of cart){
        totalQuantity += item.quantity;
    }

    return totalQuantity;
}

export function calculateCartPrice(){
    let totalPrice = 0
    for(const cartItem of cart){
        const product = productById(cartItem.productId);
        totalPrice += cartItem.quantity * product.priceCents;
    }

    return (totalPrice / 100).toFixed(2);
}

export async function addToCart(productId, quantity){
    const res = await fetch(`http://localhost:3000/cart/${JSON.parse(localStorage.getItem('userId'))}`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId: parseInt(productId), quantity: quantity})
    });
    
    const data = await res.json();

    if(data.success){
        return true;
    }

    if(data.message === "quantity"){
        console.log("The quantity is at false!");
        
    }
    return false;
}

async function loadUserCart(){
    const res = await fetch(`http://localhost:3000/cart/${JSON.parse(localStorage.getItem('userId'))}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })

    const data = await res.json();  // Get the JSON response

    // Access the cartProducts from the parsed response
    const cartRet = data.cartProducts;

    if(!cartRet){
        console.log("New!")
        return []
    }
    
    else{
        console.log("Old!");
        return cartRet;
    }
}



export async function cleanCart(){
    const res = await fetch(`http://localhost:3000/cart/cln/${JSON.parse(localStorage.getItem('userId'))}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })

    const data = await res.json();
    if (data.success){
        cart = []
    } else {
        console.error("Something went wrong with cart cleanup!")   
    }


}