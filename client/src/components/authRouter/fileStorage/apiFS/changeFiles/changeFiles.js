import api from "./../api"

export default {
  changeFiles (data,id) {
    return api().post(`/${id}/fileStorage/change`,{
      nameNew:data.nameNew,
      nameStart:data.nameStart,
      url:data.url
    })
  }
}
