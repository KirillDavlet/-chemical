const mysql = require('mysql2')
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

let templateGetEventsUser = (id) => {
    return `SELECT *,DATE_FORMAT(date, '%Y-%m-%d') as format_date FROM userevents WHERE id_user = '${id}'`
}

function getAllEvents (data, send) {
    poll.execute(templateGetEventsUser(data))
        .then(res=> {
            if(res[0]) send.send({status:true, message:'данные по пользовательским событиям получены',allEvents:res[0]})
            else send.send({status:false, message:'что то пошло не так, обратитесь в службу поддержки или к системному администратору',typeMessage:'error'})
        })
        .catch(err=> send.send({status:false, message:err, typeMessage:'error'}))
}

module.exports = getAllEvents