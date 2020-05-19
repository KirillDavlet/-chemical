import api from './../../../../services/api'

export default {
  getSettingsTheme (id,login,pass) {
    return api().get(`/${id}/settings/theme/?login=${login}&pass=${pass}`)
  }
}
