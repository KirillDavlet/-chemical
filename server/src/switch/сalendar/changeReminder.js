const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

const templateChangeReminder = (id,reminder) => {
    return `UPDATE userevents SET reminder = '${reminder}' WHERE userevents.id = ${id}`
}

function changeReminder(param, send) {
    poll.execute(templateChangeReminder(param.idEvent, param.reminder ? 1 : 0))
        .then(res=> {
            if(res[0]) {
                send.send({status: true, message:'успешно поменяли',messageType:'success'})
            } else {
                send.send({status: false, message:'какие то проблемы , попробуйте позднее',messageType:'warning'})
            }
         })
        .catch(err=> {
            send.send({status: false, message:'на сервере ведуться технические работы, попробуйте позднее',messageType:'error'})
        })
}

module.exports = changeReminder