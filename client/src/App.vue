<template>
  <div id="app" @click="closeModal">
    <div class="block-alert">
      <Cm__alert
        v-for="(item, i ) in GETARRAYMESSAGE"
        :dataMessage="item"
        :key="`alert-${i}`"
        :keyAlert="i"
        :class="`alert-${i}`"
        @deleteAlert="deleteAlertParrent"
      />
    </div>
    <dropdown-menu/>
    <loader
      v-if="LOADER"
    />
    <transition name="loaderMessage">
      <loader-message v-if="getLoaderMessage"/>
    </transition>
    <support v-if="testTODOS"/>
    <div v-if="!testTODOS">
      <cm__header
        :dataHeader="dataHeader"
        @typeAuth="authorizationHeader"
      />
      <div id="noUser">
        <unauthorized
          v-if="!loader"
          :typeAuth="authorization"
          :dataInfo="dataInfo"
          :cardTestings="cardTestings"
          @registerUser="registerTrueInHome"
        />
      </div>
    </div>
    <div v-if="testTODOS">
      <app__auth-users/>
    </div>
  </div>
</template>

<script>
  import getInfoNoUser from "./services/getInfoNoUser";
  import lsAuthorization from './services/registerAuthorization/authoriazation'
  /**
   * данные для slider
   * ВХОДНЫЕ ДАННЫЕ
   * {
   *   name:"String" - имя слайдера
   *   массив данных по слайдеру
   *   data: [
   *     {
   *       img:'', - адрес картинки для фона
   *       info:'', - информация по слайдеру
   *       title:'', - заголовок слайдера
   *       url:'' - ссылка по блоку слайдера
   *     }
   *   ]
   * }
   */
  import Slider from "./components/slider/slider";
  import Loader from "./components/loader/loader";
  import Unauthorized from "./components/unauthorized/unauthorized";
  import Cm__header from "./components/unauthorized/header/cm__header";
  import Cm__alert from "./components/alert/cm__alert";
  import NavMenu from "./components/navigationMenu/navMenu";
  import App__authUsers from "./components/authorizedUser/app__auth-users";
  import DropdownMenu from "./components/dropdownMenu/dropdownMenu";
  import Support from "./components/authRouter/support/supportForm";
  import LoaderMessage from "./components/loader/loaderMessage/loaderMessage";
  import SettingsWidget from "./components/authRouter/settings/settings-widgets/settingsWidget";
  import Home from "./components/authRouter/home/home";
  import FileView from "./components/mainComponent/modal-view/fileView/fileView";

  export default {
    name: 'App',
    components: {
        FileView,
        Home,
        SettingsWidget,
      LoaderMessage,
      Support, DropdownMenu, App__authUsers, NavMenu, Cm__alert, Cm__header, Unauthorized, Loader, Slider
    },
    computed: {
      //вычисляпемое свйоство в хранилище, информация по пользователю
      testTODOS() {
        return this.$store.getters.INFOUSER
      },
      LOADER() {
        return this.$store.getters.LOADER
      },
      GETARRAYMESSAGE() {
        return this.$store.getters.ALERTARRAY
      },
      getLoaderMessage() {
        return this.$store.getters.get_loaderMessage
      }
    },
    data() {
      return {
        dataInfo: null,
        dataHeader: {
          register: {
            title: 'Зарегистрироваться',
            ref: 'register'
          },
          authorization: {
            title: 'авторизоваться',
            ref: 'auth'
          },
          home: {
            title: 'на главную',
            ref: 'home'
          }
        },
        loader: false,
        //обект по активности авторизации и регистрации
        authorization: {
          auth: false,
          register: false
        },
        alert: [],
        cardTestings: [],
      }
    },
    methods: {
      /**
       * Метод удаления сообщения
       */
      deleteAlertParrent(data) {
        document.getElementsByClassName(`alert-${data}`)[0].remove()
      },
      //запрос на сервер по инфе слайдера
      async dataHomeNoUser() {
        this.$store.commit('SET_LOADER', true);
        const res = await getInfoNoUser.infoData();
        this.$store.commit('SET_NOAUTHORIZATION', res.data);
        this.dataInfo = this.$store.getters.NOAUTHORIAZATION.slider;
        this.cardTestings = this.$store.getters.NOAUTHORIAZATION.cardInfo;
        this.$store.commit('SET_LOADER', false)
      },
      /**
       * метод определеющий какое действие выполнить для не зарегистрированного пользователя
       * @param data - активное событие из шапки
       */
      authorizationHeader(data) {
        for (let item in this.authorization) item === data ? this.authorization[item] = true : this.authorization[item] = false
      },
      /**
       * метод перехода после регистрации на домашнюю страницу
       * @param data
       */
      registerTrueInHome(data) {
        this.alert.push({
          type: 'success',
          title: `Регистрация`,
          message: data.message,
          event: true,
          link: {
            lk: '',
            title: ''
          }
        });
        setTimeout(() => {
          data = 'home'; //возвращаемся н главную
          for (let item in this.authorization) item === data ? this.authorization[item] = true : this.authorization[item] = false
        }, 1000)

      },
      /**
       * МЕТОД ПРОВЕРКИ ПРЛЬЗОВАТЕЛЯ, ЕЛСИ ЕСТЬ В localstorage info тогда шлем запрос
       */
      async lsUath() {
        if (localStorage.getItem('user')) {
          const res = await lsAuthorization.localStorage({id: localStorage.getItem('user')});
          this.$store.commit('SET_INFOUSER', res.data);

        } else {
          this.dataHomeNoUser();
        }
      },
      //Метод закрытия все модалок при клике в свободную область
      closeModal() {
        //если модалка открыта, тогда закрываем её при клике по любому полю
        if (this.$store.getters.DROPDOWNMENU.bool) {
          this.$store.commit('SET_CLOSEDROPDOWNMENU')
        }

      }
    },
    mounted() {
      this.lsUath();
      this.dataHomeNoUser();
    },
    beforeUpdate() {
      /**
       * ЛОВИМ, ЕСЛИ загрузчик активный, то отключаем его
       * при условии, если юзера нет и загрузчик активный
       */
      if (this.$store.getters.LOADER && !localStorage.getItem('user')) {
        setTimeout(() => {
          this.$store.commit('SET_LOADER', false)
        }, 1000)
      }
    }
  }
</script>

<style lang="less">
  #app {
    width: 100%;
    min-height: 100vh;

    .block-alert {
      position: absolute;
      top: 50px;
      left: calc(50% - 225px);
      width: 500px;
      height: auto;
    }

    #noUser {
      width: 100%;
      height: 100%;
    }
  }

  .loaderMessage-enter-active, .loaderMessage-leave-active {
    transition: opacity .5s;
  }
  .loaderMessage-enter, .loaderMessage-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
