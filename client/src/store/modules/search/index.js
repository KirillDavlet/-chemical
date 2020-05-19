import Vue from 'vue'

const state = {
  search: {
    administration: {},
    support: {}
  }
};
const getters = {
  get_search: state => {
    return state.search
  }
};
const mutations = {
  set_search: (state, data) => {
    console.log(state.search[data.name])
    Vue.set(state.search[data.name], data.title, data.text)
  }
};
const actions = {
  SET_search_administration: async (state, data) => {
    await state.commit('set_search', data)
  }
};

export default {state, getters, mutations, actions}
