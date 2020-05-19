const fs = require('fs');
const path = require('path');

/**
 * функция изменения имени файлов ( папок )
 * @param data - ( Object ) хранит в себе старое название, новое название, полный адрес к файлу
 *
 * ВЫЗОВ МОДУЛЯ В ВХОДНОМ ФАЙЛЕ:
 *
    app.post('/fileStorage/change', function(req,res) {
        const changeName = require('./fileStorage/changeFile/changeNameFile')
        changeName(req.body,res)
    })
 */
function changeNameFile(data,res) {
    console.log(data)
    fs.rename(data.url, data.url.replace(data.nameStart, data.nameNew), function(err) {
        if(err) return res.send({status:false,typeMessage:'error', message:'извините, что то пошло не так, попробуйте позже и обновите страницу'});
        else return res.send({
            status:true,
            nameStart: data.nameStart,
            nameNew:  data.nameNew,
            fullAddressNew: data.url.replace(data.nameStart, data.nameNew),
            fullAddressStart: data.url,
            typeMessage:'info',
            message:'файл успешно изменен'
        })
    })
}

module.exports = changeNameFile;