/**
 * Модуль по запоминаню активныый фильтров ( открыт или закрыт в таблице )
 * @type {{}}
 */

const state = {
  // блок по отображению фильтров
  filterOpen: {
    administration: false,
    support: false
  },
  // блок по все записям если true , то все записи
  allRecords: {
    administration: true,
    support: true
  }

};
const getters = {
  get_filterActive: (state) => {
    return state.filterOpen
  },
  get_allRecords: (state) => {
    return state.allRecords
  },
};
const mutations = {
  set_filterActive: (state, data) => {
    state.filterOpen[data.name] = data.flag
  },
  set_allRecords: (state, data) => {
    state.allRecords[data.name] = data.flag
  },
};
const actions = {
  SET_filterActive: async (state, data) => {
    await state.commit('set_filterActive', data)
  },
  SET_allRecords: async (state, data) => {
    await state.commit('set_allRecords', data)
  }
};

export default {state, getters, mutations, actions}

