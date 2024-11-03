const express = require('express');
const router = express.Router();
const server_url = "http://localhost:3000";
const db = require('../databases/user-database.js');
const { products } = require('../../front-end/data/products.js');

router.post("/:userId", async (req, res) => {
    
})

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    
    try{
        const [rows] = await db.query(
            `SELECT EXISTS(
               SELECT * 
               FROM information_schema.tables 
               WHERE table_schema = 'orders' 
               AND table_name = 'users'
             ) AS tableExists`
              ,[`cart-${userId}`]
        );
          
        // Check the result correctly:
        if (rows[0].tableExists) {
            const [results] = await db.query("SELECT * FROM ?", [`cart-${userId}`])
            if (results.length > 0) {
                res.json({ success: true, cartProducts: results[0]});
            } else {
                res.json({ success: false});
            }
        } 
        
        else {
            res.json({ success: false});
        }
    }
    catch (error) {
        console.error("Database error:", error);
        res.status(666).json({ success: false, message: "Database error occurred" });
    }
})

module.exports = router;