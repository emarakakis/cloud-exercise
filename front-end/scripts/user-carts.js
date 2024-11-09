export const userCarts = JSON.parse(localStorage.getItem('userCarts')) || [];

// Function to retrieve a user's cart
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

// Function to add a new cart for a user
export function addUserCart(user, userCart) {
    const cartClone = JSON.parse(JSON.stringify(userCart));  // Ensure userCart is serializable
    userCarts.push({ user, userCart: JSON.stringify(cartClone) });
    saveUserCarts();
}

// Function to update a user's cart if it exists, otherwise add a new cart
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

// Helper function to save all user carts to localStorage
function saveUserCarts() {
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
}
