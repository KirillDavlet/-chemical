import api from './../../../../../../services/api'

export default {
  doneEvent( param ) {
    return api().post('calendar/user/doneEvent', param)
  }
}
