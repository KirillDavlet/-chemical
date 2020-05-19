<template>
  <div id="cm__button-standard" @click="eventClick" :style="{pointerEvents: statusLoading ? 'none' : 'auto'}">
    <div class="button" :class="typeThemeButt">
      <div v-if="loading">
          <span v-if="!statusLoading">
            {{ text }}
          </span>
        <div v-else
             :class="animType"></div>
      </div>
      <div v-else>
        <span> {{text}}  </span>
      </div>
    </div>
  </div>
</template>

<script>
    /**
     * КНОПКА
     * @param props
     * textButton       - текст в кнопке
     * statusLoading    - состояние кнопки по дефолту стоит false
     * loading          - нужно ли показывать анимацию работы, по дефолту true
     * typeAnimation    - тип анимации, стандартно стоит standard
     *
     * @param data
     * text - текст кнопки
     *
     * РАБОТА КОМПОНЕНТА
     * при клике, уходит родителю $emit и активируется загрузка от родителя
     * после ответа от родителя меняется состояние statusLoading
     *
     * ПРИМЕР РАБОТЫ
     * ВЫЗОВ КОМПОНЕНТА
     *    <cm__button-standard
     *       :statusLoading="flagLoaderButton"
     *       @eventClick="test"
     *     />
     *
     * РАБОТА В РОДИТЕЛЬСКОМ КОМПОНЕНТЕ
     * flagLoaderButton: false  //:TODO состояние кнопки дочерней по полю загрузка
     *      :TODO имитация запросов
     *      test() {
     *              this.flagLoaderButton = true
     *                  setTimeout(() => {
     *                    this.flagLoaderButton = false
     *                  }, 1000)
     *            }
     */
    export default {
        name: "cm__button-standard",
        props: {
            textButton: {
                type: String,
                default: 'Перейти'
            },
            statusLoading: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: true
            },
            typeAnimation: {
                type: String,
                default: 'loading-standard'
            },
            typeTheme: {
                type: String,
                default: 'normal'
            }
        },
        data() {
            return {
                text: '',
                statusLoad: Boolean,
                load: Boolean,
                animType: '',
                typeThemeButt: ''
            }
        },
        methods: {
            /**
             * метод передачи родителю сообщения о нажатии на кнопку
             */
            eventClick() {
                this.$emit('eventClick', true)
            },
            /**
             * инициализация кнопки
             */
            initButton() {
                this.text = this.textButton;
                this.statusLoad = this.statusLoading;
                this.load = this.loading;
                this.animType = this.typeAnimation;
                this.typeThemeButt = this.typeTheme
            }
        },
        mounted() {
            this.initButton()
        }
    }
</script>

<style lang="less">
  #cm__button-standard {
    height: 36px;
    width: 150px;
    cursor: pointer;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      width: 100%;
      height: 100%;
      position: relative;

      > div {
        > span {
          font-size: 16px;
          letter-spacing: 0.02em;
          line-height: 24px;
          text-transform: capitalize;
        }

        .loading-standard {
          border: 1px solid #f4fdff;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border-bottom-style: none;
          animation: buttonLoading .4s ease-in-out infinite;
        }
      }

    }

  }

  #cm__button-standard {
    .normal {
      background: #5181B8;

      > div {
        > span {
          color: #FFFFFF;
        }
      }
    }
  }

  #cm__button-standard {
    .yellow {
      background: #FF9800;

      > div {
        > span {
          color: #FFFFFF;
        }
      }
    }
  }

  #cm__button-standard:active {
    .button:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      background: rgba(0,0,0,.2);
      box-shadow: 0 0 3px rgba(0,0,0,.1);
      border-radius: 4px;
    }
  }

  @keyframes buttonLoading {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
