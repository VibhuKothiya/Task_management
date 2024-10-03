const express = require("express");
const app = express();
require("dotenv").config;
const dbConnect = require("./db/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload")
const cloudinary = require("cloudinary");
const errorMiddleware = require("./middlewares/error")
const userRouter = require("./routes/userRouter")
const taskRouter = require("./routes/taskRouter")




//cors
app.use(
    cors({
        origin: "*",
    })
);

//body
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
  });



app.use(
    fileupload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

//Database
dbConnect();

app.use(errorMiddleware);


//Server
const port = process.env.PORT || 4050;

app.listen(port, ()=>{
    console.log(`server started on ${port}`);
    
})

module.exports = app;