import api from "./../api"

export default {
  getOpenFile (id,url) {
    return api().get(`/${id}/fileStorage/open?url=${url}`)
  }
}
