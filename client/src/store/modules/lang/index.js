const state = {
  lang:''
};
const getters = {
  get_lang: state => {
    return state.lang
  }
};
const mutations = {
  set_lang: (state, lang) => {
    state.lang = lang
  }
};
const actions = {
  actions_lang: async (state, lang) => {
    await state.commit('set_lang', lang)
  }
};

export default { state, getters, mutations, actions}
