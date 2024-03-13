const {getUser}  = require("../service/auth")

async function checkForAuthentication(req , res , next){
    const tokenCookie = req.cookies?.uid;
    req.user=null;
    if(!tokenCookie) return next()
    const user = getUser(tokenCookie);
    req.user=user;
    return next();

}
function restrictTO(roles=[]){

    return function(req, res, next){
        if(!req.user) return res.redirect("/login");
        
        if(!roles.includes(req.user.role)) return res.end("unAuthorized");

        return next();
    }
    
}

module.exports={
    checkForAuthentication,restrictTO
}