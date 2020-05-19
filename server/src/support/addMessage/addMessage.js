const mysql = require('mysql2');
const supportDB = require('./../../config/config').supportDb

const poll = mysql.createPool(supportDB).promise();

/**
 * шаблон добавления записи в базу данных
 * @type {string}
 */
const addMessage = function (data) {
    return `INSERT INTO supportmessage (theme,message,result,id_user,fio_user) 
                            VALUES ('${data.topicAppeal}','${data.descriptionProblem}','${data.desiredResult}','${data.dataUser.id}','${data.dataUser.FIO}')`
}


function addMessageSupport(data, send) {
    poll.execute(addMessage(data))
        .then(res=> {
            if(res) send.send({status: true, message: 'сообщение отправлено в техническую поддержку', typeMessage: 'info'})
        })
        .catch(err=>{
            send.send({status: false, message: 'сообщение не отправилось, попробуйте позднее или сообщите об ошибке администратору', typeMessage: 'error'})

        })


}

module.exports = addMessageSupport;