const state      = {
    navMenu: {
      width: '4vw'
    },
  };
const getters    = {
    /**
     * МЕТОД ВОЗВРАТА ШИРИНЫ НАВИГАЦИОННОГО МЕНЮ
     * @param state
     * @returns {state.navMenu|{width}}
     * @constructor
     */
    NAVMENUWIDTH: state => {
      return state.navMenu
    },
  };
const mutations  = {
    SET_NAVMENUWIDTH: (state, width) => {
      state.navMenu = width
    },
  };
const actions    = {};


export default {state, getters, mutations, actions}
