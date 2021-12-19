import mysql from 'mysql';

const db = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'shopify_custom_options',
    host: 'localhost',
    port : 3306
})

export default db;