/**
 * Данный модуль позволяет в 1 месте хранить все полученные данные при каждой загрузке страницы
 * @type {{}}
 */
const state = {
  currentPageData: null
};
const getters ={
  get_currentPageData: state => {
    return state.currentPageData
  }
};
const mutations ={
  set_currentPageData: (state, data) => {
    state.currentPageData = data
  },
  //;TODO дописать грамотное изменение данных ( менятся может , а не захардкорено el.status и тд)
  change_el: (state, data) => {
      if(data.name) {
        state.currentPageData[data.name].find(el => {
          el.id === data.id ? el.status = data.status : null
        })
      } else {
        state.currentPageData.find(el => {
          el.id === data.id ? el.status = data.status : null
        })
      }
  }
};
const actions = {
  NewCurrentPageData: async (state, data) => {
    await state.commit('set_currentPageData', data)
  },
  changeData: async (state, data) => {
    console.log()
   await state.commit('change_el', data)
  }
};

export default {state,getters,mutations,actions}
