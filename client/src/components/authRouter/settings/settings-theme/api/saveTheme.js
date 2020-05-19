import api from './../../../../../services/api'


/**
 * модуль по сохранению темы на сервере
 */
export default {
  saveTheme (data) {
    return api().post(`/settings/theme/saveTheme`, data)
  }
}
