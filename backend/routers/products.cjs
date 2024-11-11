const express = require('express');
const router = express.Router();
const db = require('../databases/product-database.cjs');

router.post("/display-product-list", async (req, res) => {
    try{
        let expression = req.body.expression;

        const escapedExpression = expression ? expression.replace(/\\/g, '\\\\').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") : '';

        // If `expression` is empty or null, fetch all products with quantity > 0
        const query = expression 
            ? `SELECT products.* 
               FROM products 
               INNER JOIN productquantity ON products.id = productquantity.id 
               WHERE productquantity.quantity > 0 
               AND products.name REGEXP ?`
            : `SELECT products.* 
               FROM products 
               INNER JOIN productquantity ON products.id = productquantity.id 
               WHERE productquantity.quantity > 0`;

        const [products] = expression 
        ? await db.query(query, [expression])
        : await db.query(query);
        
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

router.get("/all-product-list", async (req, res) => {
    try{
        const [products] = await db.query("SELECT * FROM products")
        console.log(products)
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