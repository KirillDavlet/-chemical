const mysql = require('mysql2');
const dataBase = require('./../config/config').dataBase


/**
 * МОДУЛЬ ПО ПРОВЕРКЕ ПРАВ ДОСТУПА
 *
 *   ПРИМЕР РАБОТЫ МОДУЛЯ:
 *                          взов в головном файле ( файл вхождения )
 *                                                                  app.get('/' ,function(req,res)  {
 *                                                                       const accessControl = require('./config/accessControl')
 *                                                                       console.log(req.query.role)
 *                                                                       console.log(accessControl(req.query.role, '/'))
 *                                                                       if(accessControl(req.query.role, '/')) res.send({status:true})
 *                                                                       else res.send({status:false})
 *
 *                                                                   })
 *  На каждом компоненте отправляеться запрос на сервер и проверяеться, есть ли така ссылка у пользователя, если есть вернет true иначе false
 *
 **/

/**
 * модуль доступных ссылок для определенной роли
 * @type {{administration, user}}
 */
const userLinks = require('./../data/usersListLinks')


//:TODO hjkmроль гужно получить  базы ( так безопаснее )

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


/**
 * Функция по подготовке всех ссылок по роли, собираеться из НАВИГАЦИОННОГО ФАЙЛА
 *
 */

function accessControl(link, login = '', pass = '') {
    let status = false;

    function getRoleUser() {
        poll.execute(returnRole(login, pass))
            .then(res => {
                if (res[0]) {
                    if (res[0][0].role !== undefined && res[0][0].role !== null && res[0][0].role !== '') {
                        let responseRole = res[0][0].role;
                        //доступ пользователя по ссылке
                        //если роль известна, заполняем все возможные ссылки для этой роли
                        let availableLinks = {
                            [responseRole]: []
                        };
                        if (userLinks.roleLinks[responseRole] !== undefined) {
                            linksRecurs(userLinks.roleLinks[responseRole], availableLinks[responseRole])
                            accessCheck(availableLinks[responseRole], link);
                        }
                    }
                }
                return status
            })
            .catch(err => console.log(err))
    }

    getRoleUser()

    //:TODO НА ЭТМ МЕСТЕ ОСТАНОВИЛСЯ, ЗАВТРА - НАПИСАТЬ ЗАПРОС К БАЗЕ И ЕСЛИ ЧТО ТО ПРИХОДИТ ИДЕМ ДАЛЬШЕ ИНАЧЕ ВОЗВРАЩАЕМ false b на этом все

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

module.exports = accessControl;