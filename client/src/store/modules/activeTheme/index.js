import Axios from 'axios'
const state = {
    /**
     * СТИЛИ АКТИВНОЙ ТЕМЫ
     */
    activeTheme: {
      'standart': null,
      'selectedTheme': null
    },
    // массив всех доступных тем для выбора
    allTheme: [],
  };
const getters = {
    /**
     * метод нахождения актиных тем
     * @param state
     * @returns {{standart: null, selectedTheme: null}}
     */
    get_activeTheme: state => {
      let data = {
        'standart': null,
        'selectedTheme': null
      }
      state.allTheme.forEach(el => {
        if (el.type === 'standart') data.standart = el
        if (el.type === 'selectedTheme') data.selectedTheme = el
      })
      return data
    },
    /**
     * метод возврата активных тем для переключателя
     * @param state
     * @returns {state.activeTheme|{standart, selectedTheme}|default.computed.activeTheme|*|actions.activeTheme|default.props.activeTheme}
     */
    get_activeThemeSwitcher: state => {
      return state.activeTheme
    },
    // выовд всех тем доступных полбзователю
    get_allTheme: state => {
      return state.allTheme
    },
  };
const mutations = {
    // метод удаления активной темы
    deleteActiveTheme: (state, id) => {
      state.allTheme.forEach(el => {
        if (el.id === id) {
          el.type = ''
        }
      })
      state.activeTheme.selectedTheme = null // удаляю доп тему после запроса
      state.activeTheme.standart.active = true // переключаюсь на стандартную тему
    },
    /**
     * сетер на изменение актиных тем работает после получения запроса ( запись актиынх тем с сервера )
     * @param state
     * @param data
     */
    set_activeThemeSwitcher: (state, data) => {
      data.forEach(el => {
        if (el && el.type === 'standart') {
          state.activeTheme.standart = {
            nameTheme: el.nameTheme,
            mandatory: el.mandatory,
            active: true,
            id: el.id
          }
        } else if (el && el.type === 'selectedTheme') {
          state.activeTheme.selectedTheme = {
            nameTheme: el.nameTheme,
            mandatory: el.mandatory,
            active: false,
            id: el.id
          }
        }
      })
      state.commit('SET_LOADER', false)
    },
    /**
     * метод переключения активной темы
     * @param state
     */
    set_activeTopicChange: (state) => {
      if (state.activeTheme.standart && state.activeTheme.selectedTheme) {
        if (state.activeTheme.standart.active) {
          state.activeTheme.standart.active = false
          state.activeTheme.selectedTheme.active = true
        } else {
          state.activeTheme.standart.active = true
          state.activeTheme.selectedTheme.active = false
        }
      } else if (state.activeTheme.standart) {
        state.activeTheme.standart.active = true
      }

    },
    /**
     * метод изменения
     * @param state
     * @param id
     */
    changeActiveTheme: (state, id) => {
      state.allTheme.forEach(el => {
        if (el.type !== 'standart') {
          if (el.id === id) {
            el.active = true
            el.type = 'selectedTheme'
          } else {
            el.active = false
            el.type = ''
          }
        }
      })
    },
    /**
     * метод изменения дополнительной темы при получении ответа
     */
    changeInfoActiveTheme(state, data) {
      state.activeTheme.selectedTheme.nameTheme = data.nameTheme
      state.activeTheme.selectedTheme.mandatory = data.mandatory
    },
    /**
     * метод добавления новой темы
     * @param state
     * @param id
     */
    addNewActiveThemeSwitcher: (state, id) => {
      let activeFlagSelecetedTheme = state.activeTheme.selectedTheme ? state.activeTheme.selectedTheme.active : false
      state.allTheme.forEach(el => {
        if (el.id === id) {
          state.activeTheme.selectedTheme = {
            nameTheme: el.nameTheme,
            mandatory: el.mandatory,
            active: activeFlagSelecetedTheme,
            id: el.id
          }
        }
      })
    },
    // метод по записи всех тем
    set_allTheme: (state, data) => {
      state.allTheme = data
    },
    // метод добавления новой темы
    set_newTheme: (state, data) => {
      state.allTheme.push(data)
    },
    /**
     * метод удаления элемента массива из всех тем
     * @param state
     * @param data
     */
    delete_theme: (state, data) => {
      state.allTheme.forEach((el, i, arr) => {
        if (el.id === data) arr.splice(i, 1)
      })
    },
  };
const actions = {
    /////////////запрос на актиные темы
    activeTheme: async (state) => {
      state.commit('SET_LOADER', true)
      await Axios.get('http://localhost:8081/settings/theme/activeTheme')
        .then(res => {
          state.commit('set_activeThemeSwitcher', res.data)
        })
        .catch(err => {

        })
    },
    /**
     * метод удаления темы из базы и после из хранилища
     * @param state
     * @param id
     * @returns {Promise<void>}
     */
    deleteTheme: async (state, id) => {
      await Axios.get(`http://localhost:8081/settings/theme/deleteTheme?id=${id}`)
        .then(res => {
          if (res && res.status === 200) {
            state.commit('delete_theme', id)
            state.commit('deleteActiveTheme', id)
          }
        })
        .catch(err => console.log(err))
    },
    /**
     *метод сохранения новой дополнительной темы
     * @param state
     * @param id
     * @returns {Promise<void>}
     */
    saveActiveTheme: async (state, id) => {
      await Axios.get(`http://localhost:8081/settings/theme/selectedTheme?id=${id}`)
        .then(res => {
          if (res && res.status === 200) {
            state.commit('addNewActiveThemeSwitcher', id)
          }
        })
        .catch(err => console.log(err))
    },
    //запрос на удаление акьтинвой темы и вызов изменения активной темы ( елси такой элемент есть и если не стандартная тема )
    deleteActiveTheme: async (state, id) => {
      await state.getters.get_allTheme.forEach(el => {
        if (el.id === id && el.type !== 'standart') {
          Axios.get(`http://localhost:8081/settings/theme/delete/active?id=${id}`)
            .then(res => {
              if (res && res.data && res.status === 200) {
                state.commit('deleteActiveTheme', id)
              }
            })
            .catch(err => console.log(err))
        }
      })
    },
    //запрос на изменение темы ( редактирование )
    editTheme: async (state, data) => {
      await Axios.post(`http://localhost:8081/settings/theme/edit`, data)
        .then(res => {
          if (res && res.data && res.status === 200) {
            state.getters.get_allTheme.forEach(el => {
              if (el.id === data.id) {
                el.nameTheme = data.data.nameTheme
                el.mandatory = data.data.data
                state.commit('changeInfoActiveTheme', {nameTheme: data.data.nameTheme, mandatory: data.data.data})
              }
            })
          }
        })
        .catch(err => console.log(err))
    },
    // запрос на все доступные темы
    allThemeUser: async (state) => {
      await Axios.get('http://localhost:8081/settings/theme/allTheme')
        .then(res => {
          if (res && res.status === 200) {
            state.commit('set_allTheme', res.data)
          }
        })
        .catch(err => console.log(err))
    },
    /**
     * метод добавления новой темы на сервер
     * @param state
     * @param data
     * @returns {Promise<void>}
     */
    newTheme: async (state, data) => {
      await Axios.post('http://localhost:8081/settings/theme/saveTheme', data)
        .then(res => {
          if (res && res.data && res.status === 200) {
            let data = res.data[0]
            data.mandatory = JSON.parse(data.mandatory)
            state.commit('set_newTheme', data)
          }
        })
        .catch(err => console.log(err))
    },
  };

export default  {state, getters, mutations, actions}
