/**
 * модуль обновления сообщения, если пользователь прочитал сообщение тогда уже не новое и меняю в базе стату
 *
 * **/

const mysql = require('mysql2');
const messageDB = require('./../../config/config').messageUser

const poll = mysql.createPool(messageDB).promise();


/***
 * шаблон изменения статуса сообщения
 * @param id
 * @returns {string}
 */
const readMessageTemplate = function (id) {
    return `  UPDATE message SET status = 1 WHERE message.id = '${id}' `
};

/**
 * фукнция удаления данных из таблицы
 * @param db - сама база данных
 * @param data - информация по id записи и базе данных
 */
function readMessage(id, send) {
    poll.execute(readMessageTemplate(id))
        .then(res=> {
            if(res[0]) send.send({status:true, message:'сообщение отправлено',typeMessage:'info'})
            else send.send({status:false, message:'что то пошло не так, обратитесь в службу поддержки или к системному администратору',typeMessage:'error'})
        })
        .catch(err=> console.log(err))
}

module.exports = readMessage