import { productById } from "./products.js";
import { hasUserToken } from './login.js';

export let cart = await loadUserCart()

if(!hasUserToken()){
    window.location.href ="./login.html";
}
let displayHTML = ''

const displayProducts = document.querySelector('.js-cart-display');
const basaImageURL = "/api/images";

if(displayProducts){
    displayCart()
}

function displayCart(){
    displayHTML = ''
    cart.forEach( item => {
        const curProduct = productById(item.productId);
        
        displayHTML += 
        `
        <div class="cart-product js-cart-product-${item.productId}">
            <img class="item-image" src="${basaImageURL}/${curProduct.image}" alt="${curProduct.name}">
            
            <div class="product-details">
                <p class="product-name">${curProduct.name}</p>
                <p class="product-quantity">Quantity: ${item.quantity}</p>
            </div>
            
            <div class="product-controls">
                <button class="js-remove-item" data-product-id="${item.productId}">Remove</button>
                <button class="js-update-quantity" data-product-id="${item.productId}">Update</button>
                <div class="js-on-quantity-update-${item.productId}"></div>
            </div>
        </div>

        `
    })
    displayProducts.innerHTML = displayHTML;

    document.querySelectorAll('.js-remove-item')
        .forEach( (button) => {
            button.addEventListener('click', async () => {
                const idToRemove = button.dataset.productId;

                await removeItemFromCart(idToRemove);
                displayCart();
            })
        })

    document.querySelectorAll('.js-update-quantity')
        .forEach( (button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                const onUpdate = document.querySelector(`.js-on-quantity-update-${productId}`);
                if(onUpdate.innerHTML != ''){
                    onUpdate.innerHTML = '';
                    return;
                }
                onUpdate.innerHTML = `
                    <input type='text' placeholder="New Quantity" class="js-new-quantity-${productId}">
                    <button class="js-quantity-save-${productId}"">Save</button>
                `
                document.querySelector(`.js-quantity-save-${productId}`)
                        .addEventListener('click', async () => {
                            const productId = button.dataset.productId;
                            const onUpdate = document.querySelector(`.js-on-quantity-update-${productId}`);
                            const newQuantity = Number(document.querySelector(`.js-new-quantity-${productId}`).value);
                            const cartItem = cart[findItemIndexFromProductId(productId)]
                            if (newQuantity > 0) {
                                const res = await fetch(`/api/cart/upt/${JSON.parse(localStorage.getItem('userId'))}-${productId}`,{
                                    method: 'POST',
                                    headers: {
                                    'Content-Type': 'application/json',
                                    },
                                    body : JSON.stringify({quantity: newQuantity})
                                });
                                
                                const data = await res.json();
                                cart = data.success ? data.cart : cart;
                            
                                if(data.message === "quantity"){
                                    window.alert(`Can only purchase ${data.quantity} amount of this product.\nTry again!`);
                                }
                            }
                            onUpdate.innerHTML='';
                            displayCart();
                })
            })
    })

    document.querySelector('.js-cart-price').innerHTML = calculateCartPrice();
    document.querySelector('.js-order-button')
        .addEventListener('click', () => {
            if(totalCartQuantity() > 0){
                window.location.href = "./order.html";
            }
        })
}

async function removeItemFromCart(productId) {
    const res = await fetch(`/api/cart/rmv/${JSON.parse(localStorage.getItem('userId'))}-${productId}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    cart = data.cart
}

function findItemIndexFromProductId(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            return i;  // Return the index of the item
        }
    }
    return -1;  // Return -1 if not found
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
    const res = await fetch(`/api/cart/${JSON.parse(localStorage.getItem('userId'))}`,{
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
        window.alert(`Can only add ${data.quantity} more of this product.\nTry again!`);
    }
    return false;
}

async function loadUserCart(){
    const res = await fetch(`/api/cart/${JSON.parse(localStorage.getItem('userId'))}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })

    const data = await res.json();  // Get the JSON response

    // Access the cartProducts from the parsed response
    const cartRet = data.cartProducts;

    if(!cartRet){
        return []
    }
    
    else{
        return cartRet;
    }
}

export async function cleanCart(){
    const res = await fetch(`/api/cart/cln/${JSON.parse(localStorage.getItem('userId'))}`,{
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