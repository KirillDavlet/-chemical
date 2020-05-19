const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

/**
 * функция удаления файлов ( папок )
 * @param address - адресс того, что удаляем ( полный адресс пример - )
 */
function deleteFile(address,res) {
    fsExtra.remove(address)
        .then(()=> {
            res.send({
                status: true,
                address: address,
                typeMessage:'info',
                message:'файл успешно удален'
            })
        })
        .catch((err)=>{
            res.send({
                status: false,
                info:err,
                address:address,
                typeMessage:'error',
                message:'произошла ошибка удаления файла, обратитесь к системному алминистратору или попробуйте позже ( после обновления страницы и сбросом кэша )'
            })
        })
}

module.exports = deleteFile;