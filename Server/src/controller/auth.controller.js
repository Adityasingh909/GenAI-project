const userModel = require("../model/user.model")
const blacklistModel = require("../model/blacklist.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.register = async(req,res)=>{
    try{
        const {username ,email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:"all the fields are required"
            })
        }
        const isUserExits = await userModel.findOne({
            $or:[{email},{username}]
        })
        if(isUserExits){
              return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const hash = await bcrypt.hash(password,10)
        const user = await userModel.create({
            username,
            email,
            password:hash
        })
        const payload= ({
            id:user._id,
            username:user.username
        })
        const token = jwt.sign(payload,process.env.JWTSecret,{expiresIn:"1h"});

        res.cookie("token",token)
        return res.status(200).json({
            success:true,
            message:"user registered" ,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    }
    catch(error){
        console.log(error);
        
        return res.status(404).json({
            success:false,
            message:"user not registered"
        })
    }
}



exports.login = async(req,res)=>{
    try{
        const {username ,email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:"all the fields are required"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
              return res.status(400).json({
                success:false,
                message:"User does not exists"
            })
        }

        const isPassValid =await bcrypt.compare(password,user.password)
         if(!isPassValid){
              return res.status(400).json({
                success:false,
                message:"password  not valid"
            })
        }

        const payload= ({
            id:user._id,
            username:user.username
        })
        const token = jwt.sign(payload,process.env.JWTSecret,{expiresIn:"1h"});

        res.cookie("token",token)
        return res.status(200).json({
            success:true,
            message:"user logged" ,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })

      
    }
    catch(error){
        console.log(error);
        
        return res.status(404).json({
            success:false,
            message:"user not logged in"
        })
    }
}




exports.logout = async(req,res)=>{
    try{
       const token = req.cookies.token;
       console.log(token);
       
        if(token){
            await blacklistModel.create({token})
        }
       res.clearCookie("token")
        res.status(200).json({
        message: "User logged out successfully"
    })
      

      
    }
    catch(error){
        console.log(error);
        
        return res.status(404).json({
            success:false,
            message:"user not logged out"
        })
    }
}


exports.getMeController=async(req, res)=>{

    const user = await userModel.findById(req.user.id)



    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

