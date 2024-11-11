const express = require('express');
const router = express.Router();
const server_url = "http://localhost:3000";
const db = require('../databases/user-database.cjs');
const productdb = require('../databases/product-database.cjs');

router.post("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const productAdded = req.body;
    const table_name = `cart-${userId}`;
    try {
        const q = await checkProductQuantity(productAdded, userId, 0) 
        if (!q){
            const [remainderQuantity] = await productdb.query(`SELECT quantity FROM productquantity WHERE id = ?`, [productAdded.productId])
            const [cartQuantity] = await db.query(`SELECT quantity FROM  \`${table_name}\` WHERE productId = ?`, [productAdded.productId])
            res.json({success:false, message:"quantity", quantity: remainderQuantity[0].quantity - cartQuantity[0].quantity})
            return;
        }
        
        const [results] = await db.query(`SELECT * FROM \`${table_name}\` WHERE productId = ?`, [productAdded.productId])
        
        if (results[0]){
            const existingQuantity = results[0].quantity;
            const newQuantity = existingQuantity + productAdded.quantity;

            await db.query(
                `UPDATE \`${table_name}\` SET quantity = ? WHERE productId = ?`, 
                [newQuantity, productAdded.productId]
            );   
            res.json({success: true})
        }

        else {
            await db.query(
                `INSERT INTO \`${table_name}\` (productId, quantity) VALUES (?, ?)`,
                [productAdded.productId, productAdded.quantity]
            );
            res.json({success: true})
        }

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "database" });
    }
});

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;

    // Dynamically generate table name
    const tableName = `cart-${userId}`;
    
    try {
        // Check if the table exists
        const [rows] = await db.query(
            `SELECT EXISTS(
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_schema = DATABASE() 
                AND table_name = ? 
             ) AS tableExists`, 
            [tableName]  // Safely use table name as value
        );

        if (rows[0].tableExists) {
            // Query the cart table directly if it exists
            const [results] = await db.query(`SELECT * FROM \`${tableName}\``);
            if (results.length > 0) {
                res.json({ success: true, cartProducts: results });
            } else {
                res.json({ success: false, message: "Cart is empty" });
            }
        } else {
            await db.query(`CREATE TABLE \`${tableName}\` (productId INT PRIMARY KEY, quantity INT)`);
            res.json({ success: true, message: "Cart table created" });
        }

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Database error occurred" });
    }
});

router.get("/rmv/:userId-:productId", async (req, res) =>{

    const userId = req.params.userId;
    const productId = req.params.productId;
    const tableName = `cart-${userId}`

    try {
        const [results] = await db.query(`SELECT * FROM \`${tableName}\` WHERE productId = ?`, [productId])

        if (results.length > 0){
            await db.query(`DELETE FROM \`${tableName}\` WHERE productId = ?`, [productId]);
            const [cart] = await db.query(`SELECT * FROM \`${tableName}\``);
            res.json( {success: true, cart});
        } else {
            res.json( {success: false})
        }

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "database" });
    }
})

router.post("/upt/:userId-:productId", async(req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const tableName = `cart-${userId}`
    const newQuantity = parseInt(req.body.quantity)

    try{
        const [results] = await db.query(`SELECT * FROM \`${tableName}\` WHERE productId = ?`, [productId])
        if (results.length > 0){

            const q = await checkProductQuantity({productId: productId, quantity: newQuantity}, userId, 1);
            if (!q){
                const [remainderQuantity] = await productdb.query(`SELECT quantity FROM productquantity WHERE id = ?`, [productId])
                res.json({success:false, message:"quantity", quantity: remainderQuantity[0].quantity})
                return;
            }

            await db.query(`UPDATE \`${tableName}\` SET quantity = ? WHERE productId = ?`, [newQuantity,productId]);
            const [cart] = await db.query(`SELECT * FROM \`${tableName}\``);
            res.json( {success: true, cart});

        } else {
            res.json({success : false})
        }

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "database" });
    }
})

router.get("/cln/:userId", async (req, res) => {
    const userId = req.params.userId;
    const tableName = `cart-${userId}`

    try {
        await db.query(`TRUNCATE \`${tableName}\``);
        res.json({success: true})
    } catch {
        res.json({success: false})
    }


})

async function checkProductQuantity(productAdded, userId, update){
    const tableName = `cart-${userId}`
    const [productQuantity] = await productdb.query(`SELECT * FROM productquantity WHERE id = ?`, [productAdded.productId]);
    if(productQuantity.length <= 0){
        return;
    }
    let curQuantity = 0
    if(!update){
        const [currentInCart] = await db.query(`SELECT quantity FROM \`${tableName}\` WHERE productId = ?`, [productAdded.productId]);
        curQuantity = currentInCart[0] ? productAdded.quantity + currentInCart[0].quantity : productAdded.quantity;
    }
    else{
        curQuantity = productAdded.quantity;
    }

    
    if(productQuantity[0].quantity < curQuantity){
        return false;
    }
    else{
        return true;
    }
}
module.exports = router;
