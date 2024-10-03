const mongoose = require("mongoose");
require('dotenv').config();

function dbConnect () {
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Database Connect successfully");
    })
    .catch((err)=>{
        console.log(err, "error");
    })
}

module.exports = dbConnect;