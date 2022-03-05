const express = require('express');
const router = express.Router();
const { createAdmin, getallAdmin, assignClientToAdminNotifySuperAdmin, getAllClientAdminPicked } = require('../../controllers/Admins/profile');

router.post('/route/create/admin', createAdmin);
router.get('/route/get/all/admin', getallAdmin);
router.get('/route/get/all/clients/assigned', getAllClientAdminPicked);



router.post('/route/assign/client/admin/clientstatus', assignClientToAdminNotifySuperAdmin);



module.exports = router;