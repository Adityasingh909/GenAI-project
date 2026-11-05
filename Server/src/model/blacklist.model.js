const mongoose = require("mongoose")


const blacklist = new mongoose.Schema({
    
    token:{
        type:String,
        required :true,
    },
},
    {
    
        timestamps:true
    })

const blacklistModel = mongoose.model("blacklist",blacklist)

module.exports = blacklistModel;