const mongoose = require("mongoose")


async function connectdb(){
    try{
        
        await mongoose.connect(process.env.dbURL)
         console.log("Connected to Database")
    }
    catch(err){
        console.log(err);
        return
    }
}

module.exports = connectdb;