const mysql = require('mysql2');
const supportDB = require('./../../config/config').supportDb

const pollSupport = mysql.createPool(supportDB).promise();

const templateGetMessage = function () {
    return `SELECT * FROM supportmessage`
};

function getMessageSupport(send) {
    poll.execute(templateGetMessage())
        .then(res=> {
            send.send({
                status:true,
                message:'загрузка завершена всех сообщений',
                typeMessage:'success',
                dataMessage: res[0],
                dataDB: {
                    nameDB:'supportsystemchimical',
                    nameTable:'supportmessage'
                }
            })
        })
        .catch(err=> send.send({
            message:'извините, что то пошло не так',
            typeMessage: 'error',
            status:false
        }))
}

module.exports = getMessageSupport;
