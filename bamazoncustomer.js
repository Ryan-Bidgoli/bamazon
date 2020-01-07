
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Bamazon"
})

function start(){

connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;

  }
