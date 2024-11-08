const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'ordersDB',       
  user: 'root',           
  password: '123', 
  database: 'orders',      
  waitForConnections: true,
  connectionLimit: 10,     
  queueLimit: 0            
});


module.exports = pool.promise();
