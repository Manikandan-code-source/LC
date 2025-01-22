const xlsx = require('xlsx');
const fs = require('fs')

const readExcelFile = (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        let allData = {};
        workbook.SheetNames.forEach((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            allData[sheetName] = xlsx.utils.sheet_to_json(sheet);
        });
        return allData;
    } catch (error) {
        throw new Error('Error reading Excel file: ' + error.message);
    }
};

const readTextFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading the file: ' + err.message);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = { readExcelFile, readTextFile };
