const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const adminProfileSchema = new mongoose.Schema({
    admin_status: {
        type: String,
        enum: ['Online', 'Offline', 'Away'],
        required: true,
        default: 'Offline'
    },
    admin_id: {
        type: String,
        required: true,
        unique: true
    },
    admin_role: {
        type: Number,
        required: true,
        trim: true
    },
    admin_region: {
        type: String,
        required: true
    },
    temp_id: {
        type: String,
        required: true,
        unique: true
    },
    admin_name: {
        type: String,
        required: true,
        maxlength: 42
    },
    admin_description: {
        type: String,
        required: true
    },
    admin_email: {
        type: String,
        unique: true,
        required: true
    },
    encry_password: {
        type: String
    },
    salt: String,

    employees: {
        type: [Object]
    },

    clients: {
        type: [Object]
    },

    stats: {
        type: [Object]
    },

    notification: {
        type: [Object]
    },

    approvals: {
        type: [Object]
    },



});



adminProfileSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    });

adminProfileSchema.methods = {
    autheticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function(plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};


module.exports = mongoose.model("AdminProfile", adminProfileSchema);