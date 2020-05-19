
/**
 * функция подготовки строки запроса
 * @param data - массив объектов ( данные которые вписываем в таблицу )
 * @param DBData - имя таблицы
 * @param nameChange - поля по которым проводит изменения
 * @returns {Array} {template:'', id:''}
 */
function updateData(data, DBData, ...nameChange) {
    let resultNameChange = [];
    let templateData = [];
    nameChange.forEach(el => {
        if(data[0][el] !== undefined) resultNameChange.push(el)
    });
    data.forEach(el => {
        let elChange = `UPDATE ${DBData} SET `;
        let nameChangeArr = [];
        nameChange.forEach(name => {
            if(el[name] !== undefined) {
                nameChangeArr.push(`${name} = \'${el[name]}\'`);
            }
        });
        elChange += nameChangeArr.join(',');
        elChange += ` WHERE ${DBData}.id = ${el.id}`;
        templateData.push({template:elChange, id: el.id});
    });
    return templateData
}

module.exports = updateData;