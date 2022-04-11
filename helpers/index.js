const fs = require('fs');

const readFile = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
        if (error) {
            reject(error);
        }
        resolve(data);
    });
});

module.exports = {
    readFile,
};