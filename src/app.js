const express = require ('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
require("./db/conn.js");
const Register=require("./models/registers");


const lclhost=process.env.PORT || 3000;

const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
//To get data from the registration form
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views',template_path);
hbs.registerPartials(partials_path);
app.get('/',(req,res)=>{
    res.render("index.hbs");
})
app.get('/register',(req,res)=>{
    res.render("register.hbs");
})
app.get('/login',(req,res)=>{
    res.render("login.hbs");
})
app.get('*',(req,res)=>{
    res.render("404error.hbs");
})

//Create a new User in Database
app.post('/register',async(req,res)=>{
   try{
        const password =req.body.password;
        const confirmpassword=req.body.confirmPassword;
        if(password===confirmpassword){
           const registerform = new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            age:req.body.age,
            gender:req.body.gender,
            email:req.body.email,
            phonenumber:req.body.phonenumber,
            password:req.body.password,
            confirmpassword:req.body.confirmPassword
           })
        const registered = await registerform.save();
        res.status(201).render("homepage.hbs");
        }
        else{
            res.send("Passwords are not same")
        }
   }
   catch(error){
    res.status(400).send(error);
   }
})

//Login Check
app.post('/login',async(req,res)=>{
    try{
         const lgemail=req.body.lgemail;
         const lgpassword=req.body.lgpassword;
         const useremail=await Register.findOne({email:lgemail});
         if(useremail.password===lgpassword){
            res.status(201).render("homepage.hbs");
         }
         else{
            res.send("Password are not matching");
         }
    }
    catch(error){
        res.status(400).send(error);
       }
})

app.listen(lclhost,()=>{
    console.log('Server is running at port 3000');
});