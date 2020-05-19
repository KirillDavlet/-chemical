const DeleteUsers = function (id) {
    return ` DELETE FROM users WHERE id  = ${id}`
}

const DeleteDataUser = function(id) {
    return `DELETE FROM dataUsers WHERE id = ${id}`
}

/**
 * фукнция удаления из базы данных пользователя
 * @param db - сама база данных
 * @param idUser - идентификатор пользователя
 * @param send - для ответа и отправки клиенту
 */
function dbUsersDelete (db,idUser,send) {
    db.execute(DeleteUsers(idUser))
        .then(res=> {
            if(res[0]) return db.execute(DeleteDataUser(idUser))
            else send.send('какая то ошибка вышла')
        })
        .then(res=> {
            if(res[0]) send.send('все оки')
        })
        .catch(err=> console.log(err))
}

module.exports = dbUsersDelete
