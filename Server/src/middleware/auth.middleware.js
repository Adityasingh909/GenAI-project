const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../model/blacklist.model")

exports.authUser =async(req,res,next)=>{
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }


    const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWTSecret)
        req.user= decoded;
        next()
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message: "Invalid token."
        })
        
    }
}