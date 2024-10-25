// routers/users.js
const express = require("express");
const router = express.Router();

// A sample route to handle GET requests to /api/users
router.get("/", (req, res) => {
    res.send("This is the Users API");
});

// A sample route to handle POST requests to /api/users
router.post("/", (req, res) => {
    // Access JSON data from the request body
    const newUser = req.body;  // JSON data parsed by express.json()
    res.send(`User created: ${JSON.stringify(newUser)}`);
});

module.exports = router;
