const express = require("express"); // to require express package
const app = express();
const port = 8080;
const path = require("path"); //to use path ($)

app.set("view engine", "ejs"); // to set the view engine as ejs
app.set("views", path.join(__dirname, "/views")); // to join path ($)

const { faker } = require('@faker-js/faker'); // to require facker package

const mysql = require('mysql2'); // to require mysql package

const connection = mysql.createConnection({ // this s to set the connection between node and sql
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Praveen$483'
  });

  // inserting new data using faker package

  let getRandomUser = () =>  { // here we removed key pairs because we only need values. Keys are avialable below
    return [
       faker.string.uuid(),
       faker.internet.userName(),
       faker.internet.email(),
       faker.internet.password(),
    ];
};

// Home page route

app.get("/",(req,res) => {
    let q = `SELECT COUNT(*) FROM user`;
    try{
        connection.query(q, (err,result) => {
            if(err) throw err;
            console.log(result); // this is to print result array
            console.log(result[0]); //this is to print the object (key, value pair) in that array
            console.log(result[0]["COUNT(*)"]); // Here count(*) is key. We are printing the value at the count key
            let count = result[0]["COUNT(*)"];
            res.render("home.ejs", {count});
        });
    } catch (err){
        console.log(err);
        res.send("some error in DB");
    }
});

//show users route

app.get("/user", (req,res) => {
    let q = `SELECT * FROM user`;
    try{
        connection.query(q, (err,users) => { // users means result. Which is an array
            if(err) throw err;
            // console.log(result); // this is to print result array
            // res.send(result);
            res.render("showusers.ejs", {users});
        });
    } catch (err){
        console.log(err);
        res.send("some error in DB");
    }
});

// Edit users route

app.get("/user/:id/edit", (req,res) => {
    let {id} = req.params;
    console.log(id); 
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q, (err,result) => { // users means result. Which is an array
            if(err) throw err;
            console.log(result);
            res.render("edit.ejs");
        });
    } catch (err){
        console.log(err);
        res.send("some error in DB");
    }
});

app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});

// try{
//     connection.query(q,[data], (err,result) => { // to perform different tasks on database, Here we are performing "SHOW TABLES" task
//         if(err) throw err;
//         console.log(result); 
//     });
//   } catch (err) {
//     console.log(err);
//   }