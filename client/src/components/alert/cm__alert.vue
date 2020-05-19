<template>
  <div id="cm__alert"
       :class="dataMessage.type">
    <div class="icon">
      <icon__successful v-if="dataMessage.type === 'success' "/>
      <icon__error v-if="dataMessage.type === 'error' "/>
      <icon__information v-if="dataMessage.type === 'info' "/>
      <icon__warning v-if="dataMessage.type === 'warning' "/>
    </div>
    <div class="info">
      <div class="info-title"><span>{{ dataMessage.message }} </span></div>
    </div>
  </div>
</template>

<script>
    /**
     * Компонент Сообщения Сплывающий
     * Тайминг общий жизни 5s после родителю отправляется emit для уничтожения
     * @param type    - тип события
     * @param title   - заголовок события
     * @param info    - информация по событию
     * @param link    - ссылка на информационную страницу по событию (c default)
     *
     * @param DATA    - classType определяемый класс для сообщения
     * @param DATA    - typeIcon определяемая иконка
     *
     * У родителя принять $emit "deleteMessage"
     *
     *
     *
     * Вид массива у родителя
     alert: []
     *
     * ловим у родителя @deleteMessage="test"
     *     test(data) {
     *           this.alert[this.alert.length - 1].event = data
     *                }
     *
     */
    import Icon__error from "../icon/icon__error";
    import Icon__warning from "../icon/icon__warning";
    import Icon__information from "../icon/icon__information";
    import Icon__successful from "../icon/icon__successfulExecution";

    export default {
        name: "cm__alert",
        components: {Icon__successful, Icon__information, Icon__warning, Icon__error},
        props: {
            dataMessage: Object,
            keyAlert: Number
        },
        data() {
            return {
                dataAlert: []
            }
        },
        watch: {
            dataAlert(data) {
                let el = this.$el;
            }
        },
        mounted() {
            setTimeout(() => {
                this.$emit('deleteAlert', this.keyAlert)
            }, 5600)
        }
    }
</script>

<style lang="less">
  #cm__alert {
    display: flex;
    width: 450px;
    min-height: 60px;
    max-height: 300px;
    height: auto;
    border-radius: 4px;
    opacity: 0;
    transform: translateY(100px);
    z-index: 111000;
    animation: .3s emerging ease forwards, .3s extinction 5s forwards;
    /**/

    .icon {
      width: 20%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .info {
      width: 80%;
      height: 100%;
      padding: 16px 0 15px 10px;
      box-sizing: border-box;

      &-title {
        margin-bottom: 16px;

        span {
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          letter-spacing: 0.02em;
          color: #242E42;
        }
      }

      &-message {
        span {
          font-size: 14px;
          line-height: 21px;
          letter-spacing: 0.02em;
          color: #1E1E1E;
        }
      }
    }
  }

  #cm__alert.error {
    background: #FDE1D9;
  }

  #cm__alert.success {
    background: #D4FAE4;
  }

  #cm__alert.warning {
    background: #FFE99D;
  }

  #cm__alert.info {
    background: #D4E3FB;
  }

  @keyframes emerging {
    0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(20px);
    }
  }

  @keyframes extinction {
    0% {
      opacity: 1;
      transform: translateY(20px);
    }
    100% {
      opacity: 0;
      transform: translateY(50px);
    }
  }
</style>
