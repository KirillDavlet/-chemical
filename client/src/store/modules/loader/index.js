const state = {
  /**
   * ДЛЯ АКТИВАЦИИ:
   * ПРИ ЗАГРУЗКЕ this.$store.commit('SET_LOADER',true)
   * ПРИ ПОЛУЧЕНИИ ДАННЫХ this.$store.commit('SET_LOADER',false)
   * ДЛЯ ОТСЛЕЖИВАНИЯ
   * LOADER() {
   *           return this.$store.getters.LOADER
   *       }
   *
   */
  loader: false,
  loaderMessage: false //флаг loaderFile"а отправки сообщения
};
const getters = {
  /**
   * получение данных по загрузчику
   * @param state - поле с которым работаем
   * @returns {*} - возвращаем состояние загрузчика
   * @constructor
   */
  LOADER: state => {
    return state.loader
  },
  /**
   * отображение загрузчика сообщений
   * @param state
   * @returns {boolean}
   */
  get_loaderMessage: state => {
    return state.loaderMessage
  }
};
const mutations = {
  SET_LOADER: (state, bool) => {
    state.loader = bool
  },
  // изменение отображение loaderа загрузчика сообщений
  set_loaderMessage: state => {
    state.loaderMessage = !state.loaderMessage
  }
};
const actions = {
  change_loaderMessage: async (state) => {
    state.commit('set_loaderMessage')
  }
};

export default {state, getters, mutations, actions}
