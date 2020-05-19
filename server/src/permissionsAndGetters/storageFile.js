const mysql = require('mysql2');
const dataBase = require('./../config/config').dataBase

/**
 * модуль доступных ссылок для определенной роли
 * @type {{administration, user}}
 */
const userLinks = require('./../data/usersListLinks')


//роль гужно получить  базы ( так безопаснее )
function returnRole(login, pass) {
    return `SELECT ur.role FROM usersrole ur 
            WHERE ur.id IN (
                  SELECT du.role FROM datausers du 
                  WHERE du.id IN (
                        SELECT us.id FROM users us
                        WHERE us.login = '${login}' AND us.pass = '${pass}'
                  )
            )`
}

/**
 * конфиги по БД
 * @type {PromisePool}
 */
const poll = mysql.createPool(dataBase).promise()


function getStorageFile(link, login = '', pass = '', send) {
    let status = false;
    const fileStorage = require('./../fileStorage/fileStorage');
    const api = './static';
    send.send({
        status: true,
        message: 'все хорошо, файловая система работает',
        typeMessage: 'success',
        info: fileStorage(api)
    })
    // poll.execute(returnRole(login, pass))
    //     .then(res => {
    //         if (res[0]) {
    //             if (res[0][0].role !== undefined && res[0][0].role !== null && res[0][0].role !== '') {
    //                 let responseRole = res[0][0].role;
    //                 //доступ пользователя по ссылке
    //                 //если роль известна, заполняем все возможные ссылки для этой роли
    //                 let availableLinks = {
    //                     [responseRole]: []
    //                 };
    //                 if (userLinks.roleLinks[responseRole] !== undefined) {
    //                     linksRecurs(userLinks.roleLinks[responseRole], availableLinks[responseRole])
    //                     accessCheck(availableLinks[responseRole], link);
    //                 }
    //                 if(status) {
    //                     const fileStorage = require('./../fileStorage/fileStorage');
    //                     const api = './static';
    //                     send.send({
    //                         status: true,
    //                         message: 'все хорошо, файловая система работает',
    //                         typeMessage: 'success',
    //                         info: fileStorage(api)
    //                     })
    //                 }else {
    //                     send.send({status: false, message: 'у вас нет доступа к данному рессурсу', typeMessage: 'error'})
    //                 }
    //             } else {
    //                 send.send({status: false, message: 'у вас нет доступа к данному рессурсу', typeMessage: 'error'})
    //             }
    //         }
    //     })
    //     .catch(err => console.log(err))

    /**
     * функция перебора всех доступных ссылок вызываеться рекурсивно
     * @param arrLinks
     */
    function linksRecurs(arrLinks, arr) {
        arrLinks.forEach(el => {
            if (el.link !== '') arr.push(el.link);
            if (el.child.length > 0) {
                linksRecurs(el.child, arr)
            }
        })
    }

    /**
     * функция проверки доступа пользователя к ссылке
     * @param arr - массив ссылок по активной роли
     * @param links - ссылка куда переходим
     */
    function accessCheck(arr, links) {
        arr.some((el) => {
            el === links ? status = true : ''
        })
    }
}

module.exports = getStorageFile;