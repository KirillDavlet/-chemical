<template>
  <div class="new-test">
    <div class="new-test__body">
      <div class="new-test__body-info">
        <div class="new-test__body-info__title"
             @click="activeBlockFlag('info')"
             :style="{background: blockFlag.info ? '#c9e1e93b' : ''}">
          <span>Информационный блок</span>
        </div>
        <transition name="bodyTest">
          <div class="new-test__body-info__body"
               v-if="blockFlag.info">
            <div class="new-test__body-info__body-name form-input">
              <span>введите название теста</span>
              <input placeholder="name test" type="text" v-model="dataNewTest.info.name">
            </div>
          </div>
        </transition>
      </div>
      <div class="new-test__body-questions">
        <div class="new-test__body-questions__title" @click="activeBlockFlag('questions')"
             :style="{background: blockFlag.questions ? '#c9e1e93b' : ''}">
          <span>Блок вопросов</span>
        </div>
        <transition name="bodyTest">
          <div class="new-test__body-questions__body" v-if="blockFlag.questions">
            <list label="выберите вопросы"
                  :data-list="get_questionSettings"
                  search
                  name-field="question"
                  :active-list-multi="dataNewTest.questions"
                  list-multi
                  @choice="choiceParentQuestion"/>
            <div class="new-test__body-questions__body-selected">
              <div class="new-test__body-questions__body-selected-title">
                <span>Выбранные вопросы</span>
              </div>
              <div class="new-test__body-questions__body-selected-body">
                <span v-if="dataNewTest.questions.length === 0"> Пока что нет выбранных вопросов</span>
                <div v-else v-for="question in dataNewTest.questions">
                  <span>{{ question['question'] }}</span>
                  <span @click="deleteQuestion(question)">--</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="new-test__body-settings">
        <div class="new-test__body-settings__title" @click="activeBlockFlag('settings')"
             :style="{background: blockFlag.settings ? '#c9e1e93b' : ''}">
          <span>Блок настроек</span>
        </div>
        <transition name="bodyTest">
          <div class="new-test__body-settings__body" v-if="blockFlag.settings">
            <div class="new-test__body-settings__body-assessment">
              <div class="new-test__body-settings__body-assessment-title">
                <span>
                  Оценивать на {{ dataNewTest.settings.assessment }}
                </span>
              </div>
              <div class="new-test__body-settings__body-assessment-body">
                <list
                  label="вариант оценивания"
                  :data-list="['проценты','на оценку','прошел/не прошел']"
                  @choice="choiceParentAssessment"
                />
              </div>
            </div>
            <div class="new-test__body-settings__body-time">
              <div class="new-test__body-settings__body-time-title">
                <span>Навремя ? ( минуты )</span><input type="checkbox" v-model="dataNewTest.settings.time.flag">
              </div>
              <div class="new-test__body-settings__body-time-body" v-if="dataNewTest.settings.time.flag">
                <input type="time" v-model="dataNewTest.settings.time.time">
              </div>
            </div>
          </div>
        </transition>
      </div>

    </div>
    <div class="create-question__body-save">
      <selection-button :selection="['сохранить и продолжить','сохранить и перейти списку тестов']"
                        @saveActions="saveActionsParent"/>
    </div>
  </div>
</template>

<script>


    import List from "../../../mainComponent/list/list";
    import SelectionButton from "../../../mainComponent/selectionButton/selectionButton";
    export default {
        name: "newTest",
        components: {SelectionButton, List},
        data() {
            return {
                dataNewTest: {
                    info: {
                        name: ''
                    },
                    questions: [],
                    settings: {
                        assessment: '',
                        // параметры времени на тест
                        time: {
                            flag: false,
                            time: 0
                        }
                    }
                },
                /// набор флагов / отображение каждого из блоков
                blockFlag: {
                    info: true,
                    questions: false,
                    settings: false
                }
            }
        },
        computed: {
            get_questionSettings() {
                return this.$store.getters.get_questionSettings.map(el => {return {question:el.question, id:el.id}})
            },
            get_answers() {
                return this.$store.getters.get_answers
            }
        },
        methods: {
            /**
             * метод обработки выбора действия
             * @param action
             */
            saveActionsParent(action) {
                const options = {
                    nameTest: this.dataNewTest.info.name,
                    settings: this.dataNewTest.settings,
                    quest: this.dataNewTest.questions.map(el=> el.id)
                };
                this.$store.dispatch('AddNewTest',options);
                switch (action) {
                    case 'сохранить и продолжить':
                        console.log('остаемся тута')
                        break;
                    case '':
                        console.log('идем дальше')
                        break;
                }
                this.dataNewTest = {
                    info: {
                        name: ''
                    },
                    questions: [],
                        settings: {
                        assessment: '',
                            // параметры времени на тест
                            time: {
                            flag: false,
                                time: 0
                        }
                    }
                }
                //:TODO записать запролс на сохранение
            },
            /**
             * метод открытия / зактиыя активных блоков
             * @param title - имя нужного блока
             */
            activeBlockFlag(title) {
                for (let i in this.blockFlag) {
                    this.blockFlag[i] = false
                }
                this.blockFlag[title] = true
            },
            // записал новый набор вопросов
            choiceParentQuestion(data) {
                this.dataNewTest.questions = data;
            },
            // записал как оцениваем
            choiceParentAssessment(data) {
                this.dataNewTest.settings.assessment = data.join('')
            },
            /**
             *  метод удаления уже выбранного вопроса
             * @param title
             */
            deleteQuestion(title) {
                this.dataNewTest.questions.forEach((el, i) => {
                    if(el === title) {
                        this.dataNewTest.questions.splice(i, 1)
                    }
                })
            }
        }
    }
</script>

<style lang="less">
  .new-test {
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
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0.02em;
        color: #1E1E1E;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      &-info, &-questions, &-settings {
        &__title {
          width: 100%;
          height: 35px;
          cursor: pointer;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-left: 12px;

          &:hover {
            background: rgba(74, 144, 226, 0.1);

            > span {
              color: #2574CF;
            }
          }

          > span {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.02em;
            color: #1E1E1E;
          }
        }

        &__body {
          padding: 5px 12px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          margin-bottom: 15px;
          min-width: 300px;

          &-selected {
            width: 100%;
            display: flex;
            flex-direction: column;

            &-title {
              width: 100%;
              height: 40px;

              > span {
                font-weight: normal;
                font-size: 12px;
                line-height: 18px;
                letter-spacing: 0.15px;
                color: #70889E;
              }
            }
          }
        }
      }

      .form-input {
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        > span {
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.15px;
          color: #70889E;
        }

        > input {
          width: 100%;
          height: 42px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border: none;
          border-bottom: 1px solid lightgray;
          outline: none;
          box-shadow: none;
          padding: 0 7px;

          &:hover, &:active, &:focus {
            outline: none;
            box-shadow: none;
          }
        }
      }
    }

    .bodyTest-enter-active, .bodyTest-leave-active {
      transition: opacity .2s;
    }

    .bodyTest-enter, .bodyTest-leave-to /* .fade-leave-active до версии 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
