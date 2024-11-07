export const products = await loadProducts();
 
export function productById(productId){
    for(const product of products){
        if (parseInt(product.id) === parseInt(productId)){
            return product;
        }
    }
    return products[1];
}

export async function loadProducts() {
    try {
        const res = await fetch("http://localhost:3000/products/product-list", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is successful
        if (!res.ok) {
            throw new Error(`Error fetching products: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.products;

    } catch (error) {
        console.error("Failed to load products:", error);
        return []; // Return an empty array or handle error as needed
    }
}