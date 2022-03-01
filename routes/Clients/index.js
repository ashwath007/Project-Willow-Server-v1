const express = require('express');
const router = express.Router();
const { createClient, getallClients, getaClients } = require('../../controllers/Clients/profile');


// Create, Edit, Delete - Here
router.post('/route/create/client', createClient);

// Get All Clients
router.get('/route/get/all/client', getallClients);
router.get('/route/get/a/client/:id', getaClients);



module.exports = router;