const express = require("express");
const URL = require("./models/url")
const { connectToMongoDB } = require('./connection');
const app=express();
const {checkForAuthentication,restrictTO} = require('./middlewares/auth')
const port= 8000;
const path = require('path');
const cookieParser = require('cookie-parser')
//middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine" , "ejs");
app.set('views' , path.resolve("./views")); 

const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url")
const userRoute = require("./routes/user")
//connection to db

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('connected!'))



app.use("/url", restrictTO(["NORMAL","ADMIN"]) ,  urlRoute);

 app.use("/" , staticRoute);

 app.use("/user" ,userRoute);

app.get('/test/:shortId',async(req , res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory:{
                timestamp:Date.now()
            },
            },
        }
    );
    res.redirect(entry.redirectURL); 
});



app.listen(port , ()=>{
    console.log(`server started at ${port}`);
})