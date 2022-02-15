const SuperAdminProfile = require('../modules/SuperAdmin/profile');
const Pig = require('pigcolor');
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");



exports.superAdminLogin = (req, res) => {
    const { user_email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    SuperAdminProfile.findOne({ user_email: user_email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER email does not exists"
            });
        }

        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //send response to front end
        const { _id, user_name, user_email, user_role, temp_id } = user;
        return res.json({ token, user: { _id, user_name, user_email, user_role, temp_id } });
    });
}

exports.getaSuperAdmin = (req, res, next) => {
    Pig.box("Get Super User");
    // 1. Get id from req.body
    // 2. Find the super admin
    // 3. Return TRUE if exist or FALSE
    const { TOKEN } = req.body;
    try {
        const decode_token = jwt.verify(TOKEN, process.env.SECRET);
        // console.log("decode_token - ", decode_token)
        SuperAdminProfile.findById({ _id: decode_token._id }, (err, user) => {
            if (err || !user) {
                return res.json({
                    status: false
                })
            } else {
                return res.json({
                    status: true
                })
            }
        });
    } catch (err) {
        return res.json({
            status: false
        })
    }



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