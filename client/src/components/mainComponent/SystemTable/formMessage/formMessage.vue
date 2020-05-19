<template>
  <div id="formMessage" class="form-message" :style="{left: positionFM.x+'px', top:positionFM.y+'px'}">
    <div
      class="form-message__title"
      @mousedown="FMDragAndDropDown"
      @mouseup="FMDragAndDropUp"
    >
      <span>{{ typeMessage }}</span>
    </div>
    <div class="form-message__body">
      <div class="form-message__body-theme">
        <span>{{ _('theme') }}</span>
        <input v-model="theme" type="text">
      </div>
      <div class="form-message__body-message"
        v-if="dataWhoCaused &&  dataWhoCaused.message && dataWhoCaused.message !== ''">
        <span>Сообщение</span>
        <span>{{ dataWhoCaused.message }}</span>
      </div>
      <div class="form-message__body-recipient" v-if="recipient.length > 0">
        <span>{{ _('recipient') }}:</span>
        <div class="form-message__body-recipient__user"><span>{{ recipient.length > 0 ? recipient.join(' ; ') : recipient[0] }}</span></div>
      </div>
      <div class="form-message__body-description">
        <span>{{ _(descriptionTitle) }}</span>
        <textarea maxlength="3000" v-model="description"></textarea>
      </div>
    </div>
    <div class="form-message__footer">
      <div @click="toSendMessage"><span>Отправить</span></div>
      <div @click="closeFormMessage"><span>Закрыть</span></div>
    </div>
  </div>
</template>

<script>
  import addMessage from "./api/newMessage/newMessage" //отправка нового сообщения
  /**
   * Комопонент отправки сообщения
   * @param props:
   *                          - typeMessage               - определяет тип формы ( формальность - ответ, сообщение, приглашение и т.д.)
   *                          - address                   - адресат  ( id: пользователя, nameDB - имя таблицы
   *                          - dataWhoCaused             - данные , от кого вызвана модалка
   *                          - templateMessage           - Шаблон отправки сообщения, можно будет прокидывать либо стандартный
   *
   * @param data:
   *                          - positionFM                - координаты модалки
   *                          - positionStart             - координаты где именно курсор над элементом
   *                          - theme                     - реактивное поле для отправки
   *                          - description               - реактивное поле для отправки
   *
   */
  export default {
    name: "MC__formMessage",
    props: {
      typeMessage: {type: String, default: 'отправить сообщение'},
      positionModalMessage: {
        type: Object,
        default: () => {
          return {x: 100, y: 350}
        }
      },
      dataWhoCaused: [Object, Number, String],
      templateMessage: {
        type: Object,
        default: () => {
          return {
            header: 'Заголовок ответа',
            body: {
              thme: '',
              description: ''
            }

          }
        }
      },
      nameIdRecipient: {type: String, default: 'id_user'}, //поле отвечающее по какому параметру бду отправлять письмо
      settingsActionsForm: false, // поле отвечает за обработку событий в таблице, если false тогда внутри, true отправляеться родителю actions
      recipient: {
        type: Array,
        default: ()=> [] // массив получателей
      },
      descriptionTitle: {
        type: String,
        default: 'reply'
      }
    },
    data() {
      return {
        positionFM: null,
        positionStart: null,
        theme: '',
        description: '',

      }
    },
    methods: {
      /**
       * Меитод добавления темы из данных в форму, если она имееться
       */
      themeActive() {
        if (this.dataWhoCaused && this.dataWhoCaused.theme) {
          this.theme = `ответ по теме обращения: ${this.dataWhoCaused.theme}`
        }
      },
      //метод закрытия формы отправки сообщения
      closeFormMessage() {
        this.$emit('closeFormMessage')
      },
      /**
       * Метод отправки сообщения
       * :TODO ДЛЯ ТОГО, ЧТО БЫ ОТПРАВИТЬ СООБЩЕНИЕ, НУЖНО ЗНАТЬ ID АДРЕСАТА  ( пока что поле будет id_user )
       */
      async toSendMessage() {
        if(this.settingsActionsForm) {
          this.$emit('toSendMessage', {theme: this.theme, description: this.description})
          this.closeFormMessage(); //закрываю модалку
        }
        else {
          if (this.theme !== '' && this.description !== '') {
            let data = {
              recipient_id: this.dataWhoCaused[this.nameIdRecipient],
              info: {
                theme: this.theme,
                description: this.description
              },
              from: {
                id: this.$store.getters.INFOUSER.id,
                FIO: this.$store.getters.INFOUSER.firstName + ' ' + this.$store.getters.INFOUSER.nameUser + ' ' + this.$store.getters.INFOUSER.lastName
              }
            };
            const res = await addMessage.addMessage(data);
            if (res) {
              if (res.data) {
                //:TODO сообщение отправлено и ответ пришле
                if (res.data.status) {
                  console.log('сообщение успешно сохранено') //:TODO НУЖНО ЛИ ВЫЗОВЫВАТЬ ОКНО СООБЩЕНИЙ ????
                } else {
                  console.log('ответ пришел отрицательный')//:TODO НУЖНО ЛИ ВЫЗОВЫВАТЬ ОКНО СООБЩЕНИЙ ????
                }
                this.closeFormMessage(); //закрываю модалку
              }
            }
          }
        }

      },


      /**
       * Метод drag and dropa при зажимании кнопки ( левой )
       * @constructor
       */
      FMDragAndDropDown($event) {
        this.positionStart = {
          top: $event.pageY - this.$el.getBoundingClientRect().top - window.pageYOffset,
          left: $event.pageX - this.$el.getBoundingClientRect().left - window.pageXOffset,
        };
        //подвешал событие на тело
        document.body.addEventListener('mousemove', (event) => {
          this.FMDragAndDropMove(this.mouseMove, event)
        });
        this.mouseMove = true
      },
      /**
       *  Метод drag and dropa при отпускании кнопки ( левой )
       * @constructor
       */
      FMDragAndDropUp() {
        this.mouseMove = false;
      },
      /**
       * метод перетаскивания окна сообщений
       * @param bool
       * @param $event
       * @returns {boolean}
       * @constructor
       */
      FMDragAndDropMove(bool, $event) {
        if (bool) {
          this.positionFM = {
            x: $event.pageX - this.positionStart.left,
            y: $event.pageY - this.positionStart.top
          };
        } else {
          return false
        }
      }
    },
    mounted() {
    },
    created() {
      this.positionFM = this.positionModalMessage;
      this.themeActive()
    },
    beforeDestroy() {
      //При уничтожении компонента, удаляю обработчик :TODO правильно ли реализованно ?????
      document.body.removeEventListener('mousemove', (event) => {
        this.FMDragAndDropMove(this.mouseMove, event)
      });
    }
  }
</script>

<style lang="less">
  .form-message {
    width: 600px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
    border-radius: 0 4px 0 0;
    background: #70889E;
    position: absolute;

    &__title {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      background: #4F4F4F;
      border-radius: 0 4px 0 0;
      cursor: pointer;

      > span {
        padding: 0 28px;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.02em;
        color: #FFFFFF;
      }
    }

    &__body {
      width: 100%;
      padding: 28px;

      > div {
        margin-bottom: 28px;

        > span {
          font-weight: normal;
          font-size: 14px;
          line-height: 21px;
          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: 0.02em;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        > input, > textarea {
          width: 100%;
          background: #FFFFFF;
          border-radius: 2px;
          border: none;
          padding: 7px 12px;
          font-size: 18px;
        }
      }

      &-message {
        display: flex;
        flex-direction: column;

        > span {
          text-align: start !important;
        }
      }

      &-recipient {
        display: flex;
        flex-direction: column;
        &__user {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          > span {
            color: #dceaeb;
          }
        }
        > span {
          text-align: start !important;
        }
      }

      &-description {
        > textarea {
          min-height: 200px;
          max-height: 350px;
        }
      }
    }

    &__footer {
      width: 100%;
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 26px;

      > div {
        margin: 0 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FF9800;
        border-radius: 4px;
        padding: 7px 15px;
        cursor: pointer;

        > span {
          font-size: 14px;
          line-height: 21px;
          letter-spacing: 0.02em;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
