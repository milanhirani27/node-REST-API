const express = require('express');
const app = express()
const port = process.env.NODE_ENV || 3000;
const config = require('dotenv').config()

//database connection
require('./models/db')

app.use(express.json());

// upload image
app.use('/images', express.static(__dirname + '/uploads/images'));

// routes
const router = require('./router/index');
app.use('/',router);


//listen to port no 3000
app.listen(port , ()=>{
    console.log(`App running on port ${port}`)
})