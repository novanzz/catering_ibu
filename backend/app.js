// import express from "express";
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const cors = require('cors')

//Logging handler error
app.use(morgan('dev'));

//Premission CORS
const siteUrl = [
  "http://127.0.0.1:8080",
  "http://0.0.0.0:8080",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://127.0.0.1:3002",
  "http://localhost:3002",
  undefined
];

const corsOptions = {
  origin(origin, callback) {
    if (siteUrl.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// body parser
// for handle req route /upload
app.use('/uploads',express.static('uploads'));
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

//connect database
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{
    useNewUrlParser:true
});

// Routes
app.use('/api/products' , productRoutes);
app.use('/api/orders' , orderRoutes);
app.use('/api/users', userRoutes);

//handler routes if we pass and none of the routes
app.use((req,res,next)=>{
    const error = new Error ('Not Found');
    error.status= 404;
    //forward request to error
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        message: error.message
    });
});



module.exports = app;