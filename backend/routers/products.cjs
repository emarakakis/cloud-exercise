const express = require('express');
const router = express.Router();
const db = require('../databases/product-database.cjs');

const server_url = "http://localhost:3000"

router.get("/product-list", async (req, res) => {
    try{
        const [products] = await db.query("SELECT products.* FROM products INNER JOIN productquantity WHERE products.id = productquantity.id AND productquantity.quantity > 0")
        if (products.length > 0) {
            res.json({ success: true, products: products });
        } else {
            res.json({ success: false, products:[] });
        }
    }
    catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Database error occurred" });
    }
})

module.exports = router;