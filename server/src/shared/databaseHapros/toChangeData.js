/**
 * функция - шаблон запроса на изменение данных по табличным данным
 * @param id - идентификатор строки
 * @param tableName - имя таблицы
 * @param change - что меняем ( объект - ключ параметр, значение - значение)
 * @returns {string}
 */
const templateToChangeData = (id, tableName,change) => {
    let res = [];
    for(let item in change) {
        res.push(`${item} = ${change[item]}`);
    }
    return `UPDATE ${tableName} SET '${res.join(',')}' WHERE users.id = ${id}`;
};

module.exports = templateToChangeData;