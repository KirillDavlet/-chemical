const state = {
    //свойство выпадающего списка
    dropdownMenu: {
      data: null,
      bool: false
    },
  };
const getters ={
    /**
     * геттер информации по выпадающему списку
     * @param state
     * @returns {state.dropdownMenu|{data, bool}}
     * @constructor
     */
    DROPDOWNMENU: state => {
      return state.dropdownMenu
    },
  };
const mutations ={
    //ПЕРЕКИДЫВАЕМ ДАННЫЕ В ВЫПАДАЮЩЕЕ МЕНЮ И ОТОБРАЖАЕМ ЕГО
    SET_DROPDOWNMENU: (state, data) => {
      state.dropdownMenu.data = data;
      state.dropdownMenu.bool = true
    },
    /**
     * МЕТОД ПО ОБНОВЛЕНИЮ ДАННЫХ В ВЫПАДАЮЩЕМ СПИСКЕ :TODO подвешаю изменение инфы по пользователям, но помсле нужно придкмать как инфу по всем пользователям в админитсрировании хранить правильно
     * @param state
     * @param data
     * @constructor
     */
    SET_DROPDOWNMENUREACTDATA: (state, data) => {
      state.dropdownMenu.newData = data
    },
    //мнтод закрытия выпадаюзего меню
    SET_CLOSEDROPDOWNMENU: (state) => {
      state.dropdownMenu.bool = false
    },
  };
const actions = {};

export default {state,getters,mutations,actions}
