<template>
  <div id="authorization">
    <div class="authorization">
      <div class="authorization-info"></div>
      <div class="authorization-form">
        <div class="authorization-form__header"><span>Авторизация</span></div>
        <div class="authorization-form__info"><span>Для доступа в закрытый раздел системы необходимо ввести логин и пароль.</span>
        </div>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="loginInfo"
            :title="'логин'"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="passInfo"
            :title="'пароль'"
            :typeForm="'password'"
          />
        </layout>
        <!--            :TODO напиать компонент checkbox-->
        <layout style="margin-top: 5px">
          <input type="checkbox" id="saveUser" v-model="saveUser"><label for="saveUser">Запомнить</label>
        </layout>
        <layout>
          <cm__button-standard
            :typeTheme="'yellow'"
            :statusLoading="flagLoaderButton"
            @eventClick="authorizationUser"
          />
        </layout>
        <layout >
          <a href="#" style="text-decoration: none"><span>Восстановить пароль</span></a>
        </layout>
      </div>
    </div>
  </div>
</template>

<script>
    import Fm__form from "../../form/form";
    import Layout from "../../layout/layout";
    import Cm__buttonStandard from "../../button/cm__button-standard";
    import authorizationUser from './../../../services/registerAuthorization/authoriazation'
    export default {
        /**
         * КОМПОНЕНТ АВТОРИЗАЦИИ
         * @param data
         * login              - логин пользователя
         * pass               - пароль пользователя
         * saveUSer           - флаг для анимации кнопки при клике
         * flagLoaderButton   - флаг работы кнопки ( анимация )
         *
         */
        name: "authorization",
        components: {Cm__buttonStandard, Layout, Fm__form},
        data() {
            return {
                login: '',
                pass: '',
                saveUser: false,
                flagLoaderButton: false
            }
        },
        methods: {
            /**
             * ловим событие кнопки
             */
            async authorizationUser() {
                if(this.login !== '' && this.pass !== '') {
                    const body = {
                        login: this.login,
                        pass: this.pass
                    };
                    this.flagLoaderButton = true;
                    const res = await authorizationUser.authUser(body);
                    if(res.data.status) {
                        this.$store.commit('SET_INFOUSER',res.data.info);
                        /**
                         * ЗАПИСЫВАЮ ПОЛЬЗОВАТЕЛЯ В локальное ханилище
                         */
                        localStorage.setItem('user',JSON.stringify(res.data.info.id));
                    }
                    this.flagLoaderButton = false

                }
                else {

                }
            },
            /**
             * метод записи value формы logina
             * @param data
             */
            loginInfo(data) {
                this.login = data
            },
            /**
             * метод записи value формы pass
             * @param data
             */
            passInfo(data) {
                this.pass = data
            }
        }
    }
</script>

<style lang="less">
  #authorization {
    width: 100%;
    height: calc(100vh - 35px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .authorization {
      width: auto;
      max-width: 650px;
      height: 350px;
      display: flex;
      box-shadow: 0 9px 46px rgba(0, 0, 0, 0.12), 0 24px 38px rgba(0, 0, 0, 0.14);
      position: relative;
      z-index: 2;
      background: #FFFFFF;

      &-info {
        width: 35%;
        height: 100%;
        background-color: #FFFFFF;
        background-image: url("../../../../static/image/authorization.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
      }

      &-info:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(143, 140, 189, 0.4);
      }
      &-info:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 140, 189, 0.1);
      }

      &-form {
        width: 65%;
        height: 100%;
        padding: 15px 25px;
        box-sizing: border-box;

        &__header {
          span {
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            letter-spacing: 0.02em;
            color: #000000;
          }
        }

        &__info {
          margin-top: 26px;

          span {
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.02em;
            color: #000000;
          }
        }
      }
    }
  }
  #authorization:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("../../../../static/image/authUserBackground.jpg");
  }
</style>
