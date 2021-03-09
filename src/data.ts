const express = require('express');
const app = express();
const url = require('url'); 
const https = require('https'); 
const mongoClient = require('mongodb').MongoClient
const rapidAPIBaseUrl = "https://rapidapi.p.rapidapi.com/json/?ip=";
app.listen(7000,function(){
    console.log("listening on 7000");
})