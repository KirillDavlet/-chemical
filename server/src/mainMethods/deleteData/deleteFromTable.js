const mysql = require('mysql2');
const dataBaseSet = require('./../../config/config').dataBaseSet

const poll = function(data) {
    // return mysql.createPool({
    //     connectionLimit: 5,
    //     host: "localhost",
    //     user: "root",
    //     password: "pass",
    //     database: data.nameDB
    // }).promise();
    return mysql.createPool(dataBaseSet(data)).promise()
}

/**
 * шаблон удаления записи из таблицы
 * @type {string}
 */
const redleteRowFromTable = function (data, id) {
    return `DELETE FROM ${data.nameTable} WHERE id = ${id}`
}

/**
 * фукнция удаления данных из таблицы
 * @param db - сама база данных
 * @param data - информация по id записи и базе данных
 */
function dbUsersDelete (data,send) {
    let nameDB = JSON.parse(data.tableName)
    poll(nameDB).execute(redleteRowFromTable(nameDB,data.id))
        .then(res=> {
            if(res[0]) send.send({status:true, message:'запись удалена',typeMessage:'info'})
            else send.send({status:false, message:'что то пошло не так, обратитесь в службу поддержки или к системному администратору',typeMessage:'error'})
        })
        .catch(err=> console.log(err))
}

module.exports = dbUsersDelete