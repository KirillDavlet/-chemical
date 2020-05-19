const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

const templateDeleteEvents = (id) => {
    return `DELETE FROM userevents WHERE userevents.id = ${id}`
}

function deleteEvent(param, send) {
    poll.execute(templateDeleteEvents(param.id))
        .then(res=> {
            if(res[0]) {
                send.send({status: true, message:'успешно удалили',messageType:'success'})
            } else {
                send.send({status: false, message:'какие то проблемы , попробуйте позднее',messageType:'warning'})
            }
         })
        .catch(err=> {
            send.send({status: false, message:'на сервере ведуться технические работы, попробуйте позднее',messageType:'error'})
        })
}

module.exports = deleteEvent