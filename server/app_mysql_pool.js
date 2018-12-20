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
  pool.query('select * from page_content where rating_num=9.5', function(err,rows) {
    if(err) {
        return res.json({'errors': true, 'message': 'Error occured'+err});
    }
    res.json(rows);
  });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});

app.listen(3000);