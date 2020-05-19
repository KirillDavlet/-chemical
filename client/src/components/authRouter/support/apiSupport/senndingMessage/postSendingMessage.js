import api from "./../api"

export default {
  sendingMessage(data, id) {
    return api().post(`/${id}/support/addMessage`, data)
  }
}
