
const state     = {
    /**
     * свойство отвечающее за открыто ли меню или нет
     */
    menuInfoUser: false,
    /**
     * поле всех переключателей
     * хранит в себе состояние каждого
     */
    switcherMenu: [],
  };
const getters   = {
    /**
     * геттер значения меню инфлрмации по юзеру
     * @param state
     * @returns {state.menuInfoUser|{open}}
     * @constructor
     */
    MENUINFOUSER: state => {
      return state.menuInfoUser;
    },
    /**
     * геттер всех переключателей и их свойства
     * @param state
     * @returns {[]}
     * @constructor
     */
    SWITCHERMENU: state => {
      return state.switcherMenu
    },
  };
const mutations = {
    /**
     * сеттер открытия/закрытия меню по юзеру
     * @param state
     * @param open
     * @constructor
     */
    SET_MENUINFOUSER: (state, open) => {
      state.menuInfoUser = open
    },
    /**
     * добавляю всех переключателей
     * @param state  - какое поле
     * @param block - сам переключатель
     * @constructor
     */
    SET_SWITCHERMENU: (state, block) => {
      state.switcherMenu.push(block)
    },
    /**
     * метод открытия закрытия бокового меню
     * @param state
     * @param i - номер элемента с которым работаем
     * @constructor
     */
    SET_SWITCHMENUACTIVE: (state, i) => {
      state.switcherMenu.forEach((el, it) => {
        if (i !== null) {
          if (i === it) {
            el.sidebar = !el.sidebar
          } else {
            el.sidebar = false
          }
        } else {
          el.sidebar = false
        }
      })
    },
    /**
     * метод обновления переключателей пользователя
     * @param state
     * @constructor
     */
    SET_SWITCHERMENURESSET: (state) => {
      state.switcherMenu = []
    },
  };
const actions   = {};

export default {state, getters, mutations, actions}
