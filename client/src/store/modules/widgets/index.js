import Axios from 'axios'

const state = {
  // WIDGETS
  allRoles: [], // все роли
  // объект по всем виджетам
  widgets: {
    allWidgetsInRole:[], // доступные виджеты по роли
    activeWidgetsId: []  // активные виджеты на данной роли
  }
};
const getters = {
  // WIDGETS
  /**
   * гетер всех ролей доступных
   * @param state
   * @returns {[]|[string, string, string]}
   */
  get__allRoles: state => {
    return state.allRoles
  },
  /**
   * геттер по всем данным виджетов ( активные и все для выбора )
   * @param state
   * @returns {state.widgets|{allWidgetsInRole, activeWidgets}}
   */
  get__widgets: state => state.widgets,
};
const mutations = {
  ////WIDGETS
  /**
   * сетер всех ролей
   * @param state
   * @param data
   */
  set__allRoles: (state, data) => {
    state.allRoles = data
  },
  /**
   * сеттер по дынным виджетов по роли
   * @param state
   * @param data
   */
  set__widgets: (state, data) => {
    state.widgets.activeWidgetsId = data.activeWidgetsId;
    state.widgets.allWidgetsInRole = data.allWidgetsInRole;
  }
};
const actions = {
  /**
   * метод инициализации комопнента настройки виджетов
   * @param state
   * @returns {Promise<void>}
   */
  init__widgets: async (state) => {
    await Axios.get('http://localhost:8081/widgets')
      .then(res=> {
        state.commit('set__allRoles', res.data.allRoles)
      })
      .catch(err=> console.log(err))
  },
  /**
   * метод иниицализации конструктора виджетов ( активные виджеты по роли и все виджеты )
   * @param state
   * @param data
   * @returns {Promise<void>}
   */
  init__constructorWidget: async (state, data) => {
    await Axios.get(`http://localhost:8081/widgets/role?role=${data.role}`)
      .then(res=> {
        state.commit('set__widgets',res.data)
      })
      .catch(err=> console.log(err))
  },
  /////////////////ДОБАВЛЕНИЕ УДАЛЕНИЕ АКТИВНЫХ ВИДЖЕТОВ
  add__widget: async (state, data) => {
    await Axios.post('http://localhost:8081/widgets/active/add', data)
      .then(res=> {
        // обновляю все данные по виджетам
        if(res.data.activeWidgetsId && res.data.allWidgetsInRole) {
          state.commit('set__widgets', res.data)
        }
      })
      .catch(err=> console.log(err))
  },
  /**
   * метод удаления виджетов из активных
   * @param state
   * @param data
   * @returns {Promise<void>}
   */
  delete__widgetActive: async (state, data) => {
    await Axios.get(`http://localhost:8081/widgets/active/delete?role=${data.role}&id=${data.id}`)
      .then(res=> {
        if(res.data.activeWidgetsId && res.data.allWidgetsInRole) {
          state.commit('set__widgets', res.data)
        }
      })
      .catch(err=> console.log(err))
  },
  /**
   * метод изменения размеров виджетов
   * @param state
   * @param data
   * @returns {Promise<void>}
   */
  edit__widgetActive:  async (state, data) => {
    await Axios.post(`http://localhost:8081/widgets/active/edit`, data)
      .then(res=> {
        if(res.data.activeWidgetsId && res.data.allWidgetsInRole) {
          state.commit('set__widgets', res.data)
        }
      })
      .catch(err=> console.log(err))
  },
  /**
   * метод изменения порядка виджетов
   * @param state
   * @param data
   * @returns {Promise<void>}
   */
  reordering__widgetActive: async (state, data) => {
    if(JSON.stringify(data.widgets) !== JSON.stringify(state.getters.get__widgets.activeWidgetsId)) {
        await Axios.post('http://localhost:8081/widgets/active/reordering', data)
          .then(res=> {
            if(res.data.activeWidgetsId && res.data.allWidgetsInRole) {
              state.commit('set__widgets', res.data)
            }
          })
          .catch(err=> console.log(err))
    }
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}
