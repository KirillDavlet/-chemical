<template>
  <div id="colorScheme">
    <div class="color-scheme">
      <div class="color-scheme__title">
        <span>Настройка тем</span>
      </div>
      <div class="color-scheme__navigation">
        <div @click="blockSelection" data-type="all" :class="{'active-navigation' : allColorSchemeFlag}">
          <span>Все схемы</span>
        </div>
        <div @click="blockSelection" data-type="new" :class="{'active-navigation' : newColorSchemeSettingsFlag}">
          <span>Создать новую</span>
        </div>
        <div @click="blockSelection" data-type="edit"
             :class="{'active-navigation' : editColorSchemeFlag, 'navigation-disabled' : activeThemeEdit === null}">
          <span>Редактировать</span>
        </div>
      </div>
      <div class="color-scheme__body">
        <transition name="slide-fade">
          <new-color-scheme-settings
            v-if="newColorSchemeSettingsFlag"
            @goAllTheme="goAllThemeParent"
          />
          <all-color-scheme
            v-if="allColorSchemeFlag"
            :available-theme="alLThemeInServer"
            :active-theme="activeTheme"
            :active-theme-edit="activeThemeEdit && activeThemeEdit.id ? activeThemeEdit.id : null"
            @deleteActiveTheme="deleteActiveThemeParent"
            @topicSelection="topicSelectionParent"
          />
          <edit-color-sheme
            v-if="editColorSchemeFlag"
            :data-theme="activeThemeEdit"
            @editTheme="editThemeParent"
          />
        </transition>
      </div>
    </div>
    <div class="form-save"
         v-if="allColorSchemeFlag"
    >
      <div
        @click="formSave"
        class="form-save__add"
        data-type="add">
        <span>Сохранить</span>
      </div>
    </div>
  </div>
</template>

<script>
    import getSettingsTheme from "../api/getSettingsTheme";


    import AllColorScheme from "./allColorSheme/allColorScheme";
    import NewColorSchemeSettings from "./newColorShemeSettings/newColorSchemeSettings";
    import EditColorSheme from "./editColorSheme/editColorSheme";


    /**
     * Комопнент по настройке и сохранению новой цветовой схемы
     * :TODO дописать запрос к бд за активными темами
     * :TODO дописать запрос к бд за всеми темами
     * :TODO дописать запрос к бд для сохранения новой темы
     * :TODO дописать запрос к бд для сохранения активных тем
     *
     *
     */
    export default {
        name: "colorScheme",
        components: {EditColorSheme, NewColorSchemeSettings, AllColorScheme},
        data() {
            return {
                newColorSchemeSettingsFlag: false, //флаг отвечает за отображение блока по созданию новой цветовой схемы
                allColorSchemeFlag: false, //флаг отвечающий за отображение всех цветовых схем
                editColorSchemeFlag: false, //флаг отвечающий за отображение редактирования цветовых схем
                //////////////////////////////////:TODO пока что в таком виде тестовые темы
                //объект активных тем состоит из default"ной темы ( стандартная и выбранной пользователем )
                modifiedActiveTheme: {}, // будущий вид активной темы ( меняться не будет и по нему скидываю )
                activeThemeEdit: null, // выбранная тема для редактирования
            }
        },
        watch: {

        },
        computed: {
            /**
             * свойство по возврату доступных тем
             */
            alLThemeInServer() {
                return this.$store.getters.get_allTheme
            },
            /**
             * свойство нахождения актиных тем
             */
            activeTheme() {
                return this.$store.getters.get_activeTheme
            }
        },
        methods: {
            async getData() {
                const res = await getSettingsTheme.getSettingsTheme(
                    this.$store.getters.INFOUSER.id,
                    this.$store.getters.INFOUSER.userInfo.login,
                    this.$store.getters.INFOUSER.userInfo.pass,
                )
                if (res.status !== 200) console.log('ошибка')
                if (res.data && res.data.status) {
                    this.$store.commit('SET_ALERTARRAY', {
                        message: res.data.message,
                        type: res.data.typeMessage
                    })
                } else {
                    this.$router.push(`/:${this.$store.getters.INFOUSER.id}`)
                }
            },
            /**
             * метод инициализации компонента
             * определяет как блок активный
             * @param active - активный блок ( по default все схемы )
             */
            initComp(active = 'allColorSchemeFlag') {
                this.modifiedActiveTheme = Object.assign({}, this.activeTheme)
                this[active] = true
            },

            /************ МЕТОДЫ ВЫБОРА СТРАНИЦЫ ПО СХЕМАМ ****************/
            blockSelection(e) {
                switch (e.currentTarget.dataset.type) {
                    case 'all':
                        this.allColorSchemeFlag = true;
                        this.newColorSchemeSettingsFlag = false;
                        this.editColorSchemeFlag = false;
                        break;
                    case 'new':
                        this.allColorSchemeFlag = false;
                        this.editColorSchemeFlag = false;
                        this.newColorSchemeSettingsFlag = true;
                        break;

                    case 'edit':
                        if (this.activeThemeEdit === null) {
                            alert('извините , но тема не выбрана')
                        } else {
                            this.allColorSchemeFlag = false;
                            this.editColorSchemeFlag = true;
                            this.newColorSchemeSettingsFlag = false;
                        }
                        break;
                }
            },
            /**
             * метод удаления темы из активных
             * так же удалить из выбранных
             * @param data
             */
            deleteActiveThemeParent(data) {
                for (let activeTheme in this.activeTheme) {
                    if (this.activeTheme[activeTheme]) {
                        if (this.activeTheme[activeTheme].nameTheme === data) {
                            this.activeTheme[activeTheme] = null;
                            this.TestTheme.forEach(el => {
                                el.nameTheme === data ? el.active = false : ''
                            })  // уюираю активацию выбранной темы, после удаления из активных
                            break
                        }
                    }
                }
            },

            /**
             * ловим название выбранной темы и вызываю геттер по всем темам, то бы найти эту тему
             */
            topicSelectionParent(id) {
                this.activeThemeEdit = null
                this.activeThemeEdit = this.$store.getters.get_allTheme.find(el => el.id === id)
            },

            // переход после создания темы, на главную по темам
            goAllThemeParent() {
                this.newColorSchemeSettingsFlag = false;
                this.allColorSchemeFlag = true;
                this.editColorSchemeFlag = false
            },

            ///////////////////////////////////////////
            /**
             * метод обработки нажатия на кнопочки :)
             * @param e
             */
            formSave(e) {
                switch (e.currentTarget.dataset.type) {
                    case 'add':
                        if (this.activeTheme.selectedTheme) {
                            this.formSaveServer(this.activeTheme.selectedTheme.id)
                        }
                        break;
                }
            },

            /**
             * метод сохранения активных тем
             * @param id - идентификатор новой доп активной темы
             * отправляеться в хранилище, там работаю с сервером
             */
            formSaveServer(id) {
                this.$store.dispatch('saveActiveTheme', id)
            },

            /**
             * метод вызова действия из хранилища по загрузке всех дат
             */
            getAllTheme() {
                this.$store.dispatch('allThemeUser')
            },

            /**
             * метод возарата на все темы, после изменения
             */
            editThemeParent() {
                this.newColorSchemeSettingsFlag = false;
                this.allColorSchemeFlag = true;
                this.editColorSchemeFlag = false;
                this.activeThemeEdit = null;
            }
        },
        mounted() {
            this.getData();
            this.initComp();
            this.getAllTheme()
        }
    }
</script>

<style lang="less">
  #colorScheme {
    width: 100%;
    height: 100%;
    margin-top: 45px;
    font-family: Roboto, sans-serif;

    .color-scheme {
      width: 100%;
      height: auto;
      padding: 10px;

      &__title {
        width: 100%;
        height: auto;
        padding: 7px 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        > span {
          font-style: normal;
          font-weight: 300;
          font-size: 34px;
          line-height: 32px;
          letter-spacing: 0.02em;
          color: #2A2A2A;
        }
      }

      &__navigation {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 15px;

        > div {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 125px;
          margin-right: 15px;
          min-height: 25px;
          cursor: pointer;
        }

        .active-navigation {
          position: relative;

          > span {
            font-weight: bold;
          }

          &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 100%;
            height: 3px;
            background: rgba(62, 100, 218, 0.76);
          }
        }
      }
    }

    .form-save {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 25px;
      padding: 0 25px;

      > div {
        width: 126px;
        height: 36px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        > span {
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.02em;
        }

        &:hover {
          box-shadow: 0 0 2px lightgray;
        }
      }

      &__add {
        background: #FF9800;
        margin-right: 32px;

        > span {
          color: #FFFFFF;
        }
      }

      &__cancel {
        background: #E6E6E6;

        > span {
          color: #1E1E1E;
        }
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  // не актиная кнопка
  .navigation-disabled {
    opacity: .4;
    cursor: default;
    position: relative;

    &:after {
      content: '';
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .1);
      position: absolute;
    }
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
