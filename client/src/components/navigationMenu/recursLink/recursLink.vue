<template>
  <div
    :data-name="data.title"
    id="recursLink">
    <div @click="clickShowActive">
      <div class="icon" v-if="data.name">
        <!--        ЕСЛИ ЗАКРЫТО-->
        <div v-if="!open" class="icon-close">
          <!--          Если нет вложенности-->
          <router-link
            v-if="data.child.length === 0"
            :to="idLinks">
            <administration
              v-if="data.name.toLowerCase() === 'administration'"
            />
            <icon__settings
              v-if="data.name.toLowerCase() === 'settings'"
            />
            <icon-wiki
              v-if="data.name.toLowerCase() === 'wikipedia'"
            />
            <icon-navigation-testings
              v-if="data.name.toLowerCase() === 'testings'"
            />
            <icon__file-storage
              v-if="data.name.toLowerCase() === 'storage file'"
            />
            <icon-technical-support
              v-if="data.name.toLowerCase() === 'support'"
            />
          </router-link>
          <!--          если есть вложенность-->

          <div
            v-else
            @click.stop="openNesting(data.child)"
          >
            <administration
              v-if="data.name.toLowerCase() === 'administration'"
            />

            <icon__settings
              v-if="data.name.toLowerCase() === 'settings'"
            />
            <icon-wiki
              v-if="data.name.toLowerCase() === 'wikipedia'"
            />
            <icon-navigation-testings
              v-if="data.name.toLowerCase() === 'testings'"
            />
            <icon__file-storage
              v-if="data.name.toLowerCase() === 'storage file'"
            />
            <icon-technical-support
              v-if="data.name.toLowerCase() === 'support'"
            />
          </div>
        </div>
        <!--        ЕСЛИ ОТКРЫТО-->
        <div
          v-if="open"
          class="icon-open">
          <!--          ЕСЛИ НЕТ ВЛОЖЕННОСТИ-->
          <router-link
            v-if="data.child === 0"
            :to="idLinks" :style="{color: themeActiveComp ? themeActiveComp.navigationBackground.color : ''}" >
            <administration
              v-if="data.icon !== '' &&  data.name.toLowerCase() === 'administration'"
            />

            <icon__settings
              v-if="data.name.toLowerCase() === 'settings'"
            />
            <icon-wiki
              v-if="data.icon !== '' && data.name.toLowerCase() === 'wiki'"
            />
            <icon__file-storage
              v-if="data.name.toLowerCase() === 'storage file'"
            />
            <icon-technical-support
              v-if="data.name.toLowerCase() === 'support'"
            />
            <span :style="{color: themeActiveComp ? themeActiveComp.navigationBackground.color : ''}"> {{ _(data.name) }} </span>
          </router-link>
          <!--          ЕСЛИ ЕСТЬ ВЛОЖЕННОСТЬ-->
          <div
            class="child-links"
            v-else>
            <router-link
              :to="idLinks"
              :style="{color: themeActiveComp ? themeActiveComp.navigationBackground.color : ''}">
              <administration
                v-if="data.name.toLowerCase() === 'administration'"
              />

              <icon__settings
                v-if="data.name.toLowerCase() === 'settings'"
              />
              <icon-wiki
                v-if="data.name.toLowerCase() === 'wikipedia'"
              />
              <icon-navigation-testings
                v-if="data.name.toLowerCase() === 'testings'"
              />
              <icon__file-storage
                v-if="data.name.toLowerCase() === 'storage file'"
              />
              <icon-technical-support
                v-if="data.name.toLowerCase() === 'support'"
              />
              <span :style="{color: themeActiveComp ? themeActiveComp.navigationBackground.color : ''}"> {{ _(data.name) }} </span>
              <arrow
                v-if="data.child.length > 0"
                style="margin-left: 15px; transition: .2s"
                :style="transormIcon"
              />
            </router-link>
            <recurs-link
              v-if="showChildren"
              v-for="item in data.child"
              :openClose="open"
              :data="item"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import IconNavigationTestings from "../IconNavigation/icon-navigation-testings";
    import IconNavigationHome from "../IconNavigation/iconNavigationHome";
    import IconNavigationUsers from "../IconNavigation/icon-navigation-users";
    import Administration from "../IconNavigation/administration";
    import IconWiki from "../IconNavigation/wiki";
    import Arrow from "../../icon/arrow";
    import Icon__fileStorage from "../IconNavigation/icon__fileStorage";
    import IconTechnicalSupport from "../IconNavigation/texhnicalSupport";
    import Icon__settings from "../IconNavigation/icon__settings";

    export default {
        /**
         * КОМПОНЕНТ РЕКУРСИВНЫЙ
         * ОТРИСОВЫВАЕТ ССЫЛКИ В БОКОВОМ МЕНЮ
         * @param props:
         *              data          - object объект хранящий в себе инфу по ссылке или блоку ссылок
         *              openClose     - открыт ли блок
         *
         *
         *
         *
         *              ПРИМЕР ВХОДНОГО МАССИВА
         *                                      [
         *                                          {title: 'Home', link: '/home',icon:'home',child:[
         *                                                                 {title:'уровень 1',child:[
         *                                                                         {title:'уровень 1-2',child:[]},
         *                                                                         {title:'уровень 1-2',child:[]},
         *                                                                     ]},
         *                                                                 {title:'уровень 1',child:[]},
         *                                                                 {title:'уровень 1',child:[]},
         *                                                             ]},
         *                                          {title: 'Users', link: '/users',icon:'users',child:[]},
         *                                          {title: 'Testings', link: '/testings',icon:'testings',child:[]},
         *                                      ]
         */
        name: "recursLink",
        components: {
            Icon__settings,
            IconTechnicalSupport,
            Icon__fileStorage,
            Arrow, IconWiki, Administration, IconNavigationUsers, IconNavigationHome, IconNavigationTestings
        },
        props: {
            data: Object,
            openClose: Boolean
        },
        data() {
            return {
                showChildren: false,
                open: false,
            }
        },
        watch: {
            // ЛОВИМ ИЗМЕНЕНИЯ ОТ РОДИТЕЛЯ ПО ОТКРЫТОМУ БЛОКУ
            openClose(data) {
                this.open = data;
                if (!data) {
                    this.showChildren = false
                }
            }
        },
        computed: {
            //МЕТОД ДОБАВЛЕНИЯ id в строку
            idLinks() {
                return this.data.link.replace(':id', this.$store.getters.INFOUSER.id)
            },
            //метод изменения стилей иконки ( разворот-поворот) взависимости от отображать ли детей
            transormIcon() {
                return this.showChildren ? `transform: rotate(-90deg)` : `transform: rotate(90deg)`
            }
        },
        methods: {
            /**
             * метод отображающий детей, если блок открыт
             */
            clickShowActive() {
                if (this.open) {
                    this.showChildren = !this.showChildren
                }
            },
            //метод по отображению вложенного списка
            openNesting(data) {
                this.$store.commit('SET_DROPDOWNMENU', {
                    top: this.$el.offsetTop, //положение сверху
                    left: this.$el.offsetWidth, //положение слева
                    dataLinks: data, //массив объектов во всеми данными по доченим ссылкам
                    title: this.$el.dataset.name, //название блока ссылок
                    type: 'link'
                })
            }
        },
        mounted() {
            //ловим инфу , открыт ли блок
            this.open = this.openClose
        }
    }
</script>

<style lang="less">
  #recursLink {
    width: 100%;
    height: auto;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: .3s ease-in-out;

    > div {
      height: auto;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      transition: .3s ease-in-out;

      .icon {
        min-width: 42px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-close {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;

          > a {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            /*padding: 0 2vh;*/
          }

        }

        &-open {
          width: 100%;
          height: auto;
          box-sizing: border-box;

          a > {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: 0 2vh;

            > span {
              margin-left: 5px;
            }
          }
        }
      }

      > span {

      }
    }
  }

  a:hover, .icon-close:hover {
    background: #dcdcdc;
  }
</style>
