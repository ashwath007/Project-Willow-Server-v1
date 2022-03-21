const express = require('express');
const router = require('../Stats');
const { createFolder } = require('../../controllers/FileAFolder/FileAFolder');


router.post('/route/create/folder', createFolder);


module.exports = router;