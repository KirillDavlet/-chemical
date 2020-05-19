const mysql = require('mysql2');
const dataBase = require('./../../config/config').dataBase

const poll = mysql.createPool(dataBase).promise();

let templateAddEvent = (data) => {
    return `INSERT INTO userevents (id, id_user, description, reminder, date) VALUES (NULL, '${data.id_user}', '${data.description}', '${data.activeReminder ? 1 : 0}', '${data.date}');`
}

//шаблон по возврату нового события
let newEvents = (id) => {
    return `SELECT *,DATE_FORMAT(date, '%Y-%m-%d') as format_date FROM userevents ue WHERE ue.id= ${id}`
}

function addEvent (data, send) {
    poll.execute(templateAddEvent(data))
        .then(res=> {
            if(res[0] && res[0].insertId) {
               return poll.execute(newEvents(res[0].insertId))
            } else {
                send.send({status:false,message:'событие не моет быть создано, обратитесь к системноиу адмнестратору',typeMessage:'warning'})
            }
        })
        .then(res=> {
            if(res[0]) {
                send.send({status:true,message:'событие создано',typeMessage:'success',data: res[0][0]})
            } else {
                send.send({status:false,message:'событие не моет быть создано, обратитесь к системноиу адмнестратору',typeMessage:'warning'})
            }
    }).catch(err=> send.send({status:false, message:err, typeMessage:'error'}))
}

module.exports = addEvent