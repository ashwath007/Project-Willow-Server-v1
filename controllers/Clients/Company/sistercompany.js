const { v4: uuidv4 } = require('uuid');
const Pig = require('pigcolor');
const SisterCompanyProfile = require('../../../modules/Clients/Company/sistercompany');
const BillingSisterCompany = require('../../../modules/Clients/Company/billing');
const ClientProfile = require('../../../modules/Clients/profile');
const CompanyProfile = require('../../../modules/Clients/Company/company');

exports.createSisterCompany = (req, res) => {
    Pig.box("Sister Company / Division - CREATE");
    const newBillingSisterCompany = new BillingSisterCompany();
    newBillingSisterCompany.billing_id = uuidv4();
    newBillingSisterCompany.temp_id = uuidv4();
    newBillingSisterCompany.bill_name = req.body.client_company_name;
    newBillingSisterCompany.bill_credit = 0;
    newBillingSisterCompany.bill_prepaid = 999;
    newBillingSisterCompany.save((err, sister_bill) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        console.log('sister_bill', sister_bill)
        const newSisterCompanyProfile = new SisterCompanyProfile();
        newSisterCompanyProfile.division_name = req.body.division_name;
        newSisterCompanyProfile.plans = req.body.plans;
        newSisterCompanyProfile.seperate_billing_account = true;
        newSisterCompanyProfile.billing_account = sister_bill._id;
        newSisterCompanyProfile.save((err, sisterCompany) => {
            console.log('sisterCompany error ', err)
            console.log('sisterCompany', sisterCompany)

            if (err) {
                return res.status(500).json({
                    error: err
                })
            }


            ClientProfile.findOne({ client_id: req.body.id }, 'client_division', (err, clientDisision) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                console.log('clientDisision', clientDisision.client_division)
                console.log('clientDisision', clientDisision.client_division[0])
                console.log('clientDisision', clientDisision.client_division[0]._id)

                CompanyProfile.findById({ _id: clientDisision.client_division[0]._id }, (err, companyProfile) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    console.log('companyProfile', companyProfile)

                    companyProfile.company_sister_company_division.push(sisterCompany._id);
                    companyProfile.save((err, sisAdded) => {
                        console.log('sisAdded', sisAdded)
                        console.log('sisAdded erro ', err)

                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        }

                        return res.json({
                            sisterCompany
                        })
                    })
                });

            })

        });
    })



}



exports.getAllCompanies = (req, res) => {
    Pig.box("Company - GET ALL");
    console.log(req.body.company_id)
    ClientProfile.findOne({ client_id: req.body.company_id }, (err, client) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        console.log(client.client_division[0]._id)
        CompanyProfile.findById({ _id: client.client_division[0] }, (err, company) => {
            console.log(company)

            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            return res.json({
                company: [company]
            })
        })
    })


}

exports.getAllSisterCompaniesADivisions = (req, res) => {
    Pig.box("Division - GET ALL");
    console.log("Client id - ", req.body.company_id)
    ClientProfile.findOne({ client_id: req.body.company_id }, (err, client) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        console.log("Client Division - ", client)
        CompanyProfile.findById({ _id: client.client_division[0] }, (err, company) => {
            // console.log('company', company)
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            SisterCompanyProfile.find().where('_id').in(company.company_sister_company_division).exec((err, sistercompany) => {
                // console.log('sistercompany', sistercompany)

                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                // console.log(sistercompany)
                return res.json({
                    sistercompany
                })
            })
        })
    })



}

exports.getAllSisterCompanies = (req, res) => {
    Pig.box("Sister Company / Division - GET ALL");
    console.log(req.body.company_id)
    CompanyProfile.findOne({ company_id: req.body.company_id }, (err, company) => {
        console.log(err)
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        SisterCompanyProfile.find().where('_id').in(company.company_sister_company_division).exec((err, sistercompany) => {
            console.log(company)

            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            console.log(sistercompany)
            return res.json({
                sistercompany
            })
        })
    })


}