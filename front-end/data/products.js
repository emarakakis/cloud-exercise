export const products = []


addProduct('1', 'The Legend of Zelda: Breath of the wild'
    ,'../images/switch-zelda-breath-of-the-wild.png', 7000)

addProduct('2', 'Kingdom Hearts 3', '../images/kingdom-hearts-3.jpeg', 7000)

addProduct('3', 'The Sims 3', '../images/the-sims-3.jpg', 1000)
addProduct('4', 'Super Mario: World', '../images/super-mario-world.png', 2000)
addProduct('5', 'God Of War: Ragnarok', '../images/god-of-war-ragnarok.jpg', 7000)
addProduct('6', 'God Of War', '../images/god-of-war.jpg', 3500)

function addProduct(id, name, img, priceCents){
    const newProduct = {id, name, img, priceCents};
    products.push(newProduct);
}

export function productById(productId){
    for(const product of products){
        if (product.id === productId){
            return product;
        }
    }
    return products[1];
}