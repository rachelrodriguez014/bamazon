var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Oranges55!",

    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected on port: " + connection.threadId);
});

inquirer.prompt([
    {
        type: "list",
        name: "menu",
        message: "Select from one of the following: ",
        choices: ["View Product Sales by Department", "Create New Department"],
    }
]).then(function (action) {

    var selection = action.menu;
    // console.log(selection)
    if (selection === "View Product Sales by Department") {
        viewProductSales();
    }
    else if (selection === "Create New Department") {
        createNewDepartment();
    }
});

