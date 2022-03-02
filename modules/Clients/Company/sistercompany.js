const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const sisterCompanySchema = new mongoose.Schema({

    division_name: {
        type: String,
        required: true,
        maxlength: 32
    },

    select_plans: {
        type: String,
        enum: ['All', 'GST', 'PF', 'ESI', 'Factory Registration'],
        required: true,
        default: 'All'
    },

    plans: {
        type: Object
    },

    division_type: {
        type: String,
        enum: ['Sister Company', 'Division Within', 'Both'],
        required: true,
        default: 'Sister Company'
    },

    division_category: {
        type: String,
        enum: ['Manufacturing', 'Services', 'Testing'],
        required: true,
        default: 'Manufacturing'
    },

    seperate_billing_account: {
        type: Boolean,
        required: true
    },

    billing_account: {
        type: Object
    }


}, { timestamps: true });




module.exports = mongoose.model("SisterCompanyProfile", sisterCompanySchema);