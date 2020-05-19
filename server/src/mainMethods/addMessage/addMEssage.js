const mysql = require('mysql2');
const messageUser = require('./../../config/config').messageUser
const poll = mysql.createPool(messageUser).promise();

/**
 * шаблон добавления новых сообщений
 * @type {string}
 */
const newMessageInUser = function (data) {
    return `INSERT INTO message (id_from, fio_from,id_recipient,theme,description ) 
                            VALUES ('${data.from.id}','${data.from.FIO}','${data.recipient_id}','${data.info.theme}','${data.info.description}')`
}

/**
 * фукнция отправки сообщения
 * @param db -   сама база данных
 * @param data - информация по id записи и базе данных
 */
function addMessageInUser(data, send) {
    poll.execute(newMessageInUser(data))
        .then(res=> {
            if(res[0]) send.send({status:true, message:'сообщение отправлено',typeMessage:'info'});
            else send.send({status:false, message:'что то пошло не так, обратитесь в службу поддержки или к системному администратору',typeMessage:'error'})
        })
        .catch(err=> console.log(err))
}

module.exports = addMessageInUser