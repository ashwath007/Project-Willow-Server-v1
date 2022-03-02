const EmployeeProfile = require('../../modules/Employees/profile');
const SuperAdminProfile = require('../../modules/SuperAdmin/profile');

const Pig = require('pigcolor');
const { v4: uuidv4 } = require('uuid');


exports.createEmployeeProfile = (req, res) => {
    Pig.box("Employee - CREATE");
    const newEmployeeProfile = new EmployeeProfile();
    newEmployeeProfile.employee_id = uuidv4();
    newEmployeeProfile.employee_role = 2;
    newEmployeeProfile.temp_id = uuidv4();
    newEmployeeProfile.employee_name = req.body.name;
    newEmployeeProfile.employee_description = req.body.description;
    newEmployeeProfile.employee_email = req.body.email;
    newEmployeeProfile.password = req.body.password;
    newEmployeeProfile.save((err, emp) => {
        if (err) {
            return res.json({
                error: err
            })
        }
        SuperAdminProfile.findById({ _id: req.session.superadminID }, (err, superadmin) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            superadmin.employees.push(emp._id);
            superadmin.save((err, saved) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                req.body.admin = emp;
                return res.json({
                    emp
                })
            });


        })
    });
}


exports.getAllEmployee = (req, res) => {
    Pig.box('Employee - GET -> ALL');
    EmployeeProfile.find({}, (err, allEmp) => {
        if (err) {
            return res.json({
                error: err
            })
        }
        return res.json({
            allEmp
        })
    })
}