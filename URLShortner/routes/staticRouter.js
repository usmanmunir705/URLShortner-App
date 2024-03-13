const express=require("express");
const {restrictTO} = require('../middlewares/auth')
const router = express.Router();
const URL = require("../models/url")

router.get("/admin/urls" ,restrictTO(["ADMIN"]) ,async(req , res)=>{
    
    allUrls = await URL.find({});
    return res.render("home" ,{
        urls:allUrls,
    }); 
})

router.get("/" , restrictTO(["NORMAL","ADMIN"]) ,async(req , res)=>{
    
    allUrls = await URL.find({createdBy:req.user._id});
    return res.render("home" ,{
        urls:allUrls,
    });
})
router.get("/signup" , (req , res)=>{
    return res.render("signup");
})
router.get("/login" , (req , res)=>{
    return res.render("login");
})


module.exports=router;
