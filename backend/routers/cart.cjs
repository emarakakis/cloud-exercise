const express = require('express');
const router = express.Router();
const server_url = "http://localhost:3000";
const db = require('../databases/user-database.cjs');

router.post("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const productAdded = req.body;
    const table_name = `cart-${userId}`;
    try {
        const [results] = await db.query(`SELECT * FROM \`${table_name}\` WHERE productId = ?`, [productAdded.productId])
        
        if (results[0]){
            const existingQuantity = results[0].quantity;
            const newQuantity = existingQuantity + productAdded.quantity;
            console.log("Already in!");
            await db.query(
                `UPDATE \`${table_name}\` SET quantity = ? WHERE productId = ?`, 
                [newQuantity, productAdded.productId]
            );   
        }

        else {
            console.log("New Addition!");
            await db.query(
                `INSERT INTO \`${table_name}\` (productId, quantity) VALUES (?, ?)`,
                [productAdded.productId, productAdded.quantity]
            );
        }

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Database error occurred" });
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
            // If the table doesn't exist, create it
            console.log("Big dog!");
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
    console.log("I am here!")

    try {
        const [results] = await db.query(`SELECT * FROM \`${tableName}\` WHERE productId = ?`, [productId])

        if (results.length > 0){
            await db.query(`DELETE FROM \`${tableName}\` WHERE productId = ?`, [productId]);
            const [cart] = await db.query(`SELECT * FROM \`${tableName}\``);
            res.json( {success: true, cart});
        } else {
            res.json( {success: false})
        }

    } catch {
        console.log("Fuck off biatch");
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
            console.log("Fuck yeah buddyy");
            await db.query(`UPDATE \`${tableName}\` SET quantity = ? WHERE productId = ?`, [newQuantity,productId]);
            const [cart] = await db.query(`SELECT * FROM \`${tableName}\``);
            res.json( {success: true, cart});

        } else {
            res.json({success : false})
        }


    } catch {

    }
})

module.exports = router;
