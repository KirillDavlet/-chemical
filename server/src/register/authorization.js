const searchUser = (dataUser) => {
    return `SELECT id,status,login,pass FROM users WHERE login = '${dataUser.login}' && pass = '${dataUser.pass}'`;
};

const searchInfoUser = (idUser) => {
    return `SELECT * FROM dataUsers WHERE id = ${idUser}`
}

/**
 * ПОИСК РОЛИ ПОЛЬЗОВАТЕЛЯ
 * @param idRole
 */
const searchRole = (idRole) => {
    return `SELECT role FROM usersRole WHERE id = ${idRole}`
}


/**
 * ФУНКЦИЯ ВОЗВРАЩАЕТ ЗАПРОС НА ДОСТУАНЫЕ ССЫЛКИ ДЛЯ РОЛИ ПО ИЕДНТИФИКАТОРУ РОЛИ
 * @param idRole
 * @returns {string}
 */
const searchLinksInRole = (idRole) => {
    return `SELECT LL.nameLink, LL.link, LL.children FROM usersRole UR
JOIN linkingRoles LR ON LR.idRole = UR.id
JOIN listLink LL ON LL.id = LR.idLink
WHERE UR.id = ${idRole}`
}


// const searchNewMessage = (idUser) => {
//     return `SELECT * FROM message WHERE d_recipient = ${idUser} AND status = 0`
// }:TODO НАЭТОМ МЕСТЕ ОСТАНОВИЛСЯ ДОПИСАТЬ

/**
 * модуль для выджета переключаетли
 */
const determiningAvailableSwitches = require('./../config/roleSwitches')

function test(data, db, send, linksUser, lang) {
    let dataInfo = null;
    let role = null;
    let userInfo = {};
    db.execute(searchUser(data))
        .then(res => {
            if (res[0].length > 0) {
                if (res[0][0].status === null || res[0][0].status !== 1) {
                    dataInfo = {status: false, info: 'ваша запись не активна, обратитесь к администратору', lang: lang}
                } else {
                    userInfo = {
                        login: res[0][0].login,
                        pass: res[0][0].pass,
                        lang: lang
                    }
                    return db.execute(searchInfoUser(res[0][0].id))
                }
            }
        })
        .then(res => {
            if (res) {
                dataInfo = {status: true, info: res[0][0]};
                dataInfo.info.userInfo = userInfo
                role = res[0][0].role;
                return db.execute(searchRole(res[0][0].role))
            }
        })
        .then(res => {
            if (res) {
                dataInfo.info.role = res[0][0].role;
                let roleInSwitcher = determiningAvailableSwitches(dataInfo.info.role)
                for (let item in linksUser) {
                    if (dataInfo.info.role === item) dataInfo.info.linksModule = linksUser[item]
                }
                dataInfo.info.roleSwitcher = roleInSwitcher
                return db.execute(searchLinksInRole(role))
            }
        })
        .then(res => {
            if (res) {
                dataInfo.info.links = res[0]
            }
        })
        .then(() => {
            if (dataInfo) {
                return send.send(dataInfo)
            } else {
                return send.send(dataInfo)
            }
        })
        .catch(err => console.warn(err))
}

module.exports = test
