const express = require('express');
const router = express.Router();
const db = require('../databases/product-database.js');

router.post("/product-list", async (req, res) => {
    try{
        const [results] = await db.query("SELECT * FROM products")
        console.log(`This is the results ${results}`)
        if (results.length > 0) {
            console.log("User found!");
            res.json({ success: true, products:results });
        } else {
            console.log("User not found.");
            res.json({ success: false, products:[] });
        }
    }
    catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Database error occurred" });
    }
})

module.exports = router;