import api from '@/services/api';

export default {
  infoData (id) {
    return api().get(`/${id}/wiki`)
  }
}
