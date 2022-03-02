const SuperAdminProfile = require('../../modules/SuperAdmin/profile');
const Pig = require('pigcolor');

exports.getSuperAdminStats = (req, res) => {
    Pig.box('SuperAdmin - STATS');
    SuperAdminProfile.find({}, 'admins clients approvals employees', (err, stats) => {
        let count_admins = stats[0].admins.length;
        let count_client = stats[0].clients.length;
        let count_approvals = stats[0].approvals.length;
        let count_employee = stats[0].employees.length;
        if (err) {
            return res.json({
                error: err
            })
        }
        return res.json({
            stats: stats,
            count_admins,
            count_client,
            count_approvals,
            count_employee
        })
    });
}