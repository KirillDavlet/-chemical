const state      = {
  noAuthorization: null,
};
const getters    = {
  /**
   * ГЕТТЕР ПО ИНФОРМАЦИИ ЕСЛИ НЕ АВТОРИЗОВАННЫЙ ПОЛЬЗОВАТЕЛЬ
   * @param state
   * @returns {null}
   * @constructor
   */
  NOAUTHORIAZATION: state => {
    return state.noAuthorization
  },
};
const mutations  = {
  /**
   * СЕТТЕР ПО ИНФОРМЦИИ НЕАВТОРИЗОВАННОГО ПОЛЬЗОВАТЕЛЯ
   * @param state
   * @param data
   * @constructor
   */
  SET_NOAUTHORIZATION: (state, data) => {
    state.noAuthorization = data
  },
};
const actions    = {};

export default {state, getters,mutations, actions}
