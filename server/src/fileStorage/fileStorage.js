/**
 * МОДУЛЬ файловой системы
 * @return [] по щаблону
 * вызов модуля const fileStorage = require('./fileStorage/fileStorage') -> const api = './static' -> fileStorage(api)
 */

const fs = require('fs');
const path = require('path');

const api = './../static';


var getFiles = function (dir, files_) {

    //шаблон элемента
    const template = function (name) {
        return {
            title: name
                .split('/')
                .slice(-1)
                .join()
                .split('.')
                .slice(-2, 1)
                .join(''),
            fullAddress: name, //полный адрес ( путь ) файла
            type: path.extname(name.split('/').slice(-1).join()) !== ''
                ? path.extname(name.split('/').slice(-1).join()) //если это не папка
                : 'folder', //записал тип файла , если папка, то пустая строка
            children: [],
            size:'312312',
            dateOfCreation: {
                birthTime: '123'
            }
        }
    };

    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files) {
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            files_.push(template(name))
            getFiles(name, files_[files_.length - 1].children);
        } else {
            files_.push(template(name));
        }
    }
    return files_;
};


module.exports = getFiles;

