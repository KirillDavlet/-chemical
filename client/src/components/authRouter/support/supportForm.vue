<template>
  <div id="support">
    <div
      @click="opensupport"
      class="support-icon">
      <cm-toolbar :toolbar="'техническая поддержка'" left>
        <span>?</span>
      </cm-toolbar>
    </div>
    <transition name="supportBlock">
      <div
        v-if="showModalSupport"
        class="support-form">
        <div
          class="support-form__header"
          @click="opensupport">
          <span>Техническая поддержка</span>
        </div>
        <div class="support-form__body">
          <div class="support-form__body-theme">
            <cm-toolbar :toolbar="'не больше 100 символов'">
              <span>тема обращения*</span>
            </cm-toolbar>
            <input type="text" v-model="dataSupport.topicAppeal">
          </div>
          <div class="support-form__body-problem">
            <cm-toolbar :toolbar="'не больше 1000 символов'">
              <span>описание проблемы*</span>
            </cm-toolbar>
            <textarea name="problem" cols="30" rows="10" v-model="dataSupport.descriptionProblem"></textarea>
          </div>
          <div class="support-form__body-desiredResult">
            <cm-toolbar :toolbar="'не больше 1000 символов'">
              <span>возможно решение проблемы*</span>
            </cm-toolbar>
            <textarea name="problem" cols="30" rows="10" v-model="dataSupport.desiredResult"></textarea>
          </div>
        </div>
        <div class="support-form__footer">
          <div
            @click="closeModal"
            class="support-form__footer-close">
            <span>закрыть</span>
          </div>
          <cm__button-standard
            :statusLoading="flagLoaderButton"
            @eventClick="saveServerSupport"
            :textButton="'отправить'"
            :type-theme="'yellow'"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    import Cm__buttonStandard from "../../button/cm__button-standard";
    import postSendingMessage from "./apiSupport/senndingMessage/postSendingMessage";
    import CmToolbar from "../../mainComponent/toolbar/toolbar";

    export default {
        name: "support",
        components: {CmToolbar, Cm__buttonStandard},
        data() {
            return {
                showModalSupport: false,
                dataSupport: {
                    topicAppeal: '',//тема обращения
                    descriptionProblem: '',//описание проблемы
                    desiredResult: '',//желаемый результат,
                    dataUser: {
                        id: null,
                        FIO: ''
                    },
                },
                flagLoaderButton: false, //флаг для отображения загрузки на кнопке
            }
        },
        methods: {
            opensupport() {
                this.showModalSupport = !this.showModalSupport
            },
            closeModal() {
                this.dataSupport.topicAppeal = '';
                this.dataSupport.descriptionProblem = '';
                this.dataSupport.desiredResult = '';
                this.dataSupport.dataUser = {id:'', FIO:''};
                this.showModalSupport = false

            },
            async saveServerSupport() {
                this.flagLoaderButton = true;
                this.dataSupport.dataUser.FIO = this.$store.getters.INFOUSER.firstName +' '+ this.$store.getters.INFOUSER.nameUser + ' ' + this.$store.getters.INFOUSER.lastName;
                this.dataSupport.dataUser.id = this.$store.getters.INFOUSER.id;
                const res = await postSendingMessage.sendingMessage(this.dataSupport, this.dataSupport.dataUser.id);
                if(res) {
                    if(res.data) {
                        this.flagLoaderButton = false;
                        this.closeModal()
                    } else {
                        this.flagLoaderButton = false;
                        this.closeModal()
                    }
                    let commitAlert = {
                        type: res.data.typeMessage,
                        message: res.data.message
                    }
                    this.$store.commit('SET_ALERTARRAY', commitAlert)
                } else {
                    setTimeout(() =>  {
                        this.closeModal()
                    }, 3000)
                }
            }
        }
    }
</script>


<style lang="less">
  #support {
    position: fixed;
    bottom: 25px;
    right: 15px;
    z-index: 200;

    .support-icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: #2a364f;
      cursor: pointer;
      position: fixed;
      bottom: 25px;
      right: 15px;
      z-index: 200;
      animation: adnimIconSupport 1.2s linear infinite; //:TODO дописать добавление анимации, если пользователь ввел информацию и закрыл тех поддержку, так же запоминать данные по техподдержке, после перезагрузки страницы

      > span {
        font-family: 'Fjalla One', sans-serif;
        font-size: 24px;
        color: white;
      }
    }

    .support-form {
      width: 600px;
      height: 500px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
      border-radius: 4px;
      background: #70889E;
      position: relative;
      z-index: 201;

      &__header {
        width: 100%;
        height: 50px;
        display: flex;
        background: #4F4F4F;
        align-items: center;
        cursor: pointer;

        > span {
          color: #FFFFFF;
          padding: 0 15px;
          font-size: 18px;
        }
      }

      &__body {
        width: 100%;
        height: auto;
        padding: 28px 16px;

        &-theme {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-bottom: 25px;

          > span {
            letter-spacing: 0.02em;
            color: #FFFFFF;
            font-size: 14px;
          }

          > input {
            height: 34px;
            width: 100%;
            background: #FFFFFF;
            border-radius: 2px;
            margin-top: 8px;
            padding: 0 7px;
          }
        }

        &-problem, &-desiredResult {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-bottom: 25px;

          > span {
            letter-spacing: 0.02em;
            color: #FFFFFF;
            font-size: 14px;
          }

          > textarea {
            height: 80px;
            width: 100%;
            background: #FFFFFF;
            border-radius: 2px;
            margin-top: 8px;
            padding: 0 7px;
            resize: none;
          }
        }
      }

      &__footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        > div {
          width: auto;
          min-width: 130px;
          height: 40px;
          margin: 0 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #656565;
          border-radius: 4px;
          cursor: pointer;

          > span {
            font-size: 20px;
            color: #FFFFFF;
          }
        }
      }

    }
  }

  .supportBlock-enter-active, .supportBlock-leave-active {
    transition: opacity .5s;
  }

  .supportBlock-enter, .supportBlock-leave-to {
    opacity: 0;
  }

  @keyframes adnimIconSupport {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
