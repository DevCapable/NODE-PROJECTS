const  http = require('http');
const fs = require('fs');
const _ = require('lodash');
const express = require('express')
const app = express();
const server = http.createServer((req, res) =>{
   // using loadash
    res.setHeader('content-type', 'text/html')
    // res.write('<p>hello, capable</p>')
    // res.write('<p>hello, capable</p>')
    // res.end();

    // fs.readFile('./views/index.html' , (err, data) =>{
    //     if (err) {
    //         console.log(err)
    //     }
    //     // res.write(data)
    //     res.end(data);
    // })

    // let path = './views/'
    // switch (req.url) {
    //     case '/': path += 'index.html'
    //         res.statusCode = 200
    //         break;
    //     case '/about': path += 'about.html';
    //         res.statusCode = 200
    //         break;
    //     case '/about-us':
    //         res.statusCode = 301
    //             res.setHeader('Location', '/about')
    //         res.end()
    //         break;
    //     default:
    //         path += '404.html'
    //         res.statusCode = 400
    //         break;
    // }
    // fs.readFile(path , (err, data) =>{
    //     if (err) {
    //         console.log(err)
    //     }
    //     // res.write(data)
    //     res.end(data);
    // })

    app.get('/', (req, res) => {
        res.send('index.html')
    })
    app.get('./about', (req, res) => {
        res.send('./about.html')
    })
    app.use(()=>{
        res.send('./404.html')
    })
})

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port port 3000')
})