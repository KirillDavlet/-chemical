import api from './../../../../../../services/api'

export default {
  deleteEvent( param ) {
    return api().post('calendar/user/deleteEvents', param)
  }
}
