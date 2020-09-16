const express = require("express");
const router = express.Router();     
const multer =require('multer');
const EmployeeController =require("../controllers/employees");

//Calling the api - get request
router.get("/",EmployeeController.employees_get_all);
//calling the api -creating new employee
router.post("/",EmployeeController.create_employee);
//calling the api -finding employee by id
router.get("/:EmployeeId",EmployeeController.employees_get_employee);
// patching request
router.patch("/:EmployeeId",EmployeeController.employees_update_employee);
// delete request 
router.delete("/:EmployeeId",EmployeeController.employees_delete_employee);
//Using router as Class Name To access The instance
module.exports = router;