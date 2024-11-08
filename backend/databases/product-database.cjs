
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'productsDB',       
  user: 'root',            
  password: '123', 
  database: 'products',   
  waitForConnections: true,
  connectionLimit: 10,    
  queueLimit: 0           
});

module.exports = pool.promise();
