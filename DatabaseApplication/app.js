var express = require("express");
var mysql = require("mysql");
var app = express();
var port = 3700;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users'
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/display", (req, res) => {

   db.query("SELECT * FROM users",(err, result) => {
        if(err) {
            console.log(err); 
            res.json({"error":true});
        }
        else { 
            //console.log(result);
            var users = [];
            for(var i in result){
                users += result[i].fname + " " +  result[i].lname + '<br>';
            }
            res.send(users); 
        }
    });
});

app.post("/addname", (req, res) => {
    db.connect(function(err){
        console.log(req.body.fname);
        console.log(req.body.lname);
        
        sql = "INSERT INTO users (fname, lname) VALUES ('"+req.body.fname+"','"+req.body.lname+"');";
        db.query(sql,function(err,result,fields){
            if(err)console.log(err);
            console.log(result);
        });
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});