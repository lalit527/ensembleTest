//const mongoXlsx = require('mongo-xlsx');

//import XLSX from 'xlsx';


/*const fs = require('fs');
const rr = fs.createReadStream('./uploads/test.xlsx');

rr.on('data', (chunk) => {
    console.log(chunk.toJSON('utf8'));
});*/

const XLSX = require('xlsx');

module.exports.getQsn = (file) => {
    const workbook = XLSX.readFile('./uploads/'+file);
    const sheet_name_list = workbook.SheetNames;
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    
}
