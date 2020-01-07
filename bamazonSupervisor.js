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
    choices: ["View Product Sales by Department", "Create New Department", "End Session"]
  }]).then(function(ans){
    switch(ans.doThing){
      case "View Product Sales by Department": viewProductByDept();
      break;
      case "Create New Department": createNewDept();
      break;
      case "End Session": console.log('Bye!');
    }
  });
}

function viewProductByDept(){
 
  connection.query('SELECT * FROM Departments', function(err, res){
    if(err) throw err;
    
    for(var i = 0; i<res.length;i++){
      console.log("Department ID: " + res[i].DepartmentID + " | " + "Department Name: " + res[i].DepartmentName + " | " + "Over Head Cost: " + (res[i].OverHeadCosts).toFixed(2) + " | " + "Product Sales: " + (res[i].TotalSales).toFixed(2) + " | " + "Total Profit: " + (res[i].TotalSales - res[i].OverHeadCosts).toFixed(2));
    }
    start();
  })
}
