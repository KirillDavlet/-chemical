<template>
  <div id="navMenu"
       :style="{
          width: openClose,
          background:  themeActiveComp ? themeActiveComp.navigationBackground.background : '#f5f5f5',
          color: themeActiveComp ? themeActiveComp.navigationBackground.color : '#1e1e1e',
       }">
    <div class="nav-menu">
      <div class="nav-menu__button">
        <button-nav
          @openClose="clickButtonNav"
        />
      </div>
      <div class="nav-menu__link">
        <recurs-link
          v-for="link in linkList"
          :data="link"
          :openClose="open"
        />
      </div>
    </div>
  </div>
</template>

<script>
    import ButtonNav from "./buttonNav/buttonNav";
    import NavigationLink from "./navigationLink";
    import RecursLink from "./recursLink/recursLink";
    import Administration from "./IconNavigation/administration";

    /**
     * КОМПОНЕНТ НАВИГАЦИОННОГО МЕНЮ
     * ВКЛЮЧАЕТ КНОПКУ СКРЫТИЯ/ОТОБРАЖЕНИЯ,
     * БЛОК С ССЫЛКАМИ
     *
     * @param data:
     *              width           - ширина блока 4vw закрытый 15vw открытый
     *              open            - Boolean параметр отвечающий состояние блока
     *              colorIcon       - цвет иконки, поле меняется при наведении
     *
     * ВЫЗОВ КОМПОНЕНТА
     *                  <nav-menu />
     */
    export default {
        name: "navMenu",
        components: {Administration, RecursLink, NavigationLink, ButtonNav},
        data() {
            return {
                width: '4vw',
                open: false,
                colorIcon: '#909090',
                height: '',
                closeMenuDataLinks: null,
                menuDataLinksBool: false
            }
        },
        computed: {
            /**
             * открытые/закрытие блока
             * @returns {string}
             */
            openClose() {
                if (this.open) {
                    this.$store.commit('SET_NAVMENUWIDTH','250px');
                    return this.width = this.$store.getters.NAVMENUWIDTH
                } else {
                    this.$store.commit('SET_NAVMENUWIDTH','4vw');
                    return this.width = this.$store.getters.NAVMENUWIDTH
                }
            },
            //МЕТОД ПО ГЕТТЕРУ ССЫЛОК
            linkList() {
                return this.$store.getters.INFOUSER.linksModule
            }
        },
        methods: {
            /**
             * метод обработки данных из дочернего элемента button-nav
             * @param data
             */
            clickButtonNav(data) {
                this.open = data
            },
        },
        mounted() {
            // console.warn(this.$store.getters.INFOUSER.links)
        },
        beforeUpdate() {

        }
    }
</script>

<style lang="less">
  #navMenu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    min-width: 45px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: .2s ease-in-out;

    .nav-menu {
      width: 100%;
      height: 100%;

      &__button {
        width: 100%;
        height: 5vh;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 1vw;
        margin-top: 1vh;
        box-sizing: border-box;
      }

      &__link {
        width: 100%;
        height: 95vh;
        padding-top: 15px;

        &-icon {
          width: 100%;
          height: auto;
          min-height: 50px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2vh;
        }

        &-icon:hover {
          > div {
            > span {
              color: #3b3943;
            }
          }
        }
      }
    }

    #closeMenuChildLinks {
      width: 100px;
      height: 50px;
      background: red;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
