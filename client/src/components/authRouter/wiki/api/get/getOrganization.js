import api from "./../api"

export default {
  getOrganization (id,login,pass) {
    return api().get(`/${id}/wiki/organization?login=${login}&pass=${pass}`)
  }
}
