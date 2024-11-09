export let displayProducts = await loadDisplayProducts('');
export const allProducts = await loadAllProducts();
 
export function productById(productId){
    for(const product of allProducts){
        if (parseInt(product.id) === parseInt(productId)){
            return product;
        }
    }
    return products[1];
}

export async function loadDisplayProducts(expression) {
    try {
        const res = await fetch("http://localhost:3000/products/display-product-list", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({expression})
        });

        if (!res.ok) {
            throw new Error(`Error fetching products: ${res.status} ${res.statusText}`);
        }

        let data = await res.json();
        return data.products;

    } catch (error) {
        console.error("Failed to load products:", error);
        return []; // Return an empty array or handle error as needed
    }
}

export async function loadAllProducts() {
    try {
        const res = await fetch("http://localhost:3000/products/all-product-list", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Error fetching products: ${res.status} ${res.statusText}`);
        }

        let data = await res.json();
        return data.products;

    } catch (error) {
        console.error("Failed to load products:", error);
        return []; // Return an empty array or handle error as needed
    }
}