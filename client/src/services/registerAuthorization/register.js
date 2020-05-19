import api from '@/services/api';

export default {
  registerUser (body) {
    return api().post('/register', body)
  }
}
