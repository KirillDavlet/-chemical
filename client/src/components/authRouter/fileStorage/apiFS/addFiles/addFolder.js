import api from "./../api"

export default {
  addFolder (name, url) {
    return api().post('/fileStorage/addFolder',{
      name:name,
      url:url
    })
  }
}
