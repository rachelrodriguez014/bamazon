// Require node packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Generate connection to sql database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Oranges55!",

    database: "bamazon_db"
});

// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// Establish connection to mysql db and run the itemDisplay function
// Have to go back and close the connection at the end of each function!!!!
connection.connect(function (err) {
    if (err) throw err;
    console.log("")
    itemDisplay();
});

// function that will make query to database and return the product id #, product, and price if the product is available (quantity more that 0).
function itemDisplay() {
    connection.query("SELECT * FROM  products", function (err, result) {

        if (err) throw err;
        // console.log(result);
        // Loop through result array
        for (var i = 0; i < result.length; i++) {
            // If the product stockquantiy is more than 0 then display it to the console.
            if (result[i].stock_quantity > 0) {
                console.log("ID: " + result[i].id + " " + "Name: " + result[i].product_name + " -- " + "Price: " + result[i].price);
            }
            // Otherwise state that the product is unavailable.
            else {
                console.log("ID: " + result[i].id + " " + "Name: " + result[i].product_name + ":" + " " + "Sorry, we're all out!");
            };

            console.log("                                  ")
        };

    });
    return buyItem();

};

// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function buyItem() {

} inquirer.prompt([
    {
        type: "input",
        name: "id",
        message: "Enter the ID of the procuct you would like to buy."
    },
    {
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?"
    }
]).then(function (product) {

    var id = product.id;
    var quantity = product.quantity;
    console.log("ID: ", id);
    console.log("Quantity: ", quantity);

    // have to pass the arguments through function
    checkStock(quantity, id);
});

// Function that will check stock quantity 

function checkStock(quantity, id) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // look into contains instead of for loop
        for (var j = 0; j < res.length; j++) {
            if (res[j].stock_quantity === 0) {
                console.log("ID: " + res[j].id + " " + "Name: " + res[j].product_name + ":" + " " + "Sorry, we're all out of stock!");
            }
            else {
                purchaseItem(quantity, id);

            };
        };
    });
};

// How do I get variables defined in prompt to pass through the purchaseItem() function.
function purchaseItem(quantity, id) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity--
            },
            {
                id: id
            }
        ],
        function (err, res) {
            // console.log(res);
            if (err) throw err;
            // console.log("Product updated.");
            buyItem();
        }
    )
    return buyItem();

};
// if you purchase an item:
// price * quantity is added to sales column




// Modify the products table so that there's a product_sales column, and 
// modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.