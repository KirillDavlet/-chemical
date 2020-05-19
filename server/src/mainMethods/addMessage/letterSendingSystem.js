const mysql = require('mysql2');
const messageUser = require('./../../config/config').messageUser
const poll = mysql.createPool(messageUser).promise();

const template = `INSERT INTO message (id_from, fio_from,id_recipient,theme,description ) VALUES `


/**
 * шаблон добавления новых сообщений
 * @type {string}
 */
function newMessageInUserTemplate (data, recipientId) {
    return `('${data.id_from}','${data.fio_from}','${recipientId}','${data.theme}','${data.description}')`
}


function letterSendingSystem (data, send) {
    let str = template;
    data.users.forEach((el ,i, arr) => {
       str += newMessageInUserTemplate(data.info, el)
        arr.length-1 > i ? str+=',' : ''
    });
    poll.execute(str)
        .then(res=> {
            if(res[0]) send.send({status:true, message:'выбранныйм пользователям сообщения отправились',typeMessage:'success'});
            else send.send({status:false, message:'что то пошло не так, обратитесь в службу поддержки или к системному администратору',typeMessage:'error'})
        })
        .catch(err=> {
            send.send('письма не отправены')
        })

}

module.exports = letterSendingSystem