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
        console.log(err)
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