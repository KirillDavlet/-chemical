import api from "./../api"

export default {
  deleteFile (data,id) {
    return api().delete(`/${id}/storageFile/delete`,{params:{url:data}})
  }
}
