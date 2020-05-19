import api from './../../../../../../services/api'

export default {
  saveEvent(data) {
    return api().post('calendar/user/newEvent', data)
  }
}
