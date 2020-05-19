const mysql = require('mysql2');
const supportDB = require('./../../config/config').supportDb;

const poll = mysql.createPool(supportDB).promise();

/**
 * шаблон изменения статуса
 * @type {string}
 */
const changeStatusTemplate = function (data) {
    console.log(typeof data.status)
    return `UPDATE \`${data.tableName}\` SET \`status\` = ${data.status === 'null' ? 1 : null} WHERE \`supportmessage\`.\`id\` = ${data.id}`
}


function changeStatus(data, send) {
    console.log(changeStatusTemplate(data))
    poll.execute(changeStatusTemplate(data))
        .then(res=> {
            if(res) send.send({status: data.status === 'null' ? 1 : null, id: data.id})
        })
        .catch(err=>{
            send.send({status: false, message: 'запись не удалось изенить, пожалуйста обратитесь к админитсратору', typeMessage: 'error'})

        })


}

module.exports = changeStatus;