const passResetTemplate = require('./../config/messageMail/templateMessage');
const nodemailer = require('nodemailer');
const configMail = require('./../config/messageMail/config');
/**
 * Алгоритм выполнения блока
 * 1   - запрос на все учетные записи
 * 2   - после по порядку изменение каждой записи
 * 2.1 - генерация нового пароля
 * 2.2 - отправка на изменение пароля в базе
 * 2.3 - оправка письма пользователю о изменении пароля
 * 3   - отправка клиенту, что все данные поменялись
 *
 */

const templateAllDataInTable = require('./../shared/databaseHapros/allAccounts'); // функция вывода всех пользователей из таблицы
const toChangeData = require('./../shared/databaseHapros/toChangeData');
const updateData = require('./../mainMethods/updateMethodsDB/updateData')


async function mailAllMessage (data) {
    let transporter = nodemailer.createTransport(configMail.transporter);
    await transporter.sendMail({
        from: 'golimarartemisdi@gmail.com',
        to: data.mail,
        subject: "Системеное сообщение",
        text: `Сообщение с сайта Chimical`,
        html: passResetTemplate.passReset(data)
    })
        .then(res=> {
            console.log(`сообщение доставлено адресату - ${data.mail}`)
        }).
        catch(err=> {
            console.log(err)
        })
}

function resetAllPasswordUsers (poll,res,db) {
    const option = () => {return {pass:genNumb()}};
    const genNumb = require('./../config/generatePassword');
    db.execute(templateAllDataInTable('users'))
        .then(res=> {
           let newPassUsers =  res[0].slice();
           newPassUsers.forEach(el => el.pass = genNumb(16));
           let changeArray = updateData(newPassUsers, 'users', 'pass');
            changeArray.forEach(el => {
                db.execute(el.template)
                    .then(res=> {
                        // отправка сообщения на почту
                        if(newPassUsers.find(elArra => elArra.id === el.id).mail) {
                            // console.log(passResetTemplate.passReset())
                            mailAllMessage(newPassUsers.find(elArra => elArra.id === el.id))
                        }
                    })
                    .catch(err => console.log(err))
            })
        })
        .catch(err=> console.log(err))
    res.send('wqe')
}


module.exports = resetAllPasswordUsers