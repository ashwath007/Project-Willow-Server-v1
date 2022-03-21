const mongoose = require('mongoose');

const FileandFolder = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
    }
}, { timestamps: true });


module.exports = mongoose.model("FileAndFolder", FileandFolder);