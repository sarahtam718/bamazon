// require packages
var mysql = require("mysql");
var inquirer = require("inquirer");
const { printTable } = require('console-table-printer');

// connect to mysql table
var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon"
});

// // show products from table
function showProducts() {
    connection.query("select * from products;", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            // console.log(res);
            for (let i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price);
            }
            // connection.end();
        }
    });
}

// showProducts();

// // ask user for what they want to buy and how much
function inq() {
    inquirer.prompt([
        {
            type: "input",
            name: "toBuy",
            message: "What is the ID number of the product you wish to purchase?",
        },
        {
            type: "input",
            name: "amount",
            message: "How many units of the product do you wish to purchase?",
        }
    ]).then(ans => {
        // console.log("user input: ", ans);
        console.log("Checking our inventory...");
        // if else statement depending on if enough quantity for user to purchase
        connection.query(`SELECT * FROM products WHERE item_id ='${ans.toBuy}'`, function (err, data) {
            // console.log(data);
            for (let j = 0; j < data.length; j++) {
                // console.log("\nhow much do we have? ", data[j].stock_quantity, "\n how much does the customer want? ", ans.amount);
                if (err) {
                    console.log(err);
                } else if (data[j].stock_quantity < ans.amount) {
                    console.log("Our apologies, but we have an insufficient quantity of that product.")
                    //     // start();
                } else {
                    console.log(`You have purchased ${ans.amount} unit(s) of this product: ${data[j].product_name}.`)
                    var total = ans.amount * data[j].price;
                    console.log(`Your total is $${total}. Thank you for shopping with us!`);
                    updateDB(ans);
                }
            }
            connection.end()
        });

    });
}

// // updateDB () that removes quantity from stock
function updateDB(user) {
    connection.query(
        `UPDATE products
        SET stock_quantity = stock_quantity - ${user.amount}
        WHERE item_id = ${user.toBuy};`, function (err, data) {
            // console.log(data);
            // for (let k = 0; k < data.length; k++) {
            // console.log(`\nwhat we have available: ${data[k].stock_quantity} \nwhat user wants: ${user.toBuy}`)
            // }
        });
}

// start function with show products () & inquirer ()
function start() {
    showProducts();
    setTimeout(function () { inq() }, 1000);
    // showProducts();
    //     connection.end();
}

start();