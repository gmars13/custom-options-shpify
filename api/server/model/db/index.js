import mysql from 'mysql';
import dbConfig  from '../../../config/db.config'

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
console.log(connection)
module.exports = connection;