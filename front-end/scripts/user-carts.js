export const userCarts = JSON.parse(localStorage.getItem('userCarts')) || [];

export function getUserCart() {
    fetch(`http://localhost:3000/cart/${JSON.parse(localStorage.getItem('userId'))}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
})
    const user = JSON.parse(localStorage.getItem('user'));
    for (const cart of userCarts) {
        if (cart.user === user) {
            return cart.userCart;
        }
    }
    return null;
}

export function addUserCart(user, userCart) {
    const cartClone = JSON.parse(JSON.stringify(userCart));  
    userCarts.push({ user, userCart: JSON.stringify(cartClone) });
    saveUserCarts();
}

export function saveUserCart(user, userCart) {
    for (const cart of userCarts) {
        if (cart.user === user) {
            cart.userCart = userCart;
            saveUserCarts();
            return;
        }
    }
    addUserCart(user, userCart);
}

function saveUserCarts() {
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
}
