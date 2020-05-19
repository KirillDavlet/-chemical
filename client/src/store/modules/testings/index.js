import Axios from 'axios'

const state = {
  // массив всех ответов
  answers: [],
  // массив вопросов ( всех ) для блока создания ( настройка тестирования )
  questionSettings: [],
  // массив клиссификаторов ( для вопросов )
  classifiers: [],
  // объекто по новому вопросу
  newQuestion: {},
  // массив всех тестов
  allTest: []
};
const getters = {
  // метод возврата всех тестов
  get_questionSettings: state => {
    return state.questionSettings
  },
  // возвращаю все варианты ответов
  get_answers: state => {
    return state.answers
  },
  // возвращение классификаторов вопросов
  get_classifiers: state => {
    return state.classifiers
  },
  // возврат всех тестов
  get_allTest: state => {
    return state.allTest
  }
};
const mutations = {
  /////////////////////////////////////////////////////////////// ВОПРОСЫ
  /**
   * метод сохранения в хранилище всех вопросов с бд
   * @param state
   * @param data
   */
  init_questionSettings: (state, data) => {
    state.questionSettings = data
  },
  /**
   * метод по сохранению нового вопроса
   * @param state
   * @param data
   */
  save_question: (state, data) => {
    state.questionSettings.push(data)
  },


  /**
   * метод сохранения всех вопросов с сервера
   * @param state
   * @param data
   */
  add_answers: (state, data) => {
    state.answers = data
  },
  ///////////////////////////////////////////////CLASSIFIERS
  /**
   * метод добавления всех классификаторов по вопросам ( с бд )
   * @param state
   * @param data
   */
  add_classifiersAll: (state, data) => {
    state.classifiers = data
  },


  ////////////////////////////////////////////////// ANSWER
  /**
   *  метод удаления варианта из хранилища
   * @param state
   * @param data
   */
  delete_answer: (state, id) => {
    state.answers.forEach((el, i, arr) => {
      if (el.id === Number(id)) {
        arr.splice(i, 1);
      }
    })
  },
  /**
   * метод добавления нового ответа
   * @param state
   * @param data
   */
  add_answer: (state, data) => {
    state.answers.push(data)
  },

  //////////////////////////////////////TEST
  // метод записи всех тестов
  add_allTest: (state, data) => {
    state.allTest = data
  }

};
const actions = {
  /////////////////////////////////////////////////////// ВОПРОСЫ
  /**
   * запрос к серверук за всеми вопросами
   * в ответе приходит информаци по классификаторам вопросов, вопросы, варианты ответов
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  INIT_questionSettings: async (state, data) => {
    await Axios.get(data.url)
      .then(res => {
        state.commit('init_questionSettings', res.data.question); // добавление всех ответов
        state.commit('add_answers', res.data.answer); // добавление всех вопросов
        state.commit('add_classifiersAll', res.data.classifiersQuest); // добавление всех классификаторов вопросов
        state.commit('add_allTest', res.data.allTest); // добавление всех тестов
      })
      .catch(err => console.log(err))
  },
  /**
   * метод по запросу на сохранение нового вопроса
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  ADD_questionSettings: async (state, data) => {
    await Axios.post('http://localhost:8081/question/add', data)
      .then(res => {
        if (!res.data.status) {
          console.log('какая то ошибка , пардон')
        } else {
          state.commit('save_question', res.data.question)
        }
      })
      .catch(err => console.log(err))
  },


  //////////////////////////////// Методы работы с вариантами ответов
  /**
   * метод удаления варианта вопроса из бд :TODO нужно продумать как будет реализовано кдаление, т.к вариант ответа может использоваться во многих вопросах
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  DELETe_answer: async (state, data) => {
    await Axios.get(`http://localhost:8081/testings/answer/delete?id=${data.id}`)
      .then(res => {
        if (res.data.id) {
          state.commit('delete_answer', res.data.id)
        }
      })
      .catch(err => console.log(err))
  },
  /**
   * метод по запросу добавления нового варианта ответа
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  ADD_answer: async (state, data) => {
    //:TODO написать запрос к бд, а пока что эмитация
    await Axios.post('http://localhost:8081/testings/answer/add', data)
      .then(res => {
        state.commit('add_answer', res.data)
      })
      .catch(err => console.log(err))
  },


  ///////////////////////////////// Методы работы с классфикаторами
  /**
   * метод по созданию новой группы классификаторов
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  ADD_classifiersGroup: async (state, data) => {
    await Axios.post('http://localhost:8081/classifiers/group/add', data)
      .then(res => {
        state.commit('add_classifiersAll', res.data.classifiersGroup) // добавление всех классификаторов вопросов
      })
      .catch(err => console.log(err))
  },
  /**
   * метод по удалению группы классификаторов
   * @param state
   * @param data
   * @returns {Promise<void>}
   */
  DELETE_сlassifiersGroup: async (state, data) => {
    //:TODO при удалении группы классификаторов все которые находились внутри улетают в блок остальные
    await Axios.get(`http://localhost:8081/classifiers/delete/group?group=${data}`)
      .then(res => {
        state.commit('add_classifiersAll', res.data.classifiersGroup) // добавление всех классификаторов вопросов
      })
      .catch(err => console.log(err))
  },
  /**
   * метод по добавлению нового классификатора
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  ADD_classifiers: async (state, data) => {
    await Axios.post('http://localhost:8081/classifiers/new/', data)
      .then(res => {
        state.commit('add_classifiersAll', res.data.classifiersGroup) // добавление всех классификаторов вопросов
      })
      .catch(err => console.log(err))
  },
  /**
   * метод по удалению классификатора
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  DELETE_classifiers: async (state, data) => {
    await Axios.get(`http://localhost:8081/classifiers/delete?id=${data}`)
      .then(res => {
        state.commit('add_classifiersAll', res.data.classifiersGroup) // добавление всех классификаторов вопросов
      })
      .catch(err => console.log(err))
  },
  /**
   * метод переноса классификаторов в другую группу
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  TRANSFER_classifierInGroup: async (state, data) => {
    await Axios.post(`http://localhost:8081/classifiers/transfer`, data)
      .then(res => {
        state.commit('add_classifiersAll', res.data.classifiersGroup) // добавление всех классификаторов вопросов
      })
      .catch(err => console.log(err))
  },


  ////////////////////////////////////////// МЕТОДЫ РАБОТЫ С ТЕСТАМИ
  /**
   * метод отправки на сохранение теста и возврат всех тестов
   * @param state
   * @param data
   * @returns {Promise<void>}
   * @constructor
   */
  AddNewTest: async (state, data) => {
    await Axios.post('http://localhost:8081/testings/new/test', data).then(res => {
      state.commit('add_allTest', res.data)
    }).catch(err => console.log(err))
  }


};


export default {
  state,
  getters,
  mutations,
  actions
}
