const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const employeeSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
        unique: true
    },
    employee_role: {
        type: Number,
        required: true,
        trim: true
    },
    temp_id: {
        type: String,
        required: true,
        unique: true
    },
    employee_name: {
        type: String,
        required: true,
        maxlength: 42
    },
    employee_description: {
        type: String,
        required: true
    },
    employee_email: {
        type: String,
        unique: true,
        required: true
    },
    employee_status: {
        type: String,
        enum: ['Online', 'Offline', 'Away'],
        required: true,
        default: 'Offline'
    },

    employement_type: {
        type: String,
        enum: ['Full Time', 'Part Time', 'Remote'],
        required: true,
        default: 'Full Time'
    },

    employee_division: {
        type: [Object]
    },

    employee_salary: {
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

    client_assigned: {
        type: [Object]
    },

    work: {
        type: [Object]
    }


}, { timestamps: true });

employeeSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    });

employeeSchema.methods = {
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


module.exports = mongoose.model("EmployeeProfile", employeeSchema);