const mongoose = require('mongoose');
// this is the entry which will go in  the database so design it carefully 
const employeeSchema  = mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    name : String,
    designation : String,
    salary: Number,
    email :{type : String, required: true,unique: true,match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/},
    number : Number

});

module.exports = mongoose.model('Employee',employeeSchema);