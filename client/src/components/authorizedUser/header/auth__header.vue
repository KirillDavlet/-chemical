<template>
  <div
    id="auth__header"
    :style="{background: themeActiveComp && themeActiveComp.mainBackground.background, color:  themeActiveComp && themeActiveComp.mainBackground.color}">
    <div class="auth__header">
      <div
        style="cursor:pointer;"
        class="auth__header-logo" @click="goHome">
        <span>LOGO</span>
      </div>
      <div class="auth__header-module">
        <user-info/>
        <div class="auth__header-module-list">
          <!--            :TODO написать цикл по доступным модулям-->
          <switch-button
            v-for="item in this.$store.getters.SWITCHERMENU"
            :switch-data="item"
          />
          <icon-theme
            style="cursor: pointer"
          />
        </div>
        <div class="auth__header-module-lang">
          <select-lang/>
        </div>
        <div class="auth__header-module-ext"
          @click="exitUser">
          <cm-toolbar :toolbar="_('exit')">
            <icon-exit/>
          </cm-toolbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import IconExit from "../../icon/iconExit";
    import UserInfo from "./modules/userInfo";
    import IconTheme from "../../icon/iconTheme";
    import CmToolbar from "../../mainComponent/toolbar/toolbar";
    import SwitchButton from "../../mainComponent/switch/switchButton";
    import SelectLang from "./modules/moduleNavigationHeader/selectLang";

    export default {
        /**
         * КОМПОНЕНТ ГАПКИ АВТОРИЗОВАННОГО ПОЛЬЗОВАТЕЛЯ
         * @param data:
         *              activeTheme - активная цветовая тема
         */
        name: "auth__header",
        components: {SelectLang, SwitchButton, CmToolbar, IconTheme, UserInfo, IconExit},
        data() {
            return {
                listModuleUser: '', //:TODO дописать в базе доступные модификации для юзеров и слать сюда
                style: null
            }
        },
        watch: {
          style(data) {
              document.body.style.background = data.workspaceBackground.backgroundAll
          }
        },
        methods: {
            /**
             * метод выхода из учетной записи
             */
            exitUser() {
                this.$store.commit('DELETE_INFOUSER');
                /**
                 * УДАЛЯЮ ПОЛЬЗОВАТЕЛЯ ИЗ ХРАНИЛИЩА
                 */
                localStorage.removeItem('user');
                this.$router.push('/')
                this.$store.commit('SET_LOADER', true)
            },
            /**
             * МЕТОД ВОЗВРАТА НА ГЛАВНУЮ СТРАНИЦУ
             */
            goHome() {
                this.$router.push(`/${this.$store.getters.INFOUSER.id}`)
            },
            /**
             * метод записывания всех переключателей по пользователю
             */
            initSwitcher() {
                this.$store.commit('SET_SWITCHERMENURESSET') //при каждом новом заходе сбрасываю все переключатели
                let switcher = this.$store.getters.INFOUSER.roleSwitcher;
                switcher.forEach(el => {
                    this.$store.commit('SET_SWITCHERMENU', el)
                })
            }
        },
        mounted() {
            this.initSwitcher()
        }
    }
</script>

<style lang="less">
  #auth__header {
    width: 100%;
    height: 45px;
    display: flex;;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
    position: fixed;
    top: 0;
    z-index: 999;
    transition: .2s ease-in-out;

    .auth__header {
      width: 90%;
      margin: auto;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &-logo {
        width: 20%;
      }

      &-module {
        width: 80%;
        display: flex;
        justify-content: flex-end;

        &-ext {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        &-lang {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        &-list {
          display: flex;
          margin: 0 12px;
        }
      }
    }
  }
</style>
