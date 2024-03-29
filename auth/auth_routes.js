const express = require('express');
const { check, validationResult } = require("express-validator");
const { superAdminRouteCheck, sendTokenSuperAdmin, superAdminLogin, createaSuperAdmin, superAdminLogout, adminRouteCheck, adminLogout } = require('./auth_controllers');
const router = express.Router();

// Private Router Checkpoints
// 1. Super User Checkpoint

router.post('/route/login/superadmin', [

    check("password", "password field is required").isLength({ min: 0 })
], superAdminLogin);
router.post('/route/logout/superadmin', superAdminLogout);
router.get('/route/check/superadmin', superAdminRouteCheck);
router.post('/route/create/superadmin', createaSuperAdmin);


// 2. Admin User Checkpoint
router.post('/route/login/admin', [

    check("password", "password field is required").isLength({ min: 0 })
], superAdminLogin);
router.get('/route/check/admin', adminRouteCheck);
router.post('/route/logout/admin', superAdminLogout);
adminLogout
module.exports = router;