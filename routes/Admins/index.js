const express = require('express');
const router = express.Router();
const { createAdmin, getallAdmin, assignClientToAdminNotifySuperAdmin, getAllClientAdminPicked, assignEmployeeToAdminNotifySuperAdmin, getAllEmployeeAdminPicked } = require('../../controllers/Admins/profile');

router.post('/route/create/admin', createAdmin);
router.get('/route/get/all/admin', getallAdmin);
router.get('/route/get/all/clients/assigned', getAllClientAdminPicked);
router.get('/route/get/all/employee/assigned', getAllEmployeeAdminPicked);



router.post('/route/assign/client/admin/clientstatus', assignClientToAdminNotifySuperAdmin);
router.post('/route/assign/employee/admin/employeestatus', assignEmployeeToAdminNotifySuperAdmin);



module.exports = router;