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
  inquirer.prompt([{
    type: "list",
    name: "doThing",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
  }]).then(function(ans){
     switch(ans.doThing){
      case "View Products for Sale": viewProducts();
      break;
      case "View Low Inventory": viewLowInventory();
      break;
      case "Add to Inventory": addToInventory();
      break;
      case "Add New Product": addNewProduct();
      break;
      case "End Session": console.log('Bye!');
    }
  });
}

function viewProducts(){

  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
  

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
  }

  start();
  });
}

function viewLowInventory(){
 

  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
   
  for(var i = 0; i<res.length;i++){
    if(res[i].StockQuantity <= 5){
    console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
    }
  }

  start();
  });
}

 function addToInventory()
  {
   
  connection.query('SELECT * FROM Products', function(err, res)
  {
  if(err) throw err;
  var itemArray = [];
  
  for(var i=0; i<res.length; i++){
    itemArray.push(res[i].ProductName);
  }
  }