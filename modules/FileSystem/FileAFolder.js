const mongoose = require('mongoose');

const FileandFolder = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        minlength: 2
    },
    fileorfolder: {
        type: String,
        required: true
    },
    filefolder_url: {
        type: String,
    },
    filefolder_privacy: {
        type: String,
        required: true
    },
    folderparent: {
        type: String
    },
    folderunder: {
        type: [Object]
    },
    fileType: {
        type: String
    },
    fileorfolder_lock: {
        type: String,
        required: true,
        enum: ['LOCK', 'UNLOCK'],
        default: 'UNLOCK'
    }
}, { timestamps: true });


module.exports = mongoose.model("FileAndFolder", FileandFolder);