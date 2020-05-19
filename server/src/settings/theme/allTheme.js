const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase


const poll = mysql.createPool(dataBase).promise();

// шаблон по выборке всех тем
const templateAllTheme = () => {
    return `SELECT * FROM themeall`
}


function allTheme(send) {
    poll.execute(templateAllTheme())
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

module.exports = allTheme