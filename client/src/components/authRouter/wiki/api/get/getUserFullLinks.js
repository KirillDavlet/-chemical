import api from "./../api"

export default {
  getUserFullLinks (id,login,pass) {
    return api().get(`/${id}/wiki/usefulLinks?login=${login}&pass=${pass}`)
  }
}
