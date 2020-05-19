import Axios from 'axios'
const clientConfig = require('./../../../config/client/client')

const state = {
  adminData: null
  /**
   * учетные данные храняться в модуле общем ( currentPageData)
   */
};

const getters = {
  //геттер всех учётных записей в админке
  ADMINUSERS: state => {
    return state.adminData
  },
};

const mutations = {
  //сеттер всех учетных записей для админки
  SET_ADMINUSERS: (state, data) => {
    state.adminData = data
  },
  //сеетер удаления пользователя из хранилища
  SET_DELETEUSER: (state, id) => {
    state.adminData.data.forEach((el, i) => {
      if (el.id === id) {
        state.adminData.data.splice(i, 1)
      }
    })
  },
};

const actions = {
  /**
   * дествиепо добавлению всех данных по модулю админитсрирование
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  Add_AdminUser:async ( state, data) => {
    await state.commit('SET_ADMINUSERS',data)
  },
  /**
   * дейстивие по удлаению пользователя
   * @param state
   * @param id
   * @returns {Promise<void>}
   * @constructor
   */
  DELETE__USER: async (state, id) => {
    await Axios.delete(`${clientConfig.server}deleteUsers?id=${id}`)
      .then(res => {
        if (res && res.data) {
          state.commit('SET_DELETEUSER', id)
        }
      })
      .catch(err => console.log(err));
  },
  CHANGE_STATUS: async (state, id) => {
    await Axios.get(`${clientConfig.server}administration/status/change?id=${id}&status=${state.getters.get_currentPageData.data.find(el => el.id === id).status}`)
      .then(res => {
         state.dispatch('changeData', {id:id, name:'data', status: res.data.statusUser})
      })
      .catch(err => console.log(err))
  },
  /**
   * сброс всех паролей
   * @param state
   * @returns {Promise<void>}
   * @constructor
   */
  Reset_pas_user: async (state) => {
    await Axios.get(`${clientConfig.server}reset/paswword/all`)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
  },
  /**
   * генерация учтеных записей ( не рабочих, для тестов )
   * @param state
   * @param counter
   * @returns {Promise<void>}
   * @constructor
   */
  Generation_Users: async (state, counter) => {
    await Axios.get(`${clientConfig.server}generation?counter=${counter}`)
      .then(res=> {
        console.log(res.data)
      })
      .catch(err=> console.log(err))
  }
};

export default {state, getters, mutations, actions}
