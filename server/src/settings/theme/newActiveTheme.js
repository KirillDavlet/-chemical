const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

// шаблон по  замене активности предыдущей темы
const templateNewActiveThemeOld = () => {
    return `UPDATE themeall SET type = '' WHERE id = (SELECT id FROM themeall WHERE type = 'selectedTheme');`
}

// добавление новой темы активной
const templateNeeActiveTheme = (id) => {
    return `UPDATE themeall SET type = 'selectedTheme' WHERE id = '${id}'`
}


function newActiveTheme(id, send) {
    poll.execute(templateNewActiveThemeOld())
        .then(res=> {
           return poll.execute(templateNeeActiveTheme(id))
        })
        .then(res=> {
            if(res[0]) {
                send.send({status: true, message:'тема успешно поменяна', typeMessage: 'success'})
            } else {
                send.send({status: false, message:'проблемы', typeMessage: 'warning'})
            }
        })
        .catch(err=> send.send({status: false, message:'проблемы', typeMessage: 'error'}))

}

module.exports = newActiveTheme