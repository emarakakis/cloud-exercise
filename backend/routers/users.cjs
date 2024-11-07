// routers/users.js
const express = require("express");
const router = express.Router();
const db = require('../databases/user-database.cjs');

router.post("/login-user", async(req, res) => {
    const { name, password } = req.body;
    console.log(name, password); // Ensure this prints the database connection object

    try{
        const [results] = await db.query("SELECT * FROM users WHERE name = ? AND password = ?",
        [name, password]);

        if (results.length > 0) {
            res.json({ success: true, userId: results[0].USERID });
        } else {
            console.log("User not found.");
            res.json({ success: false });
        }
    }
    catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Database error occurred" });
    }
})

router.post("/register-user", async (req, res) => {
    const { name, password } = req.body;

    try {
        const [result] = await db.query("INSERT INTO users (name, password) VALUES (?, ?)", [name, password]);
        
        // Check if the insert was successful
        if (result.affectedRows === 1) {
            res.status(201).json({ success: true, message: "User registered successfully", userId: result.insertId });
        } else {
            res.status(400).json({ success: false, message: "User registration failed" });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "An error occurred with the database." });
    }
});

module.exports = router;
