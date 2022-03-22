const express = require('express');
const router = require('../Stats');
const { createFolder, getAllFolderData, uploadFile, getAFile } = require('../../controllers/FileAFolder/FileAFolder');


router.post('/route/create/folder', createFolder);
router.post('/route/create/file', uploadFile);
router.post('/route/create/all/folder', getAllFolderData);

router.get('/route/create/a/file/:fileID', getAFile);


module.exports = router;