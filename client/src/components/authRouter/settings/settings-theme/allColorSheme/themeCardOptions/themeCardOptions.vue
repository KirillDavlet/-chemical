<template>
  <div id="themeCardOptions"
       v-if="dataCardTheme"
       @click="topicSelection"
  >
    <div class="theme-card" :class="{'active-edit': dataCardTheme.id === activeThemeEdit}">
      <div
        v-if="choice && dataCardTheme.type !=='standart'"
        class="theme-card__activate">
        <div
          :style="{border: dataCardTheme.active ? '2px solid #2574CF' : '2px solid #DADADA'}"
          class="theme-card__activate-check" @click="themeActive"
          :class="dataCardTheme.active ? 'active-theme' : ''"></div>
      </div>
      <div class="theme-card__view" :style="{width: !choice ? '160px !important' : ''}">
        <div class="theme-card__view-title">
          <span>{{ dataCardTheme.nameTheme }}</span>
          <span
            v-if="choice && dataCardTheme.type !== 'standart'"
            @click="deleteTheme">-</span>
        </div>
        <div class="theme-card__view-display">
          <div class="theme-card__view-display-header"
               :style="{background: dataCardTheme.mandatory.mainBackground.background}">
            <div class="theme-card__view-display-header__el">
              <div :style="{background: dataCardTheme.mandatory.mainBackground.color}"></div>
              <div :style="{background: dataCardTheme.mandatory.mainBackground.color}"></div>
              <div :style="{background: dataCardTheme.mandatory.mainBackground.color}"></div>
            </div>
          </div>
          <div class="theme-card__view-display-body"
               :style="{background: dataCardTheme.mandatory.workspaceBackground.background}">
            <div class="theme-card__view-display-body__navigation"
                 :style="{background: dataCardTheme.mandatory.navigationBackground.background}">
              <div :style="{background: dataCardTheme.mandatory.navigationBackground.color}"></div>
              <div :style="{background: dataCardTheme.mandatory.navigationBackground.color}"></div>
              <div :style="{background: dataCardTheme.mandatory.navigationBackground.color}"></div>
              <div :style="{background: dataCardTheme.mandatory.navigationBackground.color}"></div>
              <div :style="{background: dataCardTheme.mandatory.navigationBackground.color}"></div>
            </div>
            <div class="theme-card__view-display-body__info"
                 :style="{background: dataCardTheme.mandatory.workspaceBackground.backgroundAll}">
              <div :style="{background: dataCardTheme.mandatory.workspaceBackground.background}">
                <div :style="{background: dataCardTheme.mandatory.workspaceBackground.color}"></div>
              </div>
              <div :style="{background: dataCardTheme.mandatory.workspaceBackground.background}">
                <div :style="{background: dataCardTheme.mandatory.workspaceBackground.color}"></div>
              </div>
              <div :style="{background: dataCardTheme.mandatory.workspaceBackground.background}">
                <div :style="{background: dataCardTheme.mandatory.workspaceBackground.color}"></div>
              </div>
            </div>
            <div class="theme-card__view-display-body__saidbar"
                 :style="{background: dataCardTheme.mandatory.navigationBackground.background}"></div>
          </div>
          <div class="theme-card__view-display-footer"
               :style="{background: dataCardTheme.mandatory.secondaryBackground.background}">
            <div :style="{background: dataCardTheme.mandatory.secondaryBackground.color}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="delete-active-theme"
         v-if="!choice && dataCardTheme.type !== 'standart'"
         @click="deleteActiveTheme">
      <span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.3 2.1C13.6866 1.7134 13.6866 1.0866 13.3 0.7C12.9134 0.313401 12.2866 0.313401 11.9 0.7L7 5.6L2.1 0.7C1.7134 0.3134 1.0866 0.313401 0.7 0.7C0.313401 1.0866 0.313401 1.7134 0.7 2.1L5.6 7L0.7 11.9C0.3134 12.2866 0.313401 12.9134 0.7 13.3C1.0866 13.6866 1.7134 13.6866 2.1 13.3L7 8.4L11.9 13.3C12.2866 13.6866 12.9134 13.6866 13.3 13.3C13.6866 12.9134 13.6866 12.2866 13.3 11.9L8.4 7L13.3 2.1Z"
              fill="#C4C4C4"/>
      </svg>
      </span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "themeCardOptions",
        props: {
            dataCardTheme: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            // идентификатор активной темы
            activeThemeEdit: {type: Number, default: null},
            // флаг отвечяающий за возможность отображать поле выбора темы
            choice: {type: Boolean, default: true},
        },
        methods: {
            /**
             * Метод имзенения активной темы - работает с хранилищем
             */
            themeActive() {
                this.$store.commit('changeActiveTheme', this.dataCardTheme.id)
            },
            /**
             * метод удаления активной темы
             */
            deleteActiveTheme() {
                this.$store.dispatch('deleteActiveTheme', this.dataCardTheme.id)
            },
            /**
             * метод выбора темы
             */
            topicSelection() {
                this.$emit('topicSelection', this.dataCardTheme.id)
            },

            /**
             * метод удаления темы из БД
             */
            deleteTheme() {
                let deleteTheme = confirm("вы действительно хотите удать выбранную тему")
                if (deleteTheme) this.$store.dispatch('deleteTheme', this.dataCardTheme.id)

            }
        }
    }
</script>

<style lang="less">
  #themeCardOptions {
    width: 160px;
    height: auto;
    display: flex;
    margin-right: 38px;
    position: relative;

    .theme-card {
      width: 100%;
      height: 100%;
      display: flex;

      &__activate {
        width: 20px;
        margin-right: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        &-check {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .active-theme:after {
          content: '';
          width: 7px;
          height: 7px;
          background: #2574CF;
          border-radius: 50%;
        }
      }

      &__view {
        width: 128px;
        height: 100%;
        display: flex;
        flex-direction: column;

        &-title {
          width: 100%;
          height: 21px;
          margin-bottom: 6px;

          > span {
            font-weight: normal;
            font-size: 14px;
            line-height: 21px;
            letter-spacing: 0.02em;
            color: #70889E;
          }
        }

        &-display {
          width: 100%;
          height: auto;

          &-header {
            width: 100%;
            height: 19px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            &__el {
              margin-left: 5px;
              width: 10%;

              > div {
                width: 100%;
                height: 1px;
              }

              > div:not(:last-child) {
                margin-bottom: 2px;
              }
            }
          }

          &-body {
            width: 100%;
            height: 52px;
            display: flex;

            &__navigation {
              width: 23%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              > div {
                width: 80%;
                height: 1px;
              }

              > div:not(:last-child) {
                margin-bottom: 4px;
              }
            }

            &__info {
              width: 54%;
              height: 100%;
              padding: 2px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;

              > div {
                height: 12px;
                width: 80%;
                display: flex;
                justify-content: center;
                align-items: center;

                > div {
                  width: 50%;
                  height: 1px;
                }
              }
            }

            &__saidbar {
              width: 23%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;

            }

          }

          &-footer {
            width: 100%;
            height: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            > div {
              width: 70%;
              height: 1px;
            }
          }
        }
      }
    }

    .delete-active-theme {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 200;
      cursor: pointer;
    }

    .active-edit {
      background: rgba(107, 108, 103, 0.25);
    }

  }

</style>
