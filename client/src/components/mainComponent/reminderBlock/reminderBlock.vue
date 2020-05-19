<template>
  <div
    ref="reminderBlock"
    id="remindersBlock">
    <div class="reminders-block">
      <div class="reminders-block__close" @click="closeEvents">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.9844 6.42188L13.4062 12L18.9844 17.5781L17.5781 18.9844L12 13.4062L6.42188 18.9844L5.01562 17.5781L10.5938 12L5.01562 6.42188L6.42188 5.01562L12 10.5938L17.5781 5.01562L18.9844 6.42188Z"
            fill="inherit"/>
        </svg>
      </div>
      <div class="reminders-block__settings" @click="openRemindersBlock"
           :style="{transform: opened ? 'rotate(180deg)' : ''}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.98438 12L12 3.98438L20.0156 12L18.5625 13.4062L12.9844 7.82812V20.0156H11.0156V7.82812L5.39062 13.4062L3.98438 12Z"
            fill="black"/>
        </svg>
      </div>
      <div class="reminders-block__body">
        <div class="reminders-block__body-icon">
          <svg :width="styleIcon.size" :height="styleIcon.size" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.98438 9.98438H12V15H6.98438V9.98438ZM18.9844 18.9844V8.01562H5.01562V18.9844H18.9844ZM18.9844 3C19.5156 3 19.9844 3.20312 20.3906 3.60938C20.7969 4.01562 21 4.48438 21 5.01562V18.9844C21 19.5156 20.7969 19.9844 20.3906 20.3906C19.9844 20.7969 19.5156 21 18.9844 21H5.01562C4.45312 21 3.96875 20.7969 3.5625 20.3906C3.1875 19.9844 3 19.5156 3 18.9844V5.01562C3 4.48438 3.1875 4.01562 3.5625 3.60938C3.96875 3.20312 4.45312 3 5.01562 3H6V0.984375H8.01562V3H15.9844V0.984375H18V3H18.9844Z"
              fill="#666666"/>
          </svg>
        </div>
        <div class="reminders-block__body-info">
          <div
            v-if="!opened"
            class="reminders-block__body-info__size">
            <reminder-size/>
          </div>
          <div
            v-if="opened"
            class="reminders-block__body-info__data">
            <reminder-info/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    /**
     * Компонент блока оповещений по назначенным событиям ( в календаре )
     *
     * в родительском компоненте флаг отвечающий за отображение блока activeEventsBlock: true , при нажатии на close вызываеться метод "closeEvents" который в свою очередь обрабатываеться и переводит фоаг в положение false
     *
     */
    import ReminderSize from "./reminderBlockCard/reminderSize";
    import ReminderInfo from "./reminderBlockCard/reminderInfo";

    export default {
        name: "reminderBlock",
        components: {ReminderInfo, ReminderSize},
        props: {
            eventData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                opened: false,
            }
        },
        watch: {
            opened(data) {
                if(data) {
                    this.$refs.reminderBlock.style.animation = `blockOpening .3s  ease-in forwards`
                } else {
                    this.$refs.reminderBlock.style.animation = `blockClose .3s ease-out forwards`
                    setTimeout(()=> {
                        this.$refs.reminderBlock.style.animation = ''
                    }, 300)
                }
            }
        },
        computed: {
            // стили для иконки
            styleIcon() {
                return this.opened ? {size: 48} : {size: 24}
            }
        },
        methods: {
            /**
             * метод инициализации компонента
             */
            initComp() {
                this.$refs.reminderBlock.classList.add('display-block-reminder');
                setTimeout(() => {
                    this.$refs.reminderBlock.classList.remove('display-block-reminder')
                }, 600)
                this.calculationCurrentDates(this.eventData)
            },
            /**
             * метод открывания/закрывания блока оповещения
             */
            openRemindersBlock() {
                this.opened = !this.opened
            },

            /**
             * функция расчета актуальных дат
             * @param afterDays - количетсво дней после
             * @param arrEvent  - массив событий
             * :TODO дома дописать ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, :TODO
             */
            calculationCurrentDates(arrEvent, afterDays = 1) {
                const currentDay = new Date()
            },

            /**
             * метод закрытия блока по оповещениям
             */
            closeEvents() {
                this.opened ? this.opened = false : ''
                this.$refs.reminderBlock.classList.add('display-block-reminder-reverse');
                setTimeout(() => {
                    this.$refs.reminderBlock.classList.remove('display-block-reminder-reverse')
                    this.$emit('closeBlockEvents')
                }, 400)
                // display-block-reminder
            }
        },
        mounted() {
            this.initComp()
        }
    }
</script>


<style lang="less">
  #remindersBlock {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    overflow: hidden;

    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background: linear-gradient(270deg, #E31F28 0%, #843FA0 51.04%, #2574CF 100%);
      position: absolute;
      top: 0;
      left: 0;
    }

    .reminders-block {
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;
      transform: translateY(100%);
      animation: displayBlock .2s .4s ease-in-out forwards;

      &__close {
        position: absolute;
        left: 15px;
        top: 5px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        > svg {
          fill: #1e1e1e;
        }

        &:hover {
          > svg {
            fill: red;
          }
        }

      }

      &__settings {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        transition: .1s ease-in-out;

      }

      &__body {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0 10%;

        &-icon {
          width: 20%;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          > svg {
            transition: .3s ease-in-out;
          }
        }

        &-info {
          width: 80%;
          height: 100%;

          &__size {
            width: 100%;
            height: 100%;
          }
          &__data {
          width: 100%;
          height: 100%;
        }
        }
      }
    }
  }

  // класс появления блока
  .display-block-reminder {
    animation: displayReminders .4s ease-in-out forwards;
  }

  // класс исчезновения блока0
  .display-block-reminder-reverse {
    animation: displayReminders .4s ease-in-out reverse;
  }

  // анимация появления блока основного
  @keyframes displayReminders {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  // анимация появления блока с контентом
  @keyframes displayBlock {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  //анимация открывания блока
  @keyframes blockOpening {
    0% {
      height: 50px;
      transform: translateY(-5%);
    }
    25% {
      height: 50px;
      transform: translateY(15%);
    }
    50% {
      height: 50px;
      transform: translateY(0);
    }
    100% {
      height: 250px;
    }
  }

  //анимация закрывания блока
  @keyframes blockClose {
    0% {
      height: 250px;
      transform: translateY(5%);
    }
    25% {
      height: 250px;
      transform: translateY(-15%);
    }
    50% {
      height: 250px;
      transform: translateY(0);
    }
    100% {
      height: 50px;
    }
  }
</style>
