<template>
  <div id="cardMessage">
    <div class="message-all__date">
      <span>{{ date }}</span>
    </div>
    <div class="message-all__from">
      <span>От:</span>
      <span>{{ dataCardMessage.fio_from === FIO ? 'Меня' : dataCardMessage.fio_from }}</span>
    </div>
    <div class="message-all__theme">
      <span>Тема:</span>
      <span>{{ dataCardMessage.theme }}</span>
    </div>
    <div class="message-all__message">
      <span>Сообщение :</span>
      <span :style="{
        display: showInputAnswer ? 'inline': 'block',
        whiteSpace: showInputAnswer ? 'inherit' : 'nowrap' }">
        {{ dataCardMessage.description }}
      </span>
    </div>
    <div
      @click="answerClick"
      class="message-all__answer">
      <span>ответить</span>
    </div>
    <transition name="fade">
      <div
        class="message-all__answer-form"
        v-if="showInputAnswer">
        <input v-model="answerData" type="text" v-on:keyup.enter="sendMessage">
        <div class="message-all__answer-form-send" @click="sendMessage">
          <svg width="14" height="12" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.015625 18V11.0156L15.0156 9L0.015625 6.98438V0L21.0156 9L0.015625 18Z" fill="#666666"/>
          </svg>
        </div>
      </div>
      {{ date }}
    </transition>
  </div>
</template>

<script>
  /**
   * компонент карточки отображения сообщения
   */
  import newMessage from "../../../SystemTable/formMessage/api/newMessage/newMessage";
  import smailFace from "./../../../../../config/smailFace"

  export default {
    name: "cardMessage",
    props: {
      dataCardMessage: {
        type: Object,
        default: () => {
        }
      },
      iterKey: {type: Number, default: null}
    },
    data() {
      return {
        showInputAnswer: false, // флаг отвечающий за поле ответа
        answerData: ''
      }
    },
    methods: {
      //:TODO дописать проверку на символы и замену
      tttt(text) {
        return smailFace
      },
      answerClick() {
        this.showInputAnswer = !this.showInputAnswer
      },
      /**
       * метод отправки сообщения ( ответ )
       * @returns {Promise<void>}
       */
      async sendMessage() {
        /**
         * объект для отправки сообщения
         * @type {{from: {id: *, FIO: string}, recipient_id: *, info: {parentThemeId: *, description: string, theme: *}}}
         */
        let data = {
          recipient_id: this.dataCardMessage.id_from,
          info: {
            theme: this.dataCardMessage.theme,
            description: this.answerData,
            parentThemeId: this.dataCardMessage.id //:TODO Дописать это поле связывает в 1 блок все сообщения по теме
          },
          from: {
            id: this.$store.getters.INFOUSER.id,
            FIO: this.$store.getters.INFOUSER.firstName + ' ' + this.$store.getters.INFOUSER.nameUser + ' ' + this.$store.getters.INFOUSER.lastName
          }
        };
        const res = await newMessage.addMessage(data)
        if (res) {
          this.answerData = ''
          this.showInputAnswer = false
          this.$emit('readMessage', this.iterKey) //после отправки сообщение ставим как прочитаное
        }

      }
    },
    computed: {
      FIO() {
        return this.$store.getters.INFOUSER.firstName + ' ' + this.$store.getters.INFOUSER.nameUser + ' ' + this.$store.getters.INFOUSER.lastName
      },
      date() {

        // 2019-11-24T15:52:13.000Z
        let
          year = this.dataCardMessage.date.split('-')[0],
          month = this.dataCardMessage.date.split('-')[1],
          day = this.dataCardMessage.date.split('-')[2].split('T')[0],
          hour = this.dataCardMessage.date.split('T')[1].split(':')[0],
          minute = this.dataCardMessage.date.split('T')[1].split(':')[1],
          second = this.dataCardMessage.date.split('T')[1].split(':')[2].split('.')[0];

        let mounth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] //массив месяцев
        let dateString = `${hour} : ${minute} ${day} ${month} ${year}`;
        return dateString
      },
    },
    mounted() {

    }
  }
</script>

<style lang="less">
  #cardMessage {
    .message-all__from {
      margin-bottom: 5px;
      margin-top: 15px;

      > span {
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0.02em;
        font-size: 14px;
        text-transform: capitalize;
      }

      > span:nth-child(1) {
        color: #00000082;
        font-size: 18px
      }

      > span:nth-child(2) {
        color: #1E1E1E;
      }
    }

    .message-all__theme {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0.15px;
      margin-bottom: 5px;

      > span:nth-child(1) {
        color: #00000082;
        font-size: 18px
      }

      > span:nth-child(2) {
        color: #1E1E1E;
        font-size: 16px;
      }
    }

    .message-all__message {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0.15px;
      margin-bottom: 5px;

      > span:nth-child(1) {
        color: #00000082;
        font-size: 18px
      }

      > span:nth-child(2) {
        color: #1E1E1E;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .message-all__answer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .message-all__answer-form {
      width: 100%;
      height: 30px;
      background: white;
      margin: 5px 0;
      position: relative;

      &-send {
        position: absolute;
        right: 5px;
        top: 0;
        width: 15px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      > input {
        width: 100%;
        height: 100%;
        padding: 5px 25px 5px 5px;

        &:active {
          border: none;
        }

      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
