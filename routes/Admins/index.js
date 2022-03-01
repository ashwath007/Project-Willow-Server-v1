const express = require('express');
const router = express.Router();
const { createAdmin, getallAdmin } = require('../../controllers/Admins/profile');

router.post('/route/create/admin', createAdmin);
router.get('/route/get/all/admin', getallAdmin);



module.exports = router;