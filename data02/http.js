/*
 * @Descripttion: 
 * @version: 
 * @Author: rkz
 * @Date: 2021-01-16 11:25:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-16 16:32:34
 */
const http = require('http');
const fs = require('fs');
const httpServer = http.createServer((req, res) => {
    const { method, url } = req;
    console.log('cookie',req.headers.cookie)
    if (method == 'GET' && url == '/') {
        fs.readFile('./index.html', (err, data) => {
            res.setHeader("Content-Type", "text/html");
            res.end(data)

        })
    } else if (method == 'GET' && url == '/users') {
        cors(res);
        res.end(JSON.stringify([{ name: 'tome', age: 20 }]))
    } else if (method == 'OPTIONS' && url == '/users'){
        // res.writeHead(200,{
        //     'Access-Control-Allow-Origin': "http://127.0.0.1:8080",
        //     'Access-Control-Allow-Headers': "X-Token,Content-Type", 
        //     'Access-Control-Allow-Methods': "PUT", 
        // });
        cors(res);
        res.end()
    }
})
httpServer.listen(3002)
function cors(res) {
    res.setHeader('Content-Type', "application/json");
    res.setHeader('Access-Control-Allow-Headers',"X-Token,Content-Type", );
    res.setHeader('Access-Control-Allow-Origin', "http://127.0.0.1:8080");
    res.setHeader('Set-cookie', "cookiel=va22");
    res.setHeader('Access-Control-Allow-Credentials', "true");
    // res.setHeader('Access-Control-Allow-Methods', "PUT", );
}

