const Pig = require('pigcolor');
const SisterCompanyProfile = require('../../../modules/Clients/Company/sistercompany');



exports.getAllThePlanFromSisterCompany = (req, res) => {
    Pig.box('Plans - GET ALL');
    SisterCompanyProfile.findById({ _id: req.body.sisId }, (err, sisterPlans) => {
        if (err) {
            return res.json({
                error: err
            })
        }
        return res.json({
            sisterPlans
        })
    });
}