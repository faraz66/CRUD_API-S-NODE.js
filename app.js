// importing Libraries
const express =require('express');
const app =express();
const morgan =require('morgan')
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//linking files
const employeeRoutes = require('./api/routes/employees');


//Routes which should handle request
app.use('/employees',employeeRoutes);

// linking to Mongodb Atlas database
const uri ="mongodb+srv://admin:admin@slashrtc.yqadr.mongodb.net/SlashRtc?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Atlas Connected On Cloud…")
})
.catch(err => console.log(err))
mongoose.Promise = global.Promise;


//
app.use((req,res,next) => {
     
    res.header('Acsess-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');

if(req.method == 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
    res.status(200).json({}); 
}
next();
});
// handling every request i.e handling errors
app.use((req,res,next) =>{
    const error = new Error("Not found");   //Custom message for errors and error is already defined in node
    error.status404;        // custom message for this types of errors
    next(error); 
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{ 
            message: error.message
        }
    });
});

module.exports = app; 
