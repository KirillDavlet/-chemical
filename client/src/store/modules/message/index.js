import Axios from 'axios'
const configServer = require('./../../../config/client/client')

const state     = {
  alertArray: [], //массив сообщений
  /**
   * массив сообщений для юзера
   */
  messageUser: [],
};
const getters   = {
  /**
   * геттер по отображению последнего сообщения
   * @param state
   * @returns {[]}
   * @constructor
   */
  ALERTARRAY: state => {
    return state.alertArray
  },
  /**
   * Метод отображения всех ссобщений для пользоватлея
   * @param state
   * @returns {[]}
   * @constructor
   */ ///////////////////////////////////////////////////////////////////////////////:TODO НОВЫЙ ГЕТТЕР ПО НОВОМУ ПОЛЮ ВСЕ СООБЩЕНИЯ
  MESSAGEUSER: state => {
    return state.messageUser
  },
};
const mutations = {
  /**
   * сеттер по добавлению нового системного сообщения
   * @param state
   * @param data
   * @constructor
   */
  SET_ALERTARRAY: (state, data) => {
    state.alertArray.push(data)
  },
    /**
     * метод добавления всех сообщений для пользователя
     * @param state
     * @param arr
     * @constructor
     */ //////////////////////////////////////////////////////////////////////////////////:TODO новый метод
    SET_MESSAGEUSERALL: (state, arr) => {
    state.messageUser = arr
  },
    SET__CHANGEMESSAGE: (state, id) => {
    state.messageUser.forEach(el => {
      if (el.id === id) el.status = 1
    })
  },
};
const actions   = {
  /**
   * функйия отправки флага, что сообщение прочитано
   * @param state
   * @param id - идентификатор сообщения
   * @returns {Promise<void>}
   * @constructor
   */
  CHANGE__STATUSMESSAGE: async (state, id) => {
    const { resolve } = await Axios.get(`http://localhost:8081/statusMessage?id=${id}`);
    state.commit('SET__CHANGEMESSAGE', id)
  },
  /**
   * функция отправки письма (внутри системы и н почту)
   * @param state
   * @param data - тело формы имеет массив id пользователей(ля), тему, тело сообщения и куда отправлять внутри системы или на почту
   * @returns {Promise<void>}
   * @constructor
   */
  Sending_letter: async (state, data) => {
    state.dispatch('change_loaderMessage');
    await Axios.post(`${configServer.server}message/new`, data)
      .then(res=> {
        if(res && res.data ) {
          setTimeout(() => {
            state.dispatch('change_loaderMessage')
          }, 3000)
        }
      })
      .catch(err=> console.log(err))
  }

};

export default {state, getters, mutations, actions}


