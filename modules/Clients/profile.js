const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const clientsSchema = new mongoose.Schema({
    client_id: {
        type: String,
        required: true,
        unique: true
    },
    client_role: {
        type: Number,
        required: true,
        trim: true
    },
    temp_id: {
        type: String,
        required: true,
        unique: true
    },
    client_name: {
        type: String,
        required: true,
        maxlength: 42
    },
    client_description: {
        type: String,
        required: true
    },
    client_email: {
        type: String,
        unique: true,
        required: true
    },
    client_status: {
        type: String,
        enum: ['Online', 'Offline', 'Away'],
        required: true,
        default: 'Offline'
    },
    client_company_name: {
        type: String,
        required: true
    },
    client_company_size: {
        type: String,
        required: true
    },
    client_company_type: {
        type: String,
        required: true
    },

    //  ** ---
    client_company: {
        type: Object
    },
    // ** ---

    client_division: {
        type: [Object]
    },

    client_billing: {
        type: [Object]
    },

    encry_password: {
        type: String
    },
    salt: String,


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

clientsSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    });

clientsSchema.methods = {
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


module.exports = mongoose.model("ClientProfile", clientsSchema);