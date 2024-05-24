const express=require('express');
const {connectMongoose} =require('../config/database') ;
const User=require('../models/User');
const UserRepository=require('../repository/user-repository');
const ejs=require('ejs');
const app=express();
const passport=require('passport')
const { initializingPassport,isAuthenticated } = require('../passportConfig');
const expressSession=require('express-session');



connectMongoose();

initializingPassport(passport);


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({secret:'Secret',resave:false,saveUninitialized:false}))

app.use(passport.initialize());
app.use(passport.session());



app.set('view engine',"ejs");



app.get('/',(req,res)=>{
    res.render("index");
})
app.get('/login',(req,res)=>{
    res.render("login");
})

app.get('/register',async(req,res)=>{
    res.render('register');
})
app.get('/pradum',async(req,res)=>{
    res.render('pradum');
})
app.get('/register',async(req,res)=>{
    res.render('register');
})
app.post("/register",async(req,res)=>{
    const user=await User.findOne({username:req.body.username})

    if(user){
        return res.status(400).json({
            message:"User Already Exist",
            error:"Already Exist",
            sucess:{},
            data:user,
        })
    }
    const userRepo=new UserRepository();
    const newUser=await userRepo.create(req.body);
    
    return res.status(201).send(newUser);
})

app.post('/login',passport.authenticate('local',{failureRedirect:"/register",successRedirect:"/pradum"}),(req,res)=>{

})
app.get('/profile',isAuthenticated,(req,res)=>{
    res.send(req.user);
})

app.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect("/");
})
app.listen(3000,()=>{
    console.log("Listening on Port 3000");
   
})