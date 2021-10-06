const _ = require('lodash');
const express = require('express')
const app = express();
//register view engine
app.set('view engine', 'ejs' );

//listean to a request
app.listen(3000)

app.get('/', (req, res) => {
    const blogs = [
    // res.sendFile('./views/index.html', {root: __dirname})
    { title: 'MAIN', snippet: 'yes this is main' },
    { title: 'SNAPPY', snippet: 'yes this is snappy' },
    { title: 'House', snippet: 'yes this is house' },
    { title: 'Toilet', snippet: 'yes this is Toilet' }
        ]
    res.render('index', {title:' Home Page',blogs})
})
app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', {title: 'About'})
})
app.get('/create', (req, res) =>{
    const blogs = [
        { title: 'MAIN', snippet: 'yes this is main' },
        { title: 'SNAPPY', snippet: 'yes this is snappy' },
        { title: 'House', snippet: 'yes this is house' },
        { title: 'Toilet', snippet: 'yes this is Toilet' }
    ]
    res.render('create', {title:'Create page',blogs})
})


app.use((req, res)=>{
    res.status(400).render('404', {title: 'This is 404'})
})
