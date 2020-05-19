const statusUser = (id, status) => {
    return `UPDATE users SET
            status = ${status}
            WHERE id = ${id}`
};

function dbStatusUser(db, id, status, send) {
    db.execute(statusUser(id, status))
        .then(res => {
            if (res[0]) {
                return send.send({
                    statusUser: status
                })
            }

        })
        .catch(err=> console.log(err))
}

module.exports = dbStatusUser