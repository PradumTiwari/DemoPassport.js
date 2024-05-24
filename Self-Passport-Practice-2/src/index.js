import express from 'express';
import {connect} from '../config/database.js';
import bodyParser from 'body-parser';
import User from '../model/User.js'
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,async()=>{
    console.log('Server started on Port 3000');
    await connect();
    console.log('MongoDb connected');
   

})