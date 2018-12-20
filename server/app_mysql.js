console.log("hello");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const mysql = require('mysql');
const express = require('express');
const router = express.Router();

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Hello!.13',
    port: '3306',
    database: 'douban'
});

db.connect((error) => {
    if(error) {
        throw error;
    }
    console.log('Mysql connected');
});

const app = express();

app.listen(3000,()=>{
    console.log('server started on port 3000');
});

router.get('/',(req,res) => {
    let sql ='select * from page_content where rating_num=9.5';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.send('query database succeed');
        result = JSON.stringify(results);
        res.end(JSON.stringify(results));
    })
});