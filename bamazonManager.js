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

// NEED TO BE ABLE TO LOOP BACK THROUGH PROMPT ONCE EACH FUNCTION IS DONE.
// put into function ... and call on each of the function definitions below....NOT WORKING...
// function select() {

// };

inquirer.prompt([
    {
        type: "list",
        name: "menu",
        message: "Select from one of the following: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    }
]).then(function (action) {

    // accessing the information from prompt
    var selection = action.menu;
    // console.log(selection)
    if (selection === "View Products for Sale") {
        viewProducts();
    }
    else if (selection === "View Low Inventory") {
        lowInventory();
    }
    else if (selection === "Add to Inventory") {
        addInventory();
    }
    else if (selection === "Add New Product") {
        addNewProduct();
    }
});
// select();

// Function will return all Products listed in database
function viewProducts() {
    connection.query("SELECT * FROM  products", function (err, result) {
        if (err) throw err;
        // Loop through result array
        for (var i = 0; i < result.length; i++) {
            console.log("ID: " + result[i].id + " " + "Name: " + result[i].product_name + " -- " + "Price: " + result[i].price + "--" + "Quantity: " + result[i].stock_quantity);
            console.log("                                  ")
        };
    });
    // select();
};

function lowInventory() {
    connection.query("SELECT * FROM  products", function (err, result) {
        if (err) throw err;
        // Loop through result array
        for (var i = 0; i < result.length; i++) {
            if (result[i].stock_quantity < 5) {
                console.log("ID: " + result[i].id + " " + "Name: " + result[i].product_name + " -- " + "Price: " + result[i].price + "--" + "Quantity: " + result[i].stock_quantity);
                console.log("                                  ")
            }
        };
    });
    // select();
};
function addInventory() {

    inquirer.prompt([
        {
            type: "list",
            name: "newStock",
            message: "Which product would you like to update?",
            choices: ["Deep Conditioner", "Gel", "Shampoo", "Adidas Sneakers", "Fuzzy Socks", "Sweatshirt", "Sweatpants", "iPhone Case", "Glass Screen Protector", "iPhone Charger"]
        },
        {
            type: "input",
            name: "newQuantity",
            message: "How many are now in stock?"
        }

    ]).then(function (product) {
        var choice = product.newStock;
        console.log(choice);
        var amount = product.newQuantity;
        console.log(amount);

        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: amount
                },
                {
                    product_name: choice
                }
            ],
            function (err, res) {
                console.log(res.affectedRows + " product updated!");
            }
        );
    });
    // select();
};

function addNewProduct() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "question",
            message: "Would you like to add a new product?"
        }
    ]).then(function (answer) {
        var response = answer.question;
        // console.log(response);
        if (response) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "productName",
                    message: "What new product would you like to add?"
                },
                {
                    type: "input",
                    name: "departmentName",
                    message: "What department is this product in?"
                },
                {
                    type: "input",
                    name: "price",
                    message: "What is the price of this product? (0.00)"
                },
                {
                    type: "input",
                    name: "stock",
                    message: "How many items are in stock?"
                }
            ]).then(function (newProduct) {
                var newItem = newProduct.productName;
                var department = newProduct.departmentName;
                var price = newProduct.price;
                var stock = newProduct.stock;

                var query = connection.query(
                    "INSERT INTO products SET? ",
                    {
                        product_name: newItem,
                        department_name: department,
                        price: price,
                        stock_quantity: stock
                    },
                    function (err, res) {
                        console.log(newItem + " added.\n")
                    }
                );
                console.log(query.sql);
            });
        };
    });
    // select();
};