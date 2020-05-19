/**
 * функция вывода всех данных из таблицы
 * @param tableName - имя таблицы
 * @returns {string}
 */
const templateAllDataInTable = (tableName) => {
    return `SELECT * FROM ${tableName}`
};

module.exports = templateAllDataInTable;