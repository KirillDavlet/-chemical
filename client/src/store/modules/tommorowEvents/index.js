const state        = {
  // Объект по актиным событиям сегодня/завтра
  tomorrowEvents: {},
};
const getters      = {
  /**
   * геттер активного сообщения
   * @param state
   * @returns {string|activeMessage|{}|*|default.computed.activeMessage}
   * @constructor
   */
  get_tomorrowEvents: state => state.tomorrowEvents,
};
const mutations    = {
  // метод записи данных по событиям сегодня/завтра
  set_tomorrowEvents: (state, data) => {
    state.tomorrowEvents = data
  },
};
const actions      = {
  // действие по записи активных событий на сегодня / завтра
  addEventsTomorrow: (state, data) => {
    state.commit('set_tomorrowEvents', data)
  },
};

export default {state, getters,mutations, actions}

