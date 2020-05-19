доп модули:
npm install fs-extra - модуль для удаления всего и папок не путых в том числе


вызов МОДУЛЕЙ (СЕРВЕР)


```
app.get('/fileStorage', function(req,res){
    const fileStorage = require('./fileStorage/fileStorage')
    const api = './static'
    res.send(fileStorage(api))
});


app.del('/fileStorage/delete', function (req,res) {
    const fileStorageDelete = require('./fileStorage/deleteFile/deleteFile');
    fileStorageDelete(req.query.url,res)
});
```