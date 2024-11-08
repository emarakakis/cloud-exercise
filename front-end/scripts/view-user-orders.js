import { productById } from '../data/products.js';
import { findUserOrders, removeOrderById} from './order.js'
import { hasUserToken } from './utils.js';

if(!hasUserToken()){
    window.location.href ="../html/login.html";
}

const viewDisplay = document.querySelector('.js-view-order-display');

if(viewDisplay){
    await displayOrders();
}

async function displayOrders(){
    console.log("In display!")
    const userOrders = await findUserOrders();
    console.log(userOrders);
    let displayHTML = ''
    userOrders.forEach( order => {
        
        displayHTML += `
        <div class="js-order-container-${order.orderId}">
            <p>Items:</p>
            <div class="js-order-items-container" data-products=${JSON.stringify(order.products)}>
            </div>
            <p>Information:</p>
            <div class="js-order-information">
                <p>FirstName: ${order.firstName} Surname: ${order.surname} Email: ${order.email} City: ${order.city}<br> Price: ${order.price}</p>
            </div>
            <button class="js-button-remove-order" data-order-id="${order.orderId}">Cancel Order</button>
        </div>
        
        `
    })

    document.querySelector('.js-view-order-display').innerHTML =displayHTML;

    document.querySelectorAll('.js-order-items-container')
        .forEach( (itemContainer) => {
            const cartProducts = JSON.parse(itemContainer.dataset.products);
            console.log(cartProducts);
            cartProducts.forEach( item => {
                itemContainer.innerHTML += `<p>${productById(item.productId).name} Quantity: ${item.quantity}</p>`
            })  
        })

    document.querySelectorAll('.js-button-remove-order')
        .forEach( (button) => {
            button.addEventListener('click', async () => {
                const orderId = button.dataset.orderId;
                console.log("Pressed the button");
                await removeOrderById(orderId);
                console.log("Out of the async");
                window.location.href = "."
            })
        })
}