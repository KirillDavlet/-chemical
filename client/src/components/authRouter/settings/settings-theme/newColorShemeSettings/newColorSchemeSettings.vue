<template>
  <div id="newColorSchemeSettings">
    <div class="working-area-output">
      <div class="working-area-output__header" :style="{background: mandatory.mainBackground.background}">
        <span :style="{color: mandatory.mainBackground.color}">Заголовок</span>
      </div>
      <div class="working-area-output__body">
        <div class="working-area-output__body-sidebar"
             :style="{background: mandatory.navigationBackground.background}">
          <span v-for="i in [1,2,3]"
                :style="{color: mandatory.navigationBackground.color}">Пункт меню {{ i }}</span>
        </div>
        <div class="working-area-output__body-table"
             :style="{background: mandatory.workspaceBackground.backgroundAll}">
          <div class="working-area-output__body-table-header"
               :style="{background: mandatory.mainBackground.background}">
            <span :style="{color: mandatory.mainBackground.color}">шапка таблицы</span>
          </div>
          <div class="working-area-output__body-table-body">
            <div
              v-for="i in [1,2,3,4,5]"
              class="working-area-output__body-table-body-row"
              :style="{background: mandatory.workspaceBackground.background}"
            >
              <span :style="{color: mandatory.workspaceBackground.color}">Строка {{ i }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="working-area-output__footer" :style="{background: mandatory.secondaryBackground.background}">
        <span :style="{color: mandatory.secondaryBackground.color}">Подвал</span>
      </div>
    </div>
    <div class="working-area-settings">
      <div class="working-area-settings__workspace">
        <div><span>цвет рабочей области ( контент )</span></div>
        <input v-model="mandatory.workspaceBackground.background" type="color">
      </div>
      <div class="working-area-settings__workspace-color">
        <div><span>цвет рабочей области ( текст )</span></div>
        <input v-model="mandatory.workspaceBackground.color" type="color">
      </div>
      <div class="working-area-settings__workspace-background-all">
        <div><span>цвет рабочей области ( окружение )</span></div>
        <input v-model="mandatory.workspaceBackground.backgroundAll" type="color">
      </div>
      <div class="working-area-settings__main">
        <div><span>основной цвет навигационных элементов</span></div>
        <input v-model="mandatory.mainBackground.background" type="color">
      </div>
      <div class="working-area-settings__workspace-color">
        <div><span>основной цвет навигационных элементов ( текст )</span></div>
        <input v-model="mandatory.mainBackground.color" type="color">
      </div>
      <div class="working-area-settings__workspace">
        <div><span>Второстпенный цвет</span></div>
        <input v-model="mandatory.secondaryBackground.background" type="color">
      </div>
      <div class="working-area-settings__workspace-color">
        <div><span>Второстпенный цвет ( текст )</span></div>
        <input v-model="mandatory.secondaryBackground.color" type="color">
      </div>
      <div class="working-area-settings__navigationBackground">
        <div><span>Цвет sidebar'ов</span></div>
        <input v-model="mandatory.navigationBackground.background" type="color">
      </div>
      <div class="working-area-settings__navigationBackground">
        <div><span>Цвет sidebar'ов ( цвет текста ) </span></div>
        <input v-model="mandatory.navigationBackground.color" type="color">
      </div>
      <div class="working-area-settings__save">
        <input
          type="text"
          placeholder="название цветовой схемы"
          v-model="nameTheme"
          ref="settingsThemeName"
        >
        <div class="working-area-settings__save-button" @click="saveTheme"><span>Сохранить</span></div>
      </div>
    </div>
  </div>
</template>

<script>
    ///////////////////////api

    import saveTheme from './../api/saveTheme'

    export default {
        /**
         *  компонент по настройке новой цветовой схемы
         */
        name: "newColorSchemeSettings",
        props: {
            mandatoryParent: {type: Object, default: ()=> {}},
            nameThemeParent: {type: String, default: ''}
        },
        data() {
            return {
                mandatory: {
                    workspaceBackground: {
                        background: '#FFFFFF', //цвет контента рабочей области
                        color: '#1e1e1e',
                        backgroundAll: '#e2e2e2' //цвет рабочей области не занятой контентом
                    }, // основной цвет рабочей области ( тело страницы, строки в таблицах и .т.д ) ОБЯЗАТЕЛЬНОЕ ПОЛЕ ДЛЯ СОХРАНЕНИЯ
                    mainBackground: {
                        background: '#2574CF',
                        color: '#FFFFFF'
                    }, // основной контрастный цвет ( шапка, шапка таблицы и т.д)
                    secondaryBackground: {
                        background: '#4F4F4F',
                        color: '#FFFFFF'
                    }, //второстепенный цвет ( футтер )
                    navigationBackground: {
                        background: '#F5F5F5',
                        color: '#000000'
                    } //цвет навигационного меню ( боковые меню )
                },
                nameTheme: '' //название цветовой схемы
            }
        },
        methods: {
            /**
             * метод сохранения новой темы
             * Возможность делать общию или частную
             */
           saveTheme() {
                if (this.nameTheme === '') {
                    this.$refs.settingsThemeName.classList.add('errorForm')
                } else {
                    this.$refs.settingsThemeName.classList.remove('errorForm');
                    this.$store.dispatch('newTheme', {name:this.nameTheme, data:this.mandatory})
                    this.$emit('goAllTheme')
                }
            }
        }
    }
</script>

<style lang="less">
  #newColorSchemeSettings {
    width: 100%;
    height: 100%;
    display: flex;

    > div {
      width: 50%;
    }

    .working-area-output {
      width: 50%;
      display: flex;
      flex-direction: column;

      &__header {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        > span {
          padding: 0 12px;
        }
      }

      &__body {
        width: 100%;
        height: 100%;
        display: flex;

        &-sidebar {
          width: 30%;
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;

          > span {
            padding: 0 10px;
            margin-bottom: 15px;
          }
        }

        &-table {
          width: 70%;
          height: 100%;
          padding: 5%;
          display: flex;
          flex-direction: column;

          &-header {
            display: flex;
            align-items: center;
            height: 35px;

            > span {
              padding: 0 12px;
            }
          }

          &-body {
            border: 1px solid lightgray;

            &-row {
              display: flex;
              align-items: center;
              min-height: 25px;
              border-bottom: 1px solid gray;

              > span {
                padding: 0 7px;
              }
            }
          }
        }
      }

      &__footer {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .working-area-settings {
      display: flex;
      flex-direction: column;

      > div:not(.working-area-settings__save) {
        width: 70%;
        display: flex;
        justify-content: flex-end;

        > div {
          width: 70%;
        }

        > input {
          width: 5%;
          margin-left: 5%;
          border: none;
          border-radius: 50%;

        }
      }

      &__save {
        width: 70%;
        height: 35px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 30px 15%;

        &-button {
          width: auto;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #FF9800;
          border-radius: 4px;
          cursor: pointer;

          > span {
            padding: 0 15px;
            color: #ffffff;
          }
        }

        > input {
          padding: 5px;
          background: #ffffff;
          border: 1px solid #b3b1bb;
          margin-right: 25px;
        }
      }
    }

  }

  .errorForm {
    border: 1px solid #ff6657 !important;
  }
</style>
