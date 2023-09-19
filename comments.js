// create web server
// 1. import http module
const http = require('http');
// 2. import fs module
const fs = require('fs');
// 3. import url module
const url = require('url');
// 4. import querystring module
const querystring = require('querystring');
// 5. import path module
const path = require('path');
// 6. create web server
const app = http.createServer();
// 7. add request event listener
app.on('request', (req, res) => {
    // 7.1 get request url
    const reqUrl = req.url;
    // 7.2 parse request url
    const { pathname, query } = url.parse(reqUrl);
    // 7.3 check request url
    if (pathname === '/' || pathname === '/index.html') {
        // 7.3.1 read index.html file
        const filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, (err, data) => {
            // 7.3.2 check error
            if (err) {
                //


