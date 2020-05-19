const fs = require('fs');
const path = require('path');


function openFile(url, send) {

    send.send('открываю файл')
}

module.exports = openFile;