import api from './../../../../../../services/api'

export default {
  changeReminder( param ) {
    return api().post('calendar/user/changeEvent', param)
  }
}
