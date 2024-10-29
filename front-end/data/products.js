 export const products = loadProducts();
 
 export function productById(productId){
    for(const product of products){
        if (product.id === productId){
            return product;
        }
    }
    return products[1];
}

export async function loadProducts() {
    const res = await fetch("http://localhost:3000/products/product-list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
    const data = await res.json();
    return data.products;
}