const express = require('express');
const router = express.Router();
const userDB = require('../databases/user-database.cjs');
const productDB = require('../databases/product-database.cjs');

router.get('/view/:userId', async (req, res) =>{
    const userId = req.params.userId;
    try 
    {
        const [userOrders] = await userDB.query("SELECT * FROM orders WHERE userId = ?", [userId])
        const [products] = await productDB.query("SELECT * FROM products")
        console.log(products);
        console.log(userOrders);
        for(const order of userOrders){
            const tableName = `products-${order.orderId}`
            const [orderProducts] = await userDB.query(`SELECT * FROM \`${tableName}\``)
            console.log(orderProducts);
            order.products = orderProducts
        }

        res.json({success:true, orders: userOrders});
    } catch {
        console.log("Fuck me in the ass");
    }
})

router.post('/:userId', async (req, res) => {
    console.log("Got in little bitch!");
    const userId = req.params.userId;
    const { firstName, surname, email, city, products, price } = req.body;

        try {
            const result = await userDB.query(
                `INSERT INTO orders (userId, firstName, lastName, email, price, city) 
                VALUES (?, ?, ?, ?, ?, ?)`, 
                [userId, firstName, surname, email, price, city]
            );
            const orderId = result[0].insertId;
            console.log(orderId)
            const orderProducts = `products-${orderId}`;
            await userDB.query(
                `UPDATE orders SET products = ? WHERE orderId = ?`,
                [orderProducts, orderId]
            );
            const cartTableName = `cart-${userId}`
            await userDB.query(`RENAME TABLE \`${cartTableName}\` TO \`${orderProducts}\``)

            updateProductQuantity(products)

            res.json({success:true});

        }     catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ success: false, message: "Database error occurred" });
        }
    })

router.post("/rmv/order", async(req, res) => {
    const orderId = parseInt(req.body.orderId);
    const tableName = `products-${orderId}`

    try{
        const [order] = await userDB.query(`SELECT * FROM \`${tableName}\` `);
        await userDB.query("DELETE FROM orders WHERE orderId = ?", [orderId])

        for(const product of order){
            product.quantity *= -1;
        }
        await updateProductQuantity(order);
        await userDB.query(`DROP TABLE \`${tableName}\``)
        console.log("Finished remove!");

        res.json({success:true})

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Database error occurred" });
    }
})

async function updateProductQuantity(products){
    for(const prod of products){
        const [appears] = await productDB.query(`SELECT * FROM productquantity WHERE id = ?`, [prod.productId])
        if(appears.length > 0){
            
            let newQuantity = appears[0].quantity - prod.quantity
            newQuantity = newQuantity > 0 ? newQuantity : 0
            await productDB.query(`UPDATE productquantity SET quantity = ? WHERE id = ?`, [newQuantity, prod.productId]);
        }
    }
}


module.exports = router;