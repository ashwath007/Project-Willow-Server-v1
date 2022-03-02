const express = require('express');
const { createSisterCompany, getAllCompanies, getAllSisterCompanies } = require('../../controllers/Clients/Company/sistercompany');
const router = express.Router();
const { createClient, getallClients, getaClients } = require('../../controllers/Clients/profile');


// Create, Edit, Delete - Here
router.post('/route/create/client', createClient);

// Get All Clients
router.get('/route/get/all/client', getallClients);
router.get('/route/get/a/client/:id', getaClients);

// ?? Companies

router.post('/route/get/client/all/companies', getAllCompanies);
router.post('/route/get/client/all/companies/all/sistercompanies', getAllSisterCompanies);


// ?? Sister Company
router.post('/route/create/sistercompany', createSisterCompany);



module.exports = router;