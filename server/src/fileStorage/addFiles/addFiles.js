const fs = require('fs');
const path = require('path');


//МАССИВ ДОПУСТИМЫХ ТИПОВ ФАЙЛОВ
const typeFile = [
    'image/png', //png
    'image/jpeg', //png
    'application/vnd.ms-excel', // xls excell
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //xlsx excell
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //word docx
    'application/msword', //word doc
    'application/pdf', //pdf
    'text/plain', //txt
];


/**
 * функция добавления файлов на сервер
 * @param address - адресс того, что удаляем ( полный адресс пример - )
 */
function addFile(data, url, res) {
    const limitSize = 5 * 1024 * 1024; //Лимит размера файла
    //Функция проверки на тип данных
    function typeFileResult(type) {
        return type === data.mimetype
    }
    /**
     * ПРОВЕРКА НА ТИП ФАЙЛА
     */
    if (typeFile.some(typeFileResult)) {
        /**
         * ПРОВЕРКА НА РАЗМЕР
         */
        if (data.size > limitSize) return res.send({status: false, message: 'размер файла превышает допустимый размер'})
        data.mv(`./${url}/${data.name}`, (err) => {
            if (err) return res.send({status: false,typeMessage:'error', message: 'фай лпо каким то причинам не зугрузился на сервере'})
            else {
                return res.send({
                    status: true,
                    typeMessage:'success',
                    file: {
                        title:`${data.name}`, //:TODO  решить что делать с расширением
                        fullAddress:`.${url}/${data.name}`,
                        addressParrent: url,
                        type: `.${ data.name.split('.').length >= 2 ? data.name.split('.')[data.name.split('.').length -1] : data.name.split('.')[0]}`,
                        children: [],
                        size: data.size,
                        dateOfCreation: '',

                    },
                    message: 'файл успешно загружен'})
            }
        })
    } else return res.send({status: false,typeMessage:'warning', message: 'вы пытаетесь загрузить файл с не разрешенным разрешением'})

}

module.exports = addFile;