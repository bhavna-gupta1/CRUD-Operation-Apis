const express =require('express')
const app=express();
const mongoose=require('mongoose')
const passport = require('./Routes/Auth')
const db= require("./db");
const Guestrouter =require("./Routes/GuestRoutes")
const personrouter = require("./Routes/personroutes")
const bodyParser = require('body-parser')
const Person = require('./Models/person')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(passport.initialize())
const PORT =process.env.PORT || 3000


const localtoken= passport.authenticate('local', { session: false })


const LogRequest=(req,res,next)=>{
console.log([`${new Date().toLocaleDateString()} Request made to :${req.originalUrl}`])
next();
}
app.use(LogRequest)

app.use("/",Guestrouter);
app.use('/',localtoken,personrouter)




app.listen(3000,()=>{
  console.log("server is listening")
})