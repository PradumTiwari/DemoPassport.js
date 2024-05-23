const express=require('express');
const {connectMongoose} =require('../config/database') 
const app=express();


app.get('/',(req,res)=>{
    res.send("Hello")
})

app.post("/register",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})