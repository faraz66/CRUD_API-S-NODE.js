const mongoose =require("mongoose");
const Employee = require("../models/employee");
const bodyParser = require('body-parser');
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

exports.employees_get_all =(req,res,next) =>{
    Employee.find()
    .select('id name designation email number')
    .exec()
    .then(docs =>{
        const response ={
            count :docs.length,
            employees: docs.map(doc =>
              {
                return {
                    id:doc.id,
                    name:doc.name,
                    designation:doc.designation,
                    number: doc.number,
                    email:doc.email,
                    salary:doc.salary,
                    request : 
                    {
                        type: 'GET',
                        url : "http://localhost:3000/employees/" + doc.id // this doc id is associated to every user 
                    }
                }
            })
        };
           //   if (docs.length >= 0) {
            res.status(200).json(response);  // with response we can see total count of entires in our db
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        }
exports.create_employee = (req, res, next) => {   
            const employee = new Employee({
              id: new mongoose.Types.ObjectId(),
              name : req.body.name,     // parsing the incoming json body for name
              designation : req.body.designation,   // parsing the incoming json body for price
              number : req.body.number,
              email: req.body.email,
              salary: req.salary
            });
          
            employee.save()          
              .then(result => {
                res.status(201).json({
                  message: "Employee Added To the Company Sucessfully",
                 // createdEmployee: result display       ->will give every information of whateva columns there is inside\
                 createdEmployee:{
                  name : result.name,
                   designation : result.designation,
                   id : result.id,
                   request: {
                     type :'GET',
                     url :"http://localhost:3000/employees/" + result.id // here we are accessing result_id not doc_id
                   }  
                 }
                 });
              })
          
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
exports.employees_get_employee = (req, res, next) => {
            const id = req.params.id;
            Employee.findById(id)
              .select('id name designation email number salary')
              .exec()
          
              .then(doc => {
                console.log("From database", doc);
                if (doc) {
                  res.status(200).json({
                    employee : doc,
                    request: {
                      type:'GET',
                      description:"GET ALL Employees",
                      url :"http://localhost:3000/employees/"
                    }
                  })
                }else {
                  res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
                }
              })
          
              .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        
exports.employees_update_employee = (req, res, next) => {

            const id = req.params.id;
            const updateOps = {};

            // for (const ops of req.body) {                // why did we use for loop?
            //   //console.log(ops.propName,ops.value)
            //   updateOps[ops.propName] = ops.value;     // with this you can patch name 
            // }
          //  Employee.update({_id: id }, {$set: updateOps })
          Employee.updateMany({_id: id}, {$set: req.body})
              .exec()
          
              .then(result => {
                res.status(200).json({
                    message: 'Employee Data updated',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/employees/' + id
                    }
                });
              })
          
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        
exports.employees_delete_employee = (req, res, next) => {
            const id = req.params.id;
            Employee.remove({ id: id })
              .exec()
          
              .then(result=> {
                res.status(200).json({
                  message:"Employee Data Deleted",
                  request:{
                    type:'POST',
                    url:'http://localhost:3000/employees/',
                    data :{name : 'String',number:'Number',designation:'String',email:'String',salary:'String'}
                  }
                });
              })
          
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }