const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const superAdminProfileSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    user_role: {
        type: Number,
        required: true,
        trim: true
    },
    temp_id: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true,
        maxlength: 42
    },
    user_description: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        unique: true,
        required: true
    },
    encry_password: {
        type: String
    },
    salt: String,

    admins: {
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



}, { timestamps: true });

superAdminProfileSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    });

superAdminProfileSchema.methods = {
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


module.exports = mongoose.model("SuperAdminProfile", superAdminProfileSchema);