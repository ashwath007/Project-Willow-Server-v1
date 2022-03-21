const express = require('express');
const router = require('../Stats');
const { createFolder, getAllFolderData } = require('../../controllers/FileAFolder/FileAFolder');


router.post('/route/create/folder', createFolder);
router.post('/route/create/all/folder', getAllFolderData);


module.exports = router;