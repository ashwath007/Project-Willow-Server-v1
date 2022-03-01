const express = require('express');
const router = express.Router();
const SuperAdminProfile = require('../../modules/SuperAdmin/profile');

/* ** Get all Stats 

 1. Get Total Admins 
 2. Get Total Clients
 3. Get Total Employees

*/


exports.getSuperAdminStats = (req, res) => {
    SuperAdminProfile.find({}, 'admins clients approvals', (err, stats) => {
        if (err) {
            return res.json({
                error: err
            })
        }
        return res.json({
            stats: stats
        })
    });
}



module.exports = router;