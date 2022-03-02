const SuperAdminProfile = require('../modules/SuperAdmin/profile');
const Pig = require('pigcolor');
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { isError } = require('util');



// ** All Login and Logout -> Super, Admin, Employees, Clients


// ? Main Auth Checkpoints Here ---------------

exports.isSignIn = (req, res, next) => {
    if (req.sessionID) {
        next();
    }
}

// ? ------------------------------------------








exports.superAdminLogin = (req, res) => {
    Pig.box("SuperAdmin - LOGIN");
    console.log(req.body)
    const user_email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!req.body.password || req.body.password === '') {
        console.log("Here")
        return res.json({
            error: "Please enter the password"
        });
    } else if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    SuperAdminProfile.findOne({ user_email: user_email }, (err, user) => {
        if (err || !user) {
            return res.json({
                error: "USER email does not exists"
            });
        }

        if (!user.autheticate(password)) {
            return res.json({
                error: "Email and password do not match"
            });
        } else {
            req.session.superadminID = user._id;
            res.json({
                msg: "Login successful",
                login_status: true,
                role: user.user_role,
                id: user.user_id
            })
        }



    });
}

exports.adminLogin = () => {
    Pig.box("Admin - LOGIN");

}

// TODO: Logout 
exports.superAdminLogout = (req, res) => {
    Pig.box("SuperAdmin - LOGOUT");
    console.log(req.sessionID)
    if (req.session) {
        req.session.cookie.expires = new Date().getTime();
        req.session.destroy(function(err) {
            if (err)
                console.log(err)

            return res.json({
                msg: "Logout Success"
            })
        })

    }
}

exports.adminLogout = () => {
    Pig.box("Admin - LOGOUT");
}



exports.superAdminRouteCheck = (req, res) => {
    Pig.box("Get Super User");
    // 1. Get id from sessionID is any
    // 2. Find the super admin
    // 3. Return TRUE if exist or FALSE

    try {
        const sessiom_id = req.session.superadminID;
        console.log("AdminID from Session - ", req.sessionID)
        if (!sessiom_id)
            return res.json({
                status: false
            })
        else {
            SuperAdminProfile.findById({ _id: sessiom_id }, (err, user) => {
                if (err || !user) {
                    return res.json({
                        status: false
                    })
                } else {
                    return res.json({
                        status: true,
                        role: user.user_role
                    })
                }
            });
        }
    } catch (err) {
        return res.json({
            status: false
        })
    }

    // console.log("decode_token - ", decode_token)





}


exports.createaSuperAdmin = (req, res, next) => {
    Pig.box("Get Super User");
    // 1. Get id from req.body
    // 2. Find the super admin
    // 3. Parse in json format
    // 4. Return with req.body.superadmin
    // const data = {
    //     user_id: uuidv4(),
    //     user_role: 0,
    //     temp_id: uuidv4(),
    //     user_name: "Shibi",
    //     user_description: "Super Admin on this Org",
    //     user_email: "srivicky2000@gmail.com",
    //     encry_password: "willow2022"
    // }
    const newSuperUser = new SuperAdminProfile(req.body);
    newSuperUser.save((err, superUser) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        req.body.superadmin = superUser;
        return res.json({
            superUser
        })
    })


}







exports.sendTokenSuperAdmin = (req, res) => {
    // Return as cookie and localstrage
    console.log("sendToken", req.body.superadmin)
}


















// ** Super User Generation Here
/*
  const data = {
        user_id: uuidv4(),
        user_role: 0,
        temp_id: uuidv4(),
        user_name: "Shibi",
        user_description: "Super Admin on this Org",
        user_email: "srivicky2000@gmail.com",
        encry_password: "willow2022"
    }
  const newSuperUser = new SuperUser(data);
    newSuperUser.save((err, superUser) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        req.body.superadmin = superUser;
        next();
    })
*/
//



/*
const TOKEN = req.body.token;
    const user_token = jwt.verify(TOKEN, process.env.SECRET);
    SuperUser.findById({ _id: user_token.id }, (err, asuperUser) => {
        if (!asuperUser) {
            return res.json({
                msg: "Wrong TOKEN, "
            })
        }
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        req.body.superadmin = asuperUser;



        next();
    });

*/