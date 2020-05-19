const state = {
    infoUser: null,
  };
const getters = {
    /**
     * получение данных по юзеру
     * @param state - поле с которым работаем
     * @returns {null|any} - возвращаем данные
     * @constructor
     */
    INFOUSER: state => {
      return state.infoUser;
    },
  };
const mutations = {
    SET_INFOUSER: (state, data) => {
      state.infoUser = data;
    },
    DELETE_INFOUSER: (state, data) => {
      state.infoUser = null
    },
  };
const actions = {};

export default { state, getters, mutations, actions}
