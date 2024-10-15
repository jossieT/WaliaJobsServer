require('dotenv').config()
const http = require('http');
const app = require('./app/app');
const express = require('express');
//const app = express();
const dbConnect = require('./config/dbConnect');
const { error } = require('console');
const { swaggerDocs } = require('./swagger');
const PORT = process.env.PORT || 2016


//starting mongodb server
dbConnect()
.then(()=>{
    //creating and starting the server
    
    app.listen(PORT, ()=>{
        console.log(`Walia Server is running on port ${PORT}`);
        
    })
    
})
.catch((error)=>{
    console.error('Failed to connect to MongoDB:', error);
})
swaggerDocs(app, PORT);






