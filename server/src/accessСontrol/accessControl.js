//ЗАПРОС на все доступные ссылки по пользователю
const accesCOntrolInIdUser = (id, link) => {
    return `SELECt LL.link FROM dataUsers DU
            JOIN linkingRoles LR ON LR.idRole = DU.role
            JOIN listLink LL ON LL.id = LR.idLink
            WHERE DU.id = ${id} AND LL.link = '${link}'`
    };

/**
 * ЗАПРОС НА ВСЕ РОЛИ
 * @type {string}
 */
const roles  = `SELECT * FROM usersRole`;

function dbSearch(id, link, db, data = null) {
    let dataInfo = null
    db.execute(data)
        .then(res => {
            if (res) {
                dataInfo = {
                    status: true,
                    data: res[0]
                }
                return db.execute(roles)
            }
        })
        .then(res=> {
            if(res) {
                dataInfo.roles = res[0];
                console.log(dataInfo)
                return dataInfo
            }
        })
        .catch(err => console.log(err));
}

module.exports = dbSearch;

