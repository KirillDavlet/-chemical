<template>
  <transition name="modalCardStorage">
    <div
      :style="{
        left: `${position.x +15 + widthEl < bodyWidth ? position.x +15 : position.x - 15 - widthEl}px`,
        top: `${position.y}px`
      }"
      id="modalFileStorage"
      @mousedown.right="disableContextMenu">
      <div
        class="modal-file-storage__option"
        v-for="item in dataFunctionalModal"
        :data-func="item.func"
        @click="optionModalFS"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        /**
         * КОМПОНЕНТ МОДАЛЬНОГО ОКНА ПРИ КЛИКЕ ПРАВОЙ КНОПКИ НА ФАЙЛЫ
         * @param props:
         *                - position                 - координаты вызова модалки ( Object )
         *                - fileLink                 - полная ссылка на файл ( String )
         *                - dataFunctionalModal      - функционал в модальном окне ( Array )
         *
         * @param data:
         *                - widthEl                  - размер модалки ( Number )
         *                - bodyWidth                - размер body ( Number )
         *
         *
         */
        name: "modalFileStorage",
        props: {
            position: {
                type: Object,
                default: function () {
                    return {
                        position: {top: 0, left: 0}
                    }
                }
            },
            fileLink: {
                type: String,
                default: ``
            },
            dataFunctionalModal: {
                type: Array,
                default: ()=> {
                    return  [
                        {name: 'удалить', func: 'delete'},
                        {name: 'свойства', func: 'properties'},
                    ]
                }
            }
        },
        data() {
            return {
                widthEl: null,
                bodyWidth: null,

            }
        },
        methods: {
            /**
             * метод отключения контекстного меню
             */
            disableContextMenu() {
                this.$el.oncontextmenu = function () {
                    return false
                }
            },
            /**
             * функция выбора действия по модальному окну
             * и отправка родителю информации по карте и что делать
             */
            optionModalFS($event) {
                this.$emit('optionModalFS', {
                    event: $event.currentTarget.dataset.func,
                    fullLink: this.fileLink
                })
            }
        },
        mounted() {
            this.widthEl = this.$el.clientWidth;
            this.bodyWidth = document.body.offsetWidth
        },
        beforeUpdate() {
            this.widthEl = this.$el.clientWidth;
            this.bodyWidth = document.body.offsetWidth
        }

    }
</script>

<style lang="less">
  #modalFileStorage {
    min-width: 300px;
    height: auto;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
    border-radius: 0 4px 4px 0;
    position: absolute;
    z-index: 5000;
    transition: .2s ease-in-out;

    .modal-file-storage__option {
      width: 100%;
      height: auto;
      min-height: 38px;
      display: flex;
      align-items: center;
      padding: 4px 7px;
      box-sizing: border-box;
      cursor: pointer;
      transition: .1s ease-in-out;

      > span {
        padding: 7px 10px 7px 26px;
        color: #1E1E1E;
        font-size: 16px;
      }
    }

    :hover {
      background: #D4E3FB;

      > span {
        color: #2574CF;
      }
    }

  }

  .modalCardStorage-enter-active, .modalCardStorage-leave-active {
    transition: opacity .3s;
  }

  .modalCardStorage-enter, .modalCardStorage-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
