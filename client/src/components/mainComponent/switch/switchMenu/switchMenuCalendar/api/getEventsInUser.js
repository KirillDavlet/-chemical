import api from './../../../../../../services/api'

export default {
  getAllEvents(id) {
    return api().get(`getEvents/calendar?id=${id}`)
  }
}
