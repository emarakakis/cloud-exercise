import { cart, calculateCartPrice, cleanCart } from "./cart.js";
export let orders = JSON.parse(localStorage.getItem('orders')) || []
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
    orderButton.addEventListener('click', () => {
        const firstName = document.querySelector('.js-order-first-name').value;
        const surname = document.querySelector('.js-order-surname').value;  
        const email = document.querySelector('.js-order-email').value;
        const city = document.querySelector('.js-order-city').value;
        const user = JSON.parse(localStorage.getItem('user'));
        const products = cart;
        console.log(products);
        addOrder(getUniqueOrderID(),user, firstName, surname, email, city, products, calculateCartPrice())
        saveOrders();
        cleanCart();
        //window.location.href="../html/index.html";
        console.log(orders);
    })

}

function addOrder(orderId,user, firstName, surname, email, city, products, price){
    const newOrder = {orderId,user, firstName, surname, email, city, products, price}
    orders.push(newOrder);
}

function getUniqueOrderID(){
    const res = `${orderCount++}`;
    localStorage.setItem('orderCount', orderCount);
    return res
}

function saveOrders(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function removeOrderById(orderId) {
    console.log(orders);
    for (let i = 0; i < orders.length; i++) {
        if (orderId === orders[i].orderId) {
            orders.splice(i, 1);
            break;
        }
    }
    saveOrders();

    console.log(orders);
}


export function findUserOrders(user){
    const userOrders = []
    for(const order of orders){
        console.log(user)
        console.log(order.user)
        if(user===order.user){
            userOrders.push(order);
        }
    }
    return userOrders;
}
