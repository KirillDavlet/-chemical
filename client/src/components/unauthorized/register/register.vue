<template>
  <div id="register">
    <div class="register">
      <div class="register__header"><span>Регистрация</span></div>
      <div class="register__message"><span>*  -   поле для обязательного заполнения</span></div>
      <div class="register__form">
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="nameInfo"
            :title="'имя'"
            :requiredField="dataUser.name.requiredField"
            :color="dataUser.name.classForm"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="firstNameInfo"
            :title="'Фамилия'"
            :requiredField="dataUser.firstName.requiredField"
            :color="dataUser.firstName.classForm"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="lastNameInfo"
            :title="'Отчество'"
            :requiredField="dataUser.lastName.requiredField"
            :color="dataUser.lastName.classForm"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="loginInfo"
            :title="'логин'"
            :requiredField="dataUser.login.requiredField"
            :color="dataUser.login.classForm"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="mailNameInfo"
            :title="'почта'"
            :requiredField="dataUser.mail.requiredField"
            :color="dataUser.mail.classForm"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="passNameInfo"
            :title="'пароль'"
            type-form="password"
            :requiredField="dataUser.pass.requiredField"
            :color="dataUser.pass.classForm"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="copyPassNameInfo"
            :title="'повторите пароль'"
            type-form="password"
            :requiredField="dataUser.copyPass.requiredField"
            :color="dataUser.copyPass.classForm"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="phoneNameInfo"
            :title="'телефон'"
            :requiredField="dataUser.phone.requiredField"
            :color="dataUser.phone.classForm"
          />
        </layout>
        <layout style="margin-top: 5px">
          <fm__form
            @infoForm="positionNameInfo"
            :title="'должность'"
            :requiredField="dataUser.position.requiredField"
            :color="dataUser.position.classForm"
          />
        </layout>
      </div>
      <div class="register__save">
        <layout>
          <cm__button-standard
            :textButton="'Регитсрация'"
            :statusLoading="flagLoaderButton"
            @eventClick="saveUser"
          />
        </layout>
      </div>
    </div>
  </div>
</template>

<script>
    import Fm__form from "../../form/form";
    import Layout from "../../layout/layout";
    import Cm__buttonStandard from "../../button/cm__button-standard";
    import registerUser from './../../../services/registerAuthorization/register'

    export default {
        name: "register",
        components: {Cm__buttonStandard, Layout, Fm__form},
        data() {
            return {
                /** title - записываем данные
                 *  classForm - класс активный
                 *  requestionField- обязательное ли поле
                 * */
                dataUser: {
                    name: {
                        title: '',
                        classForm: '',
                        requiredField: true
                    },
                    lastName: {
                        title: '',
                        classForm: '',
                        requiredField: true
                    },
                    firstName: {
                        title: '',
                        classForm: '',
                        requiredField: true
                    },
                    login: {
                        title: '',
                        classForm: '',
                        requiredField: true
                    },
                    mail: {
                        title: '',
                        classForm: '',
                        requiredField: true

                    },
                    pass: {
                        title: '',
                        classForm: '',
                        requiredField: true

                    },
                    copyPass: {
                        title: '',
                        classForm: '',
                        requiredField: true
                    },
                    phone: {
                        title: '',
                        classForm: '',
                        requiredField: true
                    },
                    position: {
                        title: '',
                        classForm: '',
                        requiredField: true
                    },
                },
                flagLoaderButton: false
            }
        },
        methods: {
            /**
             * методы записи данных
             * @param data
             */
            nameInfo(data) {
                this.dataUser.name.title = data;
                if (this.dataUser.name.requiredField) this.dataUser.name.title.length > 0
                    ? this.dataUser.name.classForm = ''
                    : this.dataUser.name.classForm = 'red'
            },
            lastNameInfo(data) {
                this.dataUser.lastName.title = data;
                if (this.dataUser.lastName.requiredField) this.dataUser.lastName.title.length > 0
                    ? this.dataUser.lastName.classForm = ''
                    : this.dataUser.lastName.classForm = 'red'
            },
            firstNameInfo(data) {
                this.dataUser.firstName.title = data;
                if (this.dataUser.firstName.requiredField) this.dataUser.firstName.title.length > 0
                    ? this.dataUser.firstName.classForm = ''
                    : this.dataUser.firstName.classForm = 'red'
            },
            loginInfo(data) {
                this.dataUser.login.title = data;
                if (this.dataUser.login.requiredField) this.dataUser.login.title.length > 0
                    ? this.dataUser.login.classForm = ''
                    : this.dataUser.login.classForm = 'red'
            },
            mailNameInfo(data) {
                this.dataUser.mail.title = data;
                if (this.dataUser.mail.requiredField) this.dataUser.mail.title.length > 0
                    ? this.dataUser.mail.classForm = ''
                    : this.dataUser.mail.classForm = 'red'
            },
            passNameInfo(data) {
                this.dataUser.pass.title = data;
                if (this.dataUser.pass.requiredField)
                    this.dataUser.pass.title.length > 0
                        ? this.dataUser.pass.classForm = ''
                        : this.dataUser.pass.classForm = 'red'
            },
            copyPassNameInfo(data) {
                this.dataUser.copyPass.title = data;
                if (this.dataUser.copyPass.requiredField) this.dataUser.copyPass.title.length > 0
                    ? this.dataUser.copyPass.classForm = ''
                    : this.dataUser.copyPass.classForm = 'red'
            },
            phoneNameInfo(data) {
                this.dataUser.phone.title = data;
                if (this.dataUser.phone.requiredField) this.dataUser.phone.title.length > 0
                    ? this.dataUser.phone.classForm = ''
                    : this.dataUser.phone.classForm = 'red'
            },
            positionNameInfo(data) {
                this.dataUser.position.title = data;
                if (this.dataUser.position.requiredField) this.dataUser.position.title.length > 0
                    ? this.dataUser.position.classForm = ''
                    : this.dataUser.position.classForm = 'red'
            },
            /**
             * МЕТОД СОХРАНЕНИЯ ПОЛЬЗОВАТЕЛЯ
             */
            async saveUser() {
                let flag = true;
                if (this.dataUser.pass.title !== this.dataUser.copyPass.title) {
                    this.dataUser.pass.classForm = 'red';
                    this.dataUser.copyPass.classForm = 'red';
                } else {
                    this.dataUser.pass.classForm = '';
                    this.dataUser.copyPass.classForm = '';
                    for (let item in this.dataUser) {
                        if (this.dataUser[item].title === '') {
                            flag = false;
                            this.dataUser[item].classForm = 'red'
                        }
                    }
                    if (flag) {
                        let body = {};
                        for(let item in this.dataUser) {
                            body[item] = this.dataUser[item].title
                        }
                        this.flagLoaderButton = true;
                        //Запрос на сервер по регистрации
                        const res = await registerUser.registerUser(body);
                        if(res.data) {
                            this.flagLoaderButton = false;
                            res.data.forEach(el=> {
                                if(el.status === true) {
                                    this.$emit('registerUser', {
                                        message:'пользователь зарегистрирован, вам необходимо активировать учетную запись. Обратитесь к администратору'
                                    })
                                } else {
                                    this.dataUser[el.info].classForm = 'red'
                                }
                            })
                        }

                    }
                }
            }
        }
    }
</script>

<style lang="less">
  #register {
    width: 50%;
    height: auto;
    margin-top: 25px;

    .register {
      width: 100%;
      height: 100%;

      &__header {
        span {
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 0.02em;
          color: #000000;
        }
      }

      &__message {
        span {
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: 0.02em;
          color: #000000;
        }
      }
    }
  }
</style>
