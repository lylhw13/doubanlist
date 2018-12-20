console.log("hello");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const mysql = require('mysql');
const express = require('express');
const router = express.Router();

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Hello!.13',
    port: '3306',
    database: 'douban'
});

const app = express();


function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from page_content where rating_num=9.5",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});

app.listen(3000);