<template>
  <div id="buttonNav" @click="eventOpenClose" :class="activeClass">
    <div class="button-close">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
    /**
     * КОМОПНЕНТ КНОПКИ НАВИГАЦИОННОГО МЕНЮ
     *
     * @param props:
     *              openClose         - параметр отвечающий за внешний вид кнопки
     *
     * @param data:
     *              flagOPenClose     - состояние кнопки при инициализации компонента записывается значение из openClose
     *              activeClass       - активный класс кнопки
     */
    export default {
        name: "buttonNav",
        props: {
            openClose: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                flagOPenClose: false,
                activeClass: 'closed'
            }
        },
        watch: {
            /* следим за состоянием кнопки при клике */
            flagOPenClose() {
                this.flagOPenClose ? this.activeClass = 'open' : this.activeClass = 'closed'
            }
        },
        methods: {
            /**
             * метод
             * меняющий состояние кнопки
             * отправляющий родителю состояние для блока
             */
            eventOpenClose() {
                this.flagOPenClose = !this.flagOPenClose;
                this.$emit('openClose', this.flagOPenClose) //отправка родителю какое состояние у навигационного меню
            }
        },
        mounted() {
            this.flagOPenClose = this.openClose
        }
    }
</script>

<style lang="less">
  #buttonNav {
    width: 2vw;
    height: 2.5vh;
    cursor: pointer;

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > div {
        margin: auto;
        width: 80%;
        height: 15%;
        background: #b1aeae;
        opacity: 0;
        transition: .2s ease-in;
      }


    }

  }

  #buttonNav:hover {
    .button-close {
      > div {
        background: #b1b1ae;
      }
    }
  }

  #buttonNav.closed {
    > div {
      > div:nth-child(2) {
        transform: translateX(20px);
      }

      > div:not(:nth-child(2)) {
        transform: translateX(-20px);
      }

      > div {
        animation: closeButtonNavigation .4s ease-in forwards;
      }
    }
  }

  #buttonNav.open {
    > div {
      position: relative;

      > div:nth-child(1) {
        display: none;
      }

      > div:nth-child(2) {
        transform: rotate(0);
        animation: openOneButtonNavigation .4s ease-in forwards;
      }

      > div:nth-child(3) {
        transform: rotate(0);
        animation: openTwoButtonNavigation .4s ease-in forwards;
      }

      > div {
        position: absolute;
        opacity: .5;
        animation: openButtonNavigation .4s ease-in forwards;
      }
    }
  }

  @keyframes closeButtonNavigation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes openOneButtonNavigation {
    0% {
      opacity: .5;
    }
    100% {
      opacity: 1;
      transform: rotate(45deg);
    }
  }

  @keyframes openTwoButtonNavigation {
    0% {
      opacity: .5;
    }
    100% {
      opacity: 1;
      transform: rotate(-45deg);
    }
  }

</style>
