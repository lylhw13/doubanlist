console.log("hello");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const returnSize = 20;

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'douban'
});

const app = express();

queryResult = []

function handle_database(req,res) {
  pool.query('select * from page_content where rating_num=9.1', function(err,rows) {
    if(err) {
        return res.json({'errors': true, 'message': 'Error occured'+err});
    }
    queryResult = rows;
    res.json(queryResult.slice(0,returnSize));
  });
}

/**
  sql string
  size int
  queryResult array
*/

/*
query parameter
search[]  title tag publisher author
scroe_from scroe_to
date_from date_to
rating_from rating_to
http://127.0.0.1:3000/?name=haha&search[]=title&search[]=publisher&keywords=economics

orderby[] score date people
*/

/*
先生成要查询的sql语句，然后判断语句是否相等
*/

function generate_sql(req,res) {
  let sql = '';
  return sql;
}


app.get('/',function(req,res,next) {
  console.log('handle /');
  let name = req.query.name;
  let search = req.query.search;
  let keyWords = req.query.keywords;
  console.log(search);
  console.log(keyWords);
  if(queryResult.length == 0) {
    console.log('initialize');
    handle_database(req,res);// initialize
  } else {
    next();
  }
})

app.get("/",function(req,res) {
    let startIndex = req.query.start;
    console.log(typeof startIndex);
    if(typeof startIndex === 'undefined') {
      res.json(queryResult.slice(0,returnSize));
    } else if (startIndex >= queryResult.length) {
      res.json('no more result');
    } else {
      let endIndex = startIndex -'0' + returnSize ;
      res.json(queryResult.slice(startIndex, endIndex));
    }
});

app.listen(3000);