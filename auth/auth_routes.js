const express = require('express');
const { check, validationResult } = require("express-validator");
const { getaSuperAdmin, sendTokenSuperAdmin, superAdminLogin, createaSuperAdmin } = require('./auth_controllers');
const router = express.Router();

// Private Router Checkpoints
// 1. Super User Checkpoint

router.post('/route/login/superadmin', [

    check("password", "password field is required").isLength({ min: 1 })
], superAdminLogin);
router.post('/route/check/superadmin', getaSuperAdmin);
router.post('/route/create/superadmin', createaSuperAdmin);

module.exports = router;