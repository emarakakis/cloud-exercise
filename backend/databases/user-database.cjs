const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'ordersDB',
  port: 3306,      
  user: 'root',           
  password: '123', 
  database: 'orders',      
  waitForConnections: true,
  connectionLimit: 50,     
  queueLimit: 0            
});


module.exports = pool.promise();
