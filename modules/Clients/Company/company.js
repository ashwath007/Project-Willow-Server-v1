const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const companySchema = new mongoose.Schema({

    company_id: {
        type: String,
        required: true,
        unique: true
    },
    company_client_id: {
        type: Object,
        required: true,
        trim: true
    },
    temp_id: {
        type: String,
        required: true,
        unique: true
    },
    company_name: {
        type: String,
        required: true,
        maxlength: 42,
        unique: true
    },
    company_description: {
        type: String,
        required: true
    },
    company_email: {
        type: String,
        unique: true,
        required: true
    },
    company_phone: {
        type: String,
        unique: true,
        required: true
    },
    company_address: {
        type: String,
        unique: true,
        required: true
    },


    // ** 
    company_sister_company_division: {
        type: [Object],
        required: true
    }
    // **



}, { timestamps: true });



module.exports = mongoose.model("CompanyProfile", companySchema);