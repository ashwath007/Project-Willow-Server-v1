const Pig = require('pigcolor');
const { v4: uuidv4 } = require('uuid');
const ClientProfile = require('../../modules/Clients/profile');
const SuperAdminProfile = require('../../modules/SuperAdmin/profile');
const CompanyProfile = require('../../modules/Clients/Company/company');
const BillingCompany = require('../../modules/Clients/Company/billing');


exports.createClient = (req, res) => {

    console.log("Here ----> ", req.body)

    Pig.box("Client - CREATE");
    const newClientProfile = new ClientProfile();
    newClientProfile.client_id = uuidv4();
    newClientProfile.client_role = 3;
    newClientProfile.temp_id = uuidv4();
    newClientProfile.client_name = req.body.client_name;
    newClientProfile.client_description = req.body.client_description;
    newClientProfile.client_email = req.body.client_email;
    newClientProfile.password = req.body.password;
    newClientProfile.client_company_name = req.body.client_company_name;
    newClientProfile.client_company_size = req.body.client_company_size;
    newClientProfile.client_company_type = req.body.client_company_type;

    newClientProfile.save((err, client) => {
        console.log("client", client)

        if (err) {
            return res.status(500).json({
                error: err
            })
        }

        const newCompanyProfile = new CompanyProfile();
        newCompanyProfile.company_id = uuidv4();
        newCompanyProfile.company_client_id = client._id;
        newCompanyProfile.temp_id = uuidv4();
        newCompanyProfile.company_name = req.body.client_company_name;
        newCompanyProfile.company_description = req.body.company_description;
        newCompanyProfile.company_email = req.body.company_email;
        newCompanyProfile.company_phone = req.body.company_phone;
        newCompanyProfile.company_address = req.body.company_address;

        newCompanyProfile.save((err, company) => {
            console.log("company", company)
            console.log("company", err)

            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            client.client_division.push(company._id);
            client.save((err, client_with_sisters) => {
                console.log("client_with_sisters", client_with_sisters)
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                const newBillingCompany = new BillingCompany();
                newBillingCompany.billing_id = uuidv4();
                newBillingCompany.temp_id = uuidv4();
                newBillingCompany.bill_name = req.body.client_company_name;
                newBillingCompany.bill_credit = 0;
                newBillingCompany.bill_prepaid = 999;
                newBillingCompany.save((err, billing) => {
                    console.log("billing", billing)

                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }

                    SuperAdminProfile.findById({ _id: req.session.superadminID }, (err, superadmin) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        }
                        superadmin.clients.push(client._id);
                        superadmin.save((err, saved) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                })
                            }
                            req.body.client = client;
                            return res.json({
                                client
                            })
                        });


                    })
                })

            })
        })











    })
}

// ** GET A Client
exports.getaClients = (req, res) => {
    Pig.box('Client - GET -> A');
    ClientProfile.findOne({ client_id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        return res.json({
            client: client
        })
    })
}

// ** GET All Client
exports.getallClients = (req, res) => {
    Pig.box('Client - GET -> ALL');
    ClientProfile.find({}, (err, allClients) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        return res.json({
            allClients: allClients
        })
    })
}