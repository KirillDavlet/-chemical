/**
 * Модуль по работе с домашней страницей
 * @type {{}}
 */
import Axios from 'axios'
const server = require('../../../config/client/client').server

const state = {
  activeRole: '', // активная роль ( на будущее это роль будет как основная , так и дополнительная )
  widgetsInRole: [] // массив виджетов активный для выбраной роли
};
const getters = {
  // геттер активной роли
  get_activeRole: state => state.activeRole,
  // геттер выджетов по роли
  get_widgetsInRole: state => state.widgetsInRole
};
const mutations = {
  // сетер активной роли
  set_activeRole: (state, data) => state.activeRole = data,
  // сеттер по добалению всех виджетов по роли
  set_widgetsInRole: (state,data) => state.widgetsInRole = data
};
const actions = {
  WidgetsInRole: async (state) => {
    await Axios.get(`${server}widgets/active/role?role=администратор`)
      .then(res=> {
        state.commit('set_widgetsInRole', res.data.widgets)
      })
      .catch(err=> console.log(err))
  }
};

export default {state, getters, mutations, actions}

