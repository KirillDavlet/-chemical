const nodemailer = require('nodemailer');
const configMail = require('./../../config/messageMail/config');
const templateSystemMessasge = require('./../../config/messageMail/templateMessage');

async function mailAllMessage (data, send) {
    let transporter = nodemailer.createTransport(configMail.transporter);
    await transporter.sendMail({
        from: 'golimarartemisdi@gmail.com',
        to: data.users.join(' ,'),
        subject: "Системеное сообщение",
        text: `Сообщение с сайта Chimical от - ${data.info.fio_from}`,
        html: templateSystemMessasge.systemMessageInfo(data.info.theme, data.info.description)
    })
        .then(res=> {
            send.send('сообщения доставлены')
        }).
        catch(err=> {
            console.log(err)
            send.send('сообщения не доставлены')
        })

}

module.exports = mailAllMessage;