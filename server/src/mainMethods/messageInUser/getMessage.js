const mysql = require('mysql2');
const messageUser = require('./../../config/config').messageUser


const poll = mysql.createPool(messageUser).promise();

const lineRequest = (id) => {
   return `SELECT * FROM message WHERE id_recipient = '${id}'`
}


function getAllMessage(id, send) {
    poll.execute(lineRequest(id))
        .then(res=> {
            if(res[0]) send.send({status:true, message:'сообщение получены',allMessage:res[0]})
            else send.send({status:false, message:'что то пошло не так, обратитесь в службу поддержки или к системному администратору',typeMessage:'error'})
        })
        .catch(err=> console.log(err))
}

module.exports = getAllMessage