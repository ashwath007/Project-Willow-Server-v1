const express = require('express');
const { getSuperAdminStats } = require('../../controllers/Stats/stats');
const router = express.Router();

/* ** Get all Stats 

 1. Get Total Admins 
 2. Get Total Clients
 3. Get Total Employees

*/

router.get('/route/get/all/stats', getSuperAdminStats);



module.exports = router;