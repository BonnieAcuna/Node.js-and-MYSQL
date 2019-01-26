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

const run = function() {
   
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        
        inquirer.prompt([
            {
                name: "select",
                type: "list",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                message: "What would you like to do?"
            }
        ]).then(function(answer) {

            switch (answer.select) {
                case "View Products for Sale":
                    connection.query("SELECT * FROM products", function(err, results) {
                        if (err) throw err;
                        console.table(results);
                        run();
                    });
                    break;
                case "View Low Inventory":
                    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
                        if (err) throw err;
                        console.table(results);
                        run();
                    });
                    break;
                case "Add to Inventory":
                    inquirer.prompt([
                    {
                        name: "productName",
                        type: "list",
                        choices: function() {
                            const choiceArr = [];
                            for (let i = 0; i < results.length; i++) {
                                choiceArr.push(results[i].product_name);
                            }
                            return choiceArr;
                        },
                        message: "Add more:"
                    },
                    {
                        name: "quantity",
                        type: "input",
                        message: "How much would you like to add?"
                    }
                    ]).then(function(answerTwo){
                        const pickedProduct = results.filter(function(product){
                            return product.product_name === answerTwo.productName;
                        })[0];                     

                        connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: pickedProduct.stock_quantity + +answerTwo.quantity
                        },
                        {
                            product_name: pickedProduct.product_name
                        }], function(error) {
                            if (error) throw error;
                            console.log("Stock added successfully!");
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                    })
                    break;
                    case "Add New Product":
                    inquirer.prompt([
                        {
                            name: "addId",
                            type: "input",
                            message: "What is the ID?"


                        },
                        {
                            name: "productName",
                            type: "input",
                            message: "What would you like to add?"


                        },
                        {
                            name: "departmentName",
                            type: "input",
                            message: "What department?"

                        },
                        {   
                           name: "addPrice",
                           type: "input",
                           message: "What is the price?" 

                        },
                        {
                            name: "addQuantity",
                            type: "input",
                            message: "How much would you like to add?"
                        }
                    
                    ]).then(function(answers) {
                        
                        connection.query(
                            "INSERT INTO products SET ?",
                            {
                              id: answers.addId,
                              product_name: answers.productName,
                              department_name: answers.departmentName,
                              price: answers.addPrice,
                              stock_quantity: answers.addQuantity
                            },
                            function(err) {
                              if (err) throw err;
                              console.log("Your add was successful!");
                              
                            }
                          );
                        });
                                
                                
                                
            }
        });
    });
};

run();
