<template>
  <div class="create-question">
    <div class="create-question__header">
      <span>Создать вопрос</span>
    </div>
    <div class="create-question__body">
      <div class="create-question__body-property el-question__body">
        <div class="el-question__body-title"
             :style="{background: flagsElForm.property ? 'lightblue' : ''}"
             @click="activeElForm('property')">
          <span>1 Общие свйоства</span>
        </div>
        <div class="el-question__body-body"
             v-if="flagsElForm.property">
          <div class="el-question__body-body-name">
            <span>Имя теста</span>
            <input type="text" v-model="nameQuestion">
          </div>
        </div>
      </div>
      <div class="create-question__body-setting el-question__body">
        <div class="el-question__body-title"
             :style="{background: flagsElForm.settings ? 'lightblue' : ''}"
             @click="activeElForm('settings')">
          <span>Настройки</span>
        </div>
        <div class="create-question__body-setting-body"
             v-if="flagsElForm.settings">
          <div class="create-question__body-setting-body-classifiers">
          <span class="modal-classifiers"
                @click="activeModalClassifiersActive()">нажать что бы выбрать классификтаоры</span>
            <div class="create-question__body-setting-body-classifiers-all modal-classifiers"
                 v-if="activeModalClassifiers">
              <div class="create-question__body-setting-body-classifiers-all__el modal-classifiers"
                   v-for="(classifier, name) in get_classifiers">
                <div class="create-question__body-setting-body-classifiers-all__el-title modal-classifiers"
                     v-if="classifier.length > 0">
                  <span class="modal-classifiers">{{ name }}</span>
                </div>
                <div class="create-question__body-setting-body-classifiers-all__el-res modal-classifiers"
                     v-for="(elClassifier, i) in classifier"
                     :key="i"
                     :style="{background: classifiers.includes(elClassifier.id) ? '#dce1fa91' : '' }"
                     @click="activeClassifiers(elClassifier.id)">
                  <span class="modal-classifiers">{{ elClassifier.name }}</span>
                </div>
              </div>
            </div>
            <div class="create-question__body-setting-body-classifiers-active"
                 v-if="classifiers.length > 0">
              <span>выбранные классификаторы</span>
              <ul>
                <li v-for="(classifier, i) in classifiers" :key="i">{{ classifier }}</li>
              </ul>
            </div>
          </div>
          <div class="create-question__body-setting-body-type">
            <select v-model="activeTypeQuestion">
              <option :value="type.type" v-for="type in typeQuestion">{{ type.name }}</option>
            </select>
          </div>
          <div class="create-question__body-setting-body-answer">
            <span>Варианты ответов</span>
            <div class="create-question__body-setting-body-answer-el"
                 v-for="(answer, i) in resultsActiveAnswer"
                 :key="i"
                 @click="addCorrectAnswer(answer.id)">
              <span>{{ answer.description }}</span>
            </div>
          </div>
          <div class="create-question__body-setting-body-correct">
            <div class="create-question__body-setting-body-correct__title">
              <span>{{ titleCorrect }}</span>
            </div>
            <div class="create-question__body-setting-body-correct_el"
                 v-for="(corr, i) in resultsCorrectAnswer"
                 :key="i">
              <span>{{ corr.description }}</span>
            </div>
          </div>
          <div class="create-question__body-setting-body-answers__search">
            <div class="create-question__body-setting-body-answers__search-title">
              <span>Вараинты ответов</span>
            </div>
            <div class="create-question__body-setting-body-answers__search-body">
              <div class="create-question__body-setting-body-answers__search-body__form">
                <span>поиск по ключевым словам</span>
                <input type="text" v-model="searchTitle">
              </div>
              <div class="create-question__body-setting-body-answers__search-body__results">
                <div class="create-question__body-setting-body-answers__search-body__results-el"
                     v-for="(answer, i) in get_answerSearch"
                     :key="i"
                     :style="{background: answersId.includes(answer.id) ? 'rgba(126, 119, 126, 0.09)' : ''}"
                     @click="addActiveAnswer(answer.id, answersId)">
                  <span>{{ answer.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="create-question__body-save">
        <selection-button :selection="['сохранить и продолжить','сохранить и перейти дальше']"
                          @saveActions="saveActionsParent"/>
      </div>
    </div>
  </div>
</template>

<script>

    import SelectionButton from "../../../mainComponent/selectionButton/selectionButton";
    export default {
        name: "createQuestion",
        components: {SelectionButton},
        data() {
            return {
                nameQuestion: '', //имя вопроса
                answersId: [],
                correctAnswer: [], // id правильного ( ых ) ответа ( ов)
                classifiers: [], // классификаторы вопроса
                activeTypeQuestion: 'single',

                // варианты типов вопроса ( 1 или нескольк овариантов ответа )
                typeQuestion: [
                    {name: 'один ответ', type: 'single'},
                    {name: 'несколкьо ответов', type: 'multiple'},
                ],
                //////////search
                searchTitle: '', //строка поиска по ключевым словам
                // объект характеристика по проверке на заполняемость вопроса
                errorSave: [
                    {
                        name: 'nameQuestion',
                        title: 'вопрос',
                        status: true
                    },
                    {
                        name: 'answersId',
                        title: 'варианты ответов',
                        status: true
                    },
                    {
                        name: 'correctAnswer',
                        title: 'правильные ответы',
                        status: true
                    },
                ],
                /////////////classifiers
                activeModalClassifiers: false,
                activeActionsSave: 'сохранить и продолжить',
                // открытость блоков найтроек вопросов
                flagsElForm: {
                    property: true,
                    settings: false
                }
            }
        },
        watch: {
            // когда менеться тип вопроса, нужно очистить правильные варианты ответа
            activeTypeQuestion() {
                this.correctAnswer = []
            },
            /**
             * лоаим изм енения открытости модалки и вешеаем/удаляем событие по клику на рабочую область
             */
            activeModalClassifiers(flag) {
                if (flag) {
                    document.addEventListener('click', this.windowEvent, false)
                } else {
                    document.removeEventListener('click', this.windowEvent, false)
                }
            }
        },
        computed: {
            //////////СТИЛИ


            /**
             * возврат всех вариантов ответов ( из бд )
             */
            get_answer() {
                return this.$store.getters.get_answers
            },
            get_answerSearch() {
                if (this.searchTitle === '') {
                    return this.get_answer
                } else {
                    return this.get_answer.filter((el) => el.description.toLowerCase().indexOf(this.searchTitle.toLowerCase()) > -1)
                }
            },
            // возврат имен добавленных ответов
            resultsActiveAnswer() {
                let nameAnswer = [];
                this.answersId.forEach(id => {
                    this.get_answer.forEach(el => {
                        return id === el.id ? nameAnswer.push(el) : ''
                    })
                })
                return nameAnswer
            },
            // возврат объектов правильных ( правильного ) отвентов ( та )
            resultsCorrectAnswer() {
                let nameAnswer = [];
                this.correctAnswer.forEach(id => {
                    this.get_answer.forEach(el => {
                        return id === el.id ? nameAnswer.push(el) : ''
                    })
                })
                return nameAnswer
            },
            // возврат имени блока по правльным ответам
            titleCorrect() {
                switch (this.activeTypeQuestion) {
                    case 'single':
                        return `правильный ответ`;
                    case 'multiple':
                        return 'правильные ответы';
                }
            },

            //////////////Классивифторы с хранилища
            get_classifiers() {
                return this.$store.getters.get_classifiers
            }
        },
        methods: {
            /**
             * метод по добавлению ответа к вопросу
             * @param id - идентификатор варианта ответа
             */
            addActiveAnswer(id, arr) {
                if (arr.length > 0) {
                    if (arr.includes(id)) {
                        arr.splice(arr.findIndex(el => el === id), 1);
                        if (arr === this.answersId && this.correctAnswer.includes(id)) {
                            this.correctAnswer.forEach((el, i, arr) => {
                                if (el === id) {
                                    arr.splice(i, 1)
                                }
                            })
                        }
                    } else {
                        arr.push(id)
                    }
                } else {
                    arr.push(id)
                }
            },
            /////////////////// МЕТОДЫ ПО ответам
            /**
             * метод по добавлению правильных ( го ) ответов ( а )
             * @param id - id  ответа
             */
            addCorrectAnswer(id) {
                switch (this.activeTypeQuestion) {
                    case 'single':
                        if (this.correctAnswer.length > 0) {
                            if (this.correctAnswer.includes(id)) {
                                this.addActiveAnswer(id, this.correctAnswer);
                            } else {
                                this.correctAnswer = [];
                                this.addActiveAnswer(id, this.correctAnswer);
                            }
                        } else {
                            this.addActiveAnswer(id, this.correctAnswer);
                        }
                        break;
                    case 'multiple':
                        this.addActiveAnswer(id, this.correctAnswer);
                        break;

                }
            },
            /**
             * метод по сохранению вопроса с проверкой на заполнемость
             */
            saveQuestion() {
                let statusSave = true;
                this.errorSave.forEach((el, i, arr) => {
                    if (this[el.name] === '' || this[el.name].length === 0) {
                        statusSave = false
                        el.status = false
                    } else {
                        el.status = true
                    }
                });
                if (statusSave) {
                    this.$store.dispatch('ADD_questionSettings', {
                        question: this.nameQuestion,
                        answersId: this.answersId,
                        typeQuestion: this.activeTypeQuestion,
                        correctAnswer: this.correctAnswer,
                        classifiers: this.classifiers
                    });
                    this.nameQuestion = '';
                    this.answersId = [];
                    this.activeTypeQuestion = 'single';
                    this.correctAnswer = [];
                    this.classifiers = [];
                    if (this.activeActionsSave === 'сохранить и перейти дальше') {
                        this.$emit('nextStep')
                    }
                }
            },

            ///////////////////////////////classifiers
            /**
             * метод переключения флага по отобюражению блока с классификаторами
             */
            activeModalClassifiersActive() {
                this.activeModalClassifiers = !this.activeModalClassifiers

            },
            /**
             * метод выюора классификатора ( классификаторов )
             * @param id
             */
            activeClassifiers(id) {
                if (this.classifiers.includes(id)) {
                    this.classifiers.splice(this.classifiers.indexOf(id), 1)
                } else {
                    this.classifiers.push(id)
                }
            },

            /////////////////// Обработка событий дочерних
            saveActionsParent(data) {
                this.activeActionsSave = data // записал что делаю
                this.saveQuestion()
            },

            ///// общие события
            windowEvent(e) {
                if (!e.target.classList.contains('modal-classifiers')) {
                    this.activeModalClassifiers = false
                }
            },

            /**
             * метод переключения активной вкладки натсроек
             * @param title
             */
            activeElForm(title) {
                for (let i in this.flagsElForm) this.flagsElForm[i] = false;
                this.flagsElForm[title] = true
            }
        }
    }
</script>

<style lang="less">
  .create-question {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &__header {
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 15px;

      > span {
        font-size: 12px;
        color: #1e1e1e;
        font-weight: 500;
      }
    }

    &__body {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .el-question__body {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;

        &-title {
          width: 100%;
          height: 42px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          &:hover {
            background: lightgray;
          }
        }

        &-body {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          padding: 15px 12px;
        }
      }


      &-setting {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        position: relative;

        &-body {
          &-classifiers {
            width: 100%;
            padding: 12px 0;
            position: relative;

            &-all {
              min-height: 50px;
              max-height: 300px;
              width: 200px;
              position: absolute;
              top: 15px;
              left: 0;
              display: flex;
              flex-direction: column;
              background: #FFFFFF;
              box-shadow: 0 3px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
              border-radius: 4px;
              overflow-y: scroll;
              overflow-x: hidden;

              &::-webkit-scrollbar {
                width: .5em;
                height: .5em;
              }

              &::-webkit-scrollbar-thumb {
                background: rgba(146, 147, 147, 0.9);
              }

              &__el {
                height: auto;
                width: 200px;
                display: flex;
                justify-content: center;
                flex-direction: column;

                > div {
                  width: 100%;
                  height: 42px;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  padding-left: 12px;
                }

                &-title {
                  border-bottom: 1px solid #70889E;

                  > span {
                    font-size: 10px;
                    color: #1E1E1E;
                  }
                }

                &-res {
                  cursor: pointer;

                  > span {
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 18px;
                    letter-spacing: 0.15px;
                    color: #1E1E1E;
                  }

                  &:hover {
                    background: rgba(74, 144, 226, 0.1);

                    > span {
                      color: #2574CF;
                    }
                  }
                }
              }
            }
          }
        }


        &-classifiers {

        }

        &-name {
          width: 100%;
          height: 35px;

          > span {
            font-size: 12px;
            color: #1e1e1e;
          }

          > input {
            border-bottom: 1px solid gray;
            outline: none;
            margin-left: 15px;
          }
        }
      }

      &-answers {
        display: flex;
        flex-wrap: nowrap;

        &__search {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;

          &-body {
            &__results {
              display: flex;
              flex-direction: column;

              &-el {
                height: 35px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

</style>
