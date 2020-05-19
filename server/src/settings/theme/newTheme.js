const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

// шаблон по добавлению новой темы
const templateNewTheme = (data) => {
    return `INSERT INTO themeall (id, nameTheme , mandatory, active, type) VALUES (null, '${data.name}', '${JSON.stringify(data.data)}', '0', '')`
}

// шаблон вывода последней записи
const lastNewTheme = `SELECT * FROM themeall ORDER BY id DESC LIMIT 1`

//шаблон по проверке на существование темы
const templateName = (data) => {
    return `SELECT id FROM themeall WHERE nameTheme = '${data.name}'`
}


function newTheme(data, send) {
    poll.execute(templateName(data))
        .then(res => {
            if(res[0].length === 0) {
                return poll.execute(templateNewTheme(data))
            } else {
                send.send('такое имя уже занято, придумайте другое')
            }
        })
        .then(res=> {
            if(res[0]) {
                return poll.execute(lastNewTheme)
            } else {
                send.send({status: false, message: 'произошла какая-то ошибка',typeMessage:'warning'})
            }
        })
        .then(res=> {
            if(res[0]) {
                send.send(res[0])
            }
        })
        .catch(err=> console.log(err))

}

module.exports = newTheme