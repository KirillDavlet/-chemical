import api from '@/services/api';

export default {
  dataAdminka (id,login,pass) {
    return api().get(`/${id}/administration/?login=${login}&pass=${pass}`)
  }
}
