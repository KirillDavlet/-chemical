import api from '@/services/api'

export default {
  userStatus (data) {
    return api().get(`/${data.id}/administration/status=${data.status}`)
  }
}
