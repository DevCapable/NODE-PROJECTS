const _ = require('lodash');
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// setting up exxpress app
const app = express();
// database connection to mongo db
const dbURI = 'mongodb+srv://DevCapable:walexxycapable@node1.ju3w9.mongodb.net/node-project1?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result)=> app.listen(3000))
    .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs' );



//middleware static files
app.use(express.static('public'))

//this would get all request from the form pages
app.use(express.urlencoded({extended: true}))


app.get('/add-blog', (req, res) =>{
    const blog = new Blog({
        title: 'New blog2',
        snippet: ' this is my first blog',
        body: 'i have been trying and God is helping me'
    });

    blog.save()
    .then((result) =>{
        res.send(result)
        .catch((err)=> {
            console.log(err)
        })
    } )
})

// to get all data from the table
app.get('/all-blog', (req, res) => {
    Blog.find()
        .then((result) =>{
            res.send(result)
                .catch((err))
        })
} )
// to get a single data from table
app.get('/single-blog', (req,res) =>{
    Blog.findById('615f062dac58b60c518e2985')//id number of the user
        .then((result) =>{
            res.send(result)
                .catch((err))
        })
})

// passing some dummy to the vies
// app.get('/', (req, res) => {
//     const blogs = [
//     // res.sendFile('./views/index.html', {root: __dirname})
//     { title: 'MAIN', snippet: 'yes this is main' },
//     { title: 'SNAPPY', snippet: 'yes this is snappy' },
//     { title: 'House', snippet: 'yes this is house' },
//     { title: 'Toilet', snippet: 'yes this is Toilet' }
//         ]
//     res.render('index', {title:' Home Page',blogs})
// })

// gett all data from the database
app.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) =>{
            res.render('index', {title: 'HOME PAGE', blogs: result})
        })
        .catch((err)=>{
            console.log(err)
        })
} )

app.post('/blogs',(req, res) => {
   const blog = new Blog(req.body)
    blog.save()
        .then((result) =>{
            res.redirect('/create')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', {title: 'About'})
})
app.get('/create', (req, res) =>{
   Blog.find().sort({createdAt: 1})
       .then((result)=>{
           res.render('create', {title: ' Create Post Page', blogs: result})
       })
       .catch((err)=>{
           console.log(err)
       })
})
// get single user by id such as editing
app.get('/blogs/:id', ( req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details',{blog: result, title:'detail'})
        })
        .catch((err)=>{
            console.log(err)
        })
})

// delete a record
app.delete('/blogs/:id', ( req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/create' })
        })
        .catch((err) =>{
            console.log(err)
        })
} )

app.use((req, res)=>{
    res.status(400).render('404', {title: 'This is 404'})
})
