import api from "../../../../services/api"

/*
метод отправки запроса, на получение всех сообщений пользователя
 */
export default {
  getMessage(id) {
    return api().get(`/getMessage?id=${id}`)
  }
}
