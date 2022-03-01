const Pig = require('pigcolor');
const AdminProfile = require('../../modules/Admin/profile');
const SuperAdminProfile = require('../../modules/SuperAdmin/profile');

const { v4: uuidv4 } = require('uuid');

// Create, Edit and Delete Here
exports.createAdmin = (req, res) => {
    Pig.box('Admin - CREATE');

    const newAdminProfile = new AdminProfile();
    newAdminProfile.admin_id = uuidv4(),
        newAdminProfile.admin_role = req.body.role,
        newAdminProfile.temp_id = uuidv4(),
        newAdminProfile.admin_name = req.body.name,
        newAdminProfile.admin_description = req.body.description,
        newAdminProfile.admin_email = req.body.email,
        newAdminProfile.password = req.body.password,
        newAdminProfile.admin_region = req.body.selectregion
    newAdminProfile.save((err, admin) => {
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
            superadmin.admins.push(admin._id);
            superadmin.save((err, saved) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                req.body.admin = admin;
                return res.json({
                    admin
                })
            });


        })

    })
}


// All Stats and Information GET requests

// ** GET A Admin
exports.getaAdmin = (req, res) => {
    Pig.box('Admin - GET -> A');
}

// ** GET All Admin
exports.getallAdmin = (req, res) => {
    Pig.box('Admin - GET -> ALL');
    AdminProfile.find({}, (err, allAdmins) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        return res.json({
            alladmins: allAdmins
        })
    })
}

// ** GET All Employees from Admin
exports.getallEmployeesFromAdmin = (req, res) => {
    Pig.box('Admin - GET -> ADMIN - (ALL) EMP');
}