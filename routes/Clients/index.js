const express = require('express');
const { createSisterCompany, getAllCompanies, getAllSisterCompanies, getAllSisterCompaniesADivisions } = require('../../controllers/Clients/Company/sistercompany');
const router = express.Router();
const { createClient, getallClients, getaClients } = require('../../controllers/Clients/profile');
const { getAllThePlanFromSisterCompany } = require('../../modules/Clients/Company/plans');


// Create, Edit, Delete - Here
router.post('/route/create/client', createClient);

// Get All Clients
router.get('/route/get/all/client', getallClients);
router.get('/route/get/a/client/:id', getaClients);

// ?? Companies

router.post('/route/get/client/all/companies', getAllCompanies);
router.post('/route/get/client/all/companies/all/division', getAllSisterCompaniesADivisions);
router.post('/route/get/client/all/companies/all/sistercompanies', getAllSisterCompanies);


// ?? Sister Company
router.post('/route/create/sistercompany', createSisterCompany);

// All Plans and Details
router.post('/route/create/sistercompany/get/all/plans', getAllThePlanFromSisterCompany);



module.exports = router;