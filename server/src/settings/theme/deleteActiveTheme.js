const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

// шаблон по добавлению новой темы
const templatedeleteActiveTheme = (id) => {
    return `UPDATE themeall SET type = '' WHERE themeall.id = ${id};`
}

function deleteActiveTheme(id, send) {
    poll.execute(templatedeleteActiveTheme(id))
        .then(res => {
            if(res[0]) {
                send.send({status:true, message:'тема успешно удалена', typeMessage:'success'})
            } else {
                send.send({status:true, message:'какие то проблемы на сервере, пардонти', typeMessage:'success'})
            }
        })
        .catch(err=> console.log(err))

}

module.exports = deleteActiveTheme