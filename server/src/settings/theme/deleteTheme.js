const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

// шаблон по добавлению новой темы
const templatedeleteTheme = (id) => {
    return `DELETE FROM themeall WHERE id = '${id}'`
}

function deleteTheme(id, send) {
    poll.execute(templatedeleteTheme(id))
        .then(res => {
            if(res[0]) {
                send.send({status:true, message:'тема успешно удалена', typeMessage:'success'})
            } else {
                send.send({status:true, message:'какие то проблемы на сервере, пардонти', typeMessage:'success'})
            }
        })
        .catch(err=> console.log(err))

}

module.exports = deleteTheme