import api from "./../api"

export default {
  getDataSupport(id,login,pass) {
    return api().get(`/${id}/support/?login=${login}&pass=${pass}`)
  }
}
