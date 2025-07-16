'use strict';
const fs = require('fs-extra');
const {join} = require('path');
const loadSqlQueries = async (folderName) => {
    const filePath = join(process.cwd(), 'data', folderName);
    const files = await fs.readdir(filePath);
    const sqlFiles = await files.filter(f => f.endswith('.sql'));
    const queries = {};

for (const sqlFile of sqlFiles){
const query = await fs.readfileSync(join(filePath, sqlFile), {encoding: "UTF-8"});
queries[sqlfile.replace(" sql"), ""] = query}
return queries;
}
module.exports={
     loadSqlQueries
}