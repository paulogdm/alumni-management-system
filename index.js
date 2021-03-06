const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()


const PORT = process.env.PORT || 4000;


// Routes
const adminRoute = require('./server/routes/adminRoute.js');
const collegeRoute = require('./server/routes/collegeRoute');
const studentRoute = require('./server/routes/StudentRoutes/studentRoute');


app.use(bodyParser.json());
app.use(cors());

//process.env.MONGODB_URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/AlumniTrackingSystem', {useNewUrlParser : true, autoIndex: true});
const connection = mongoose.connection;

app.get('/', (req, res) => {
    console.log("hello world");
    res.send("Server is up and running.")
})

app.use('/admin', adminRoute);
app.use('/college', collegeRoute);
app.use('/student', studentRoute);



connection.once('open', function(){
    console.log("MongoDB connection established successfully.");
})

app.listen(PORT, function(){
    console.log("Server is running on port : ", PORT );
})