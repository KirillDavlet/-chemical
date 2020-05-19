import api from '@/services/api';

export default {
  authUser (body) {
    return api().post('/authorization', body)
  },
  localStorage(id) {
    return api().post('/lsAuthorization', id)
  }
}
