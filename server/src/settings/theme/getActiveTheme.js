const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

// шаблон по выборке активных тем
const templateActiveTheme = () => {
    return `SELECT * FROM themeall WHERE type = 'standart' OR type = 'selectedTheme'`
}


function activeTheme(send) {
    poll.execute(templateActiveTheme())
        .then(res=> {
            if(res[0]) {
                let data = res[0]
                data.forEach(el=> {
                    el.mandatory = JSON.parse(el.mandatory)
                })
                send.send(data)
            } else {
                send.send([])
            }
        })
        .catch(err=> console.log(err))

}

module.exports = activeTheme