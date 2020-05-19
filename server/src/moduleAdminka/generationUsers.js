const generationPass = require('./../config/generatePassword')

/**
 * функция генерации учетных записей ( для тестов )
 * @param poll
 * @param res
 * @param count
 */
function generationUsers(poll, res, count) {
    if (count > 50) {
        res.send({message: 'ты что, с дубу рухнул куда столько?', status: false, typeMessage: 'info'})
    } else {
        // `users` (`id`, `login`, `pass`, `mail`, `status`) VALUES (NULL, '123123', '123123', 'qweqwe', '1');
        let arrUsers = [];
        // ;TODO нужно написать так, что бы не повторялись, что бы не сломать нихрена, хотя с другой сторону , данный функционал не должен использоваться с рабочей базой
        // :TODO нужо 2 запроса на создание пользователя (  таблицы связанных )
        for(let i =0; i < count; i++) {
            arrUsers.push({
                id:'',
                login:'',
                pass:generationPass(12),
                mail:'',
                status:''
            })
        }
        res.send({message:`нужно сгенерировать ${count} записей`, genData: arrUsers})
    }

}

module.exports = generationUsers;