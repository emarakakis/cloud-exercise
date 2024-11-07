const express = require('express')
const router = express.Router();
const userDB = require('../databases/user-database.cjs')
const productDB = require('../databases/product-database.cjs')

router.post('/:userId', async (req, res) => {
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
            const products = `products-${orderId}`;
            await userDB.query(
                `UPDATE orders SET products = ? WHERE orderId = ?`,
                [products, orderId]
            );

            const cartTableName = `cart-${userId}`
            await userDB.query(`RENAME TABLE \`${cartTableName}\` TO \`${products}\``)

            res.json({success:true});

        } catch {

        }
    })


module.exports = router;