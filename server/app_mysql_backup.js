console.log("hello");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Hello!.13',
    port: '3306',
    database: 'douban'
});
connection.connect(function (err) {
    if (err) {
        console.error('Error>>>>>' + err.stack);
    }

    console.log('Connected as id>>>>>>' + connection.threadId);
    var _conn = connection.threadId;
    if (_conn == null) {
        console.log('Not Connected');
        connection.end();
        return;
    }
    else {
        console.log('Connected');
        connection.end();
        return;
    }
});

connection.query('SELECT * from page_content where rating_num=9.5', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result)
    });
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world\n');
});

server.listen((port, hostname)=>{
    console.log('server running at http://${hostname}:${port}/');
});