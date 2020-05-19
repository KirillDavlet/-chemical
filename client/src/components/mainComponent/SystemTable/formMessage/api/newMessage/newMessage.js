import api from './../api'

/**
 * СЕРВЕРНЫЙ КОД
 *
 */
/**
 * модуль отправки сообщения
 * ЧТО НУЖНО:
 *           - Кому отпраляеться - recipient
 *           - что отправляем - info
 *           - от кого отправляем - from
 *
 *
 *  ОБРАБОТКА НА СЕРВЕРЕ
         app.post('/addMessage', function(req,res) {
         console.log(req.body)
         res.send({status:true, message:'сообщение отправлено',typeMessage:'success'})
     })
 *
 *     ЗАПРОС К БД INSERT INTO `message` (`id`, `id_from`, `fio_from`, `id_recipient`, `theme`, `description`, `status`) VALUES (NULL, '82', 'Давлетшин Кирилл Анасович', '107', 'ответ на сообщение 4584', 'мы делаем все что в наших силах', '0');
 *
 *
 */
export default {
  addMessage (data) {
    return api().post('/addMessage',{from:data.from,recipient_id: data.recipient_id, info: data.info })
  }
}
