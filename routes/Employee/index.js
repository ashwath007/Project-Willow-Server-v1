const express = require('express');
const { createEmployeeProfile, getAllEmployee } = require('../../controllers/Employee/profile');
const router = express.Router();


router.post('/route/create/employee', createEmployeeProfile);
router.get('/route/get/all/employee', getAllEmployee);



module.exports = router;