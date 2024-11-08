import { cart, calculateCartPrice, cleanCart } from "./cart.js";
//export let orders = await loadOrders()
import { hasUserToken } from './utils.js';

if(!hasUserToken()){
    window.location.href ="../html/login.html";
}

let orderCount = JSON.parse(localStorage.getItem('orderCount')) || 0;

const orderDisplay = document.querySelector('.js-order-display')

if (orderDisplay){
    const price = document.querySelector('.js-display-price');
    const orderButton = document.querySelector('.js-finish-order');
    
    price.innerHTML = calculateCartPrice();
    orderButton.addEventListener('click', async () => {
        const firstName = document.querySelector('.js-order-first-name').value;
        const surname = document.querySelector('.js-order-surname').value;  
        const email = document.querySelector('.js-order-email').value;
        const city = document.querySelector('.js-order-city').value;
        const products = cart;

        await addOrder(firstName, surname, email, city, products, calculateCartPrice())
        window.location.href="../html/index.html";
    })
}

async function addOrder(firstName, surname, email, city, products, price){
    const res = await fetch(`http://backend:3000/orders/${JSON.parse(localStorage.getItem('userId'))}`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body : JSON.stringify({firstName, surname, email, city, products, price})
    });
}

export async function removeOrderById(orderId) {
    const res = await fetch(`http://backend:3000/orders/rmv/order`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body : JSON.stringify({orderId})
    });

    console.log("Out of remove!");
    const data = await res.json()
    
    return data.orders;    
    
}


export async function findUserOrders(){
    const res = await fetch(`http://backend:3000/orders/view/${JSON.parse(localStorage.getItem('userId'))}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });

    const data = await res.json()
    return data.orders;    
}
