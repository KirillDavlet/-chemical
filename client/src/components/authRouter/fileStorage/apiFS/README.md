МОДУЛЬ ФАЙЛОВОГО ХРАНИЛИЩА 

ВХОДНОЙ МОДУЛЬ AXIOS "api.js" стандартный адрес (`http://localhost:8081`)

1) getFS->getFS.js модуль отправки get запроса для получения данных по хранилищу (карта)
    - СТОРОНА СЕРВЕРА :
```
app.get('/fileStorage', function(req,res){
    const fileStorage = require('./fileStorage/fileStorage')
    const api = './static'
    res.send(fileStorage(api))
})
```
   - файл 'fileStorage'
```
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
            children: []
        }
    }

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
```

2) deleteFileFS->deleteFiles.js модуль отправки запроса на удаление файла ( папки )

- СТОРОНА СЕРВЕРА:
```
app.del('/fileStorage/delete', function (req,res) {
    const fileStorageDelete = require('./fileStorage/deleteFile/deleteFile');
    fileStorageDelete(req.query.url)
    res.send({
        status:true
    })
})
```
- файл 'deleteFile'
```
const fs = require('fs');
const path = require('path');

/**
 * функция удаления файлов ( папок )
 * @param address - адресс того, что удаляем ( полный адресс пример - )
 */
function deleteFile(address) {
    fs.unlinkSync(address)
}

module.exports = deleteFile;
```


3) addFiles -> addFolder.js модуль по созданию новой папки 

