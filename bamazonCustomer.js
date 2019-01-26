const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Angel1Acuna",
    database: "Bamazon"
});

connection.connect(function(err){
    if (err) throw err;
});

const display = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
    })
};

const run = function() {
   
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                choices: function() {
                    const choiceArr = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArr.push(results[i].product_name);
                    }
                    return choiceArr;
                },
                message: "Please put in the ID of the product you would like to buy"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy?"
            }
        ]).then(function(answer) {
            // console.log('answer:', answer);
            let pickedProduct;
            for (let i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.product) {
                    pickedProduct = results[i];
                }
            }

            if (pickedProduct.stock_quantity > parseInt(answer.amount)) {
                connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: pickedProduct.stock_quantity - parseInt(answer.amount)
                },
                {
                    id: pickedProduct.id
                }], function(error) {
                    if (error) throw err;
                    console.log("Product purchased successfully!"); 
                    console.log("Purchase Summary");
                    
                    console.log("Item Name: " +  pickedProduct.product_name);
                    console.log("Item Count: " + parseInt(answer.amount));
                    
                    console.log("Total: " + "$" + (pickedProduct.price * parseInt(answer.amount))); 
                    display();
                    run();
                })
            } else {
                console.log("Insufficient quantity.");
                display();
                run();
            }
        })
        .catch(function(err){
            console.log(err);
        });
    });
};

display();
run();