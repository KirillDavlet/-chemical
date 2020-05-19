/**
 * :TODO модуль добавления новых файлов
 */
import api from "./../api"

export default {
  addFiles (data , id) {
    return api().post(`/${id}/fileStorage/addFiles`,data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
