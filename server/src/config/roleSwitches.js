/**
 * Модуль по переключателям
 * в зависимости от роли отдает переключаетли
 * - name       - название переключателя
 * - title      - название для отображения
 * - sidebar    - флаг отвечающий за отображение боковой панели ( открыта или нет )
 * @type {{}}
 *
 *
 * ВЫЗОВ МОДУЛЯ:
 *              const determiningAvailableSwitches = require('./config/roleSwitches')
 *              let test = determiningAvailableSwitches(req.query.role)
 *
 *
 */
const switcher = [
    {
        name:'message',
        title:'сообщения',
        sidebar:false
    },
    {
        name:'alerts',
        title:'оповещения',
        sidebar:false
    },
    {
        name:'calendar',
        title:'календарь',
        sidebar:false
    }
];

/**
 * объект доступа по ролям
 * @type {{administrator: [string, string, string], technologist: [string], user: [string, string]}}
 */
const roleSwitcher = {
    'администратор':['message','alerts','calendar'],
    'пользователь':['calendar','alerts','message'],
    'технолог':['calendar','alerts','message'],
}

/**
 * Функция доступных переключателей по роли
 * @param role              - роль пользователя
 * @param AllSwitcher       - масив всех возможный переключателей
 * @param AllRoleSwitcher   - объект по доступу к переключателю в зависимости от роли
 * @returns {[]}            - массив переключателей
 */
function determiningAvailableSwitches(role) {
    let arrRoleSwitcher = [];
    if(roleSwitcher[role] !== undefined) {
        roleSwitcher[role].forEach(el=> {
            switcher.find(switcher => {
                if(switcher.name === el) arrRoleSwitcher.push(switcher)
            })
        })
    }
    return arrRoleSwitcher
}

/**
 * на выходе имеем массив объектов с доступными переключателями
 */
module.exports = determiningAvailableSwitches;