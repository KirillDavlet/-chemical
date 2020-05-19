const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase


const poll = mysql.createPool(dataBase).promise();

// шаблон по добавлению новой темы
const templateEditTheme = (data) => {
    return `UPDATE themeall SET nameTheme = '${data.info.nameTheme}', mandatory = '${JSON.stringify(data.info.data)}' WHERE themeall.id = ${data.id};`
}

function deleteActiveTheme(data, send) {
    poll.execute(templateEditTheme(data))
        .then(res => {
            if(res[0]) {
                send.send({status:true, message:'тема успешно изменена', typeMessage:'success'})
            } else {
                send.send({status:false, message:'какие то проблемы на сервере, пардонти', typeMessage:'warning'})
            }
        })
        .catch(err=> send.send({status:false, message:'какие то проблемы на сервере, пардонти', typeMessage:'error'}))

}

module.exports = deleteActiveTheme