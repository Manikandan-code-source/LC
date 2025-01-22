const path = require('path');
const fileReader = require('../lib/fileTester');

exports.getFile = (req,res) => {
    const filePath = './file.xlsx';
    const fileExtension = path.extname(filePath).toLowerCase();
    if (fileExtension === '.xlsx') {
        try {
            const data = fileReader.readExcelFile(filePath);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else if (fileExtension === '.txt') {
        fileReader.readTextFile(filePath)
            .then((fileData) => {
                res.status(200).send(fileData);
            })
            .catch((error) => {
                res.status(500).send(error.message);
            });
    }
}

// sridharakrishnan@angleritech.com

