require('dotenv').config();
const http = require('http');
const app = require('./app/app');
const dbConnect = require('./config/dbConnect');
const PORT = process.env.PORT || 2016;


//creating the server
const server = http.createServer(app);
server.listen(PORT, console.log(`Walia Server is running on port ${PORT}`));

//starting mongodb server
dbConnect();
