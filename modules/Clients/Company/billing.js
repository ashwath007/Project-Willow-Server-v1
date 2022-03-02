const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const billingSchema = new mongoose.Schema({
    billing_id: {
        type: String,
        required: true,
        unique: true
    },
    temp_id: {
        type: String,
        required: true,
        unique: true
    },
    bill_name: {
        type: String,
        required: true,
        maxlength: 42
    },
    bill_credit: {
        type: mongoose.Decimal128,
        required: true
    },
    bill_prepaid: {
        type: mongoose.Decimal128,
        required: true
    },
    bill_sub_billings: {
        type: [Object],
    }



}, { timestamps: true });



module.exports = mongoose.model("BillingCompany", billingSchema);