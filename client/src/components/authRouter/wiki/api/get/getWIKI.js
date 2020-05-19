import api from "./../api"

export default {
  getWIKI (id,role) {
    return api().get(`/${id}/wiki?role=${role}`)
  }
}
