const searchUser = (id) => {
    return `SELECT id,status,login,pass FROM users WHERE id = '${id}'`;
};

const searchInfoUser = (id) => {
    return `SELECT * FROM dataUsers WHERE id = ${id}`
};
/**
 * ПОИСК РОЛИ ПОЛЬЗОВАТЕЛЯ
 * @param idRole
 */
const searchRole = (idRole) => {
    return `SELECT role FROM usersRole WHERE id = ${idRole}`
};

/**
 * ФУНКЦИЯ ВОЗВРАЩАЕТ ЗАПРОС НА ДОСТУАНЫЕ ССЫЛКИ ДЛЯ РОЛИ ПО ИЕДНТИФИКАТОРУ РОЛИ
 * @param idRole
 * @returns {string}
 */
const searchLinksInRole = (idRole) => {
    return `SELECT LL.nameLink, LL.link, LL.children FROM usersRole UR
JOIN linkingRoles LR ON LR.idRole = UR.id
JOIN listLink LL ON LL.id = LR.idLink
WHERE UR.id = ${idRole}`}


/**
 * модуль для выджета переключаетли
 */
const determiningAvailableSwitches = require('./../config/roleSwitches')

function DataUserInLocalStorage(data, db, send, linksUser, lang) {
    let dataInfo = null;
    let role = null;
    let userInfo = {};
    db.execute(searchUser(data))
        //ЗАПРОС НА АВТОРИЗАЦИЮ
        .then(res => {
            if (res[0].length > 0) {
                if (res[0][0].status === null || res[0][0].status !== 1) {
                    dataInfo = {status: false, message: 'ваша запись не активна, обратитесь к администратору', typeMessage:'info', lang: lang} //:TODO Дописал нужно будет исправить отображение сообщения при авторизации
                } else {
                    userInfo = {
                        login: res[0][0].login,
                        pass: res[0][0].pass,
                        lang: lang
                    };
                    return db.execute(searchInfoUser(res[0][0].id))
                }
            }
        })
        //ЗАПРОС НА ПОИСК РОЛИ
        .then(res => {
            if (res[0][0]) {
                dataInfo = res[0][0];
                role = res[0][0].role;
                return db.execute(searchRole(res[0][0].role))
            }
        })
        //ЗАПИСЫВАНИЕ РОЛИ
        .then(res=> {
            if(res) {
                dataInfo.role = res[0][0].role;
                dataInfo.userInfo = userInfo
                let roleInSwitcher = determiningAvailableSwitches(dataInfo.role)
                for(let item in linksUser) {
                    if(dataInfo.role === item) dataInfo.linksModule = linksUser[item]
                }
                dataInfo.roleSwitcher = roleInSwitcher
                return db.execute(searchLinksInRole(role))
            }
        })
        .then(res=> {
            if(res) {
                dataInfo.links = res[0];
            }
        })
        .then(() => {
            if(dataInfo) {
                return send.send(dataInfo)
            }
            else return send.send(dataInfo)
        })
        .catch(err => console.warn(err))
}

module.exports = DataUserInLocalStorage;
