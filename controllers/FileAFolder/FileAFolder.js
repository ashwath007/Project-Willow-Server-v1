const FileandFolder = require('../../modules/FileSystem/FileAFolder');
const Pig = require('pigcolor');


exports.createFolder = (req, res) => {
    Pig.box("CREATE Folder");
    const newFileandFolder = new FileandFolder();
    newFileandFolder.name = req.body.folderName;
    newFileandFolder.filefolder_url = req.body.filefolder_url;
    newFileandFolder.fileorfolder = req.body.fileorfolder;
    newFileandFolder.filefolder_privacy = req.body.folderPrivacy;
    newFileandFolder.folderparent = req.body.folderparent;
    if (req.body.folderUnder) {
        newFileandFolder.folderunder.push(req.body.folderUnder)
    }
    newFileandFolder.save((err, created) => {
        console.log(err, created)
        if (err) {
            return res.status(402).json({
                error: err
            })
        }
        return res.json({
            created
        })
    });
}

exports.getAllFolderData = (req, res) => {
    Pig.box("GET ALL Folder");
    FileandFolder.find({ folderparent: req.body.sisId }, (err, allFolder) => {
        if (err) {
            return res.status(402).json({
                error: err
            })
        }
        console.log(allFolder)
        return res.json({
            allFolder
        })
    })
}

exports.uploadFile = (req, res) => {
    Pig.box('UPLOAD File');
    const newFileandDFolder = new FileandFolder();
    newFileandDFolder.name = req.body.folderName;
    newFileandDFolder.fileorfolder = 'File';
    newFileandDFolder.filefolder_url = req.body.filefolder_url;
    newFileandDFolder.filefolder_privacy = 'Public';
    newFileandDFolder.folderparent = req.body.folderparent;
    newFileandDFolder.fileType = req.body.fileType;
    newFileandDFolder.save((err, uploaded) => {
        console.log(err)
        if (err) {
            return res.status(402).json({
                error: err
            })
        }
        return res.json({
            uploaded
        })
    })


}

exports.getAFile = (req, res) => {
    Pig.box("GET A File");
    FileandFolder.findById({ _id: req.params.fileID }, (err, file) => {
        if (err) {
            return res.status(402).json({
                error: err
            })
        }
        return res.json({
            file
        })
    })
}

exports.getFoldersFilesUnder = (req, res) => {
    Pig.box("GET FILES/FOLDERS Under Folder");
    FileandFolder.findById({ _id: req.params.findID }, (err, folder_ids) => {

    });
}


exports.workcreateFolder = (req, res) => {
    Pig.box("CREATE Folder");
    const newFileandFolder = new FileandFolder();
    newFileandFolder.name = req.body.folderName;
    newFileandFolder.filefolder_url = req.body.filefolder_url;
    newFileandFolder.fileorfolder = req.body.fileorfolder;
    newFileandFolder.filefolder_privacy = req.body.folderPrivacy;
    newFileandFolder.folderparent = req.body.folderparent;
    if (req.body.folderUnder) {
        newFileandFolder.folderunder.push(req.body.folderUnder)
    }
    newFileandFolder.save((err, created) => {
        console.log(err, created)
        if (err) {
            return res.status(402).json({
                error: err
            })
        }
        return res.json({
            created
        })
    });
}