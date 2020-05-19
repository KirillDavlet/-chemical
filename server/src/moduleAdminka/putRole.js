const putRole = function (idUser, idRole) {
    return `UPDATE dataUsers SET 
            role = ${idRole}
            WHERE id = ${idUser}
    `
};

const userRole = function(idRole) {
    return `SELECT role FROM usersRole WHERE id = ${idRole}`
}

function dbRoleuser(db,id,idRole,send) {
    db.execute(putRole(id, idRole))
        .then(res=> {
            if(res[0]) {
                return db.execute(userRole(idRole))
            }
        })
        .then(res=> {
            if(res[0]) {
                send.send(res[0][0])
            }
        })
        .catch(err=> console.log(err))
}

module.exports = dbRoleuser