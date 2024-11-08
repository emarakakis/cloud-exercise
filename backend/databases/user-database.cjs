// db.js
const mysql = require('mysql2');

// Create a pool of connections to the database
const pool = mysql.createPool({
  host: 'localhost',       // MySQL host (usually 'localhost')
  user: 'root',            // MySQL username
  password: '123', // MySQL password
  database: 'orders',      // Name of your database
  waitForConnections: true,
  connectionLimit: 10,     // Maximum number of connections to create at once
  queueLimit: 0            // Set to 0 to disable queue limit (default behavior)
});

// Export the pool with promise support for easy async/await usage
module.exports = pool.promise();
