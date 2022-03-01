const Pig = require('pigcolor');
const { v4: uuidv4 } = require('uuid');
const ClientProfile = require('../../modules/Clients/profile');
const SuperAdminProfile = require('../../modules/SuperAdmin/profile');

exports.createClient = (req, res) => {
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