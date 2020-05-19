import api from "./../api"

export default {
  getFS (id,login,pass) {
    return api().get(`/${id}/storageFile/?login=${login}&pass=${pass}`)
  }
}
