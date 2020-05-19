const testFolder = './static';
const fs = require('fs');

async function test() {
    await fs.readdir(testFolder, (err, files) => {
        for(let i =0 ; i < files.length; i++) {
            var file = testFolder + '/' + files[i];
            console.log(`files - ${files[i]}`)
        }
        fs.stat(file, function(err, stats) {
            console.log(file)
            console.log(stats)
            console.log(stats["size"])
        })
    });

}

module.exports = test;



