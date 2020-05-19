<template>
  <div
    id="navigationLink" :class="openClose ? styleBlockOpen : styleBlockClosed">
    <div v-if="tagIcon.toLowerCase() === 'home'">
      <icon-navigation-home/>
    </div>
    <div v-if="tagIcon.toLowerCase() === 'users'">
      <icon-navigation-users/>
    </div>
    <div v-if="tagIcon.toLowerCase() === 'testings'">
      <icon-navigation-testings/>
    </div>
    <span :style="openClose ? {marginLeft:'15px'} : {paddingTop: '1vh'} ">{{ info }}</span>
    <span v-if="openClose && child.length > 0" class="icon-way-down"></span>
  </div>
</template>

<script>
    import IconNavigationHome from "./IconNavigation/iconNavigationHome";
    import IconNavigationUsers from "./IconNavigation/icon-navigation-users";
    import IconNavigationTestings from "./IconNavigation/icon-navigation-testings";

    export default {
        /**
         * КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ ССЫЛОК
         * @param props:
         *          openClose       - параметр за открытое ли поле
         *          tagIcon         - название иконки
         *          info            - информация по ссылке
         *          child           - массив детей ( подсылок, если есть )
         *
         * @param data:
         *          styleBlockClosed    - класс для закртыого блока
         *          styleBlockOpen      - класс для открытого блока
         *
         */
        name: "navigationLink",
        components: {IconNavigationTestings, IconNavigationUsers, IconNavigationHome},
        props: {
            openClose: {
                type: Boolean,
                default: false
            },
            tagIcon: String,
            info: String,
            child: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                styleBlockClosed: 'closed',
                styleBlockOpen: 'open',
            }
        },
        watch: {
            /**
             * метод для отлавливания открывания/закрывания блока
             * @param data
             */
            openClose(data) {

            }
        },
        methods: {
        }
    }
</script>

<style lang="less">
  #navigationLink {
    width: 90%;
    padding: 0 5%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: .2s linear;

    > span {
      font-size: 2vh;
      text-align: center;
      color: #000000;
      transition: .2s ease-out;
    }

    .icon-way-down {
      border: 0.6vh solid transparent;
      border-top: 0.6vh solid gray;
      margin-left: 1vw;
    }

    .navigation-child {
      width: 100%;
      height: 200px;
      background: red;
      position: relative;
      top: 0;

    }
  }

  #navigationLink.closed {
    flex-direction: column;
    justify-content: center;
  }


  #navigationLink.open {
    justify-content: start;
    transition: .3s ease-out;
    position: relative;
  }

  #navigationLink.open:hover {
    &:before {
      content: '';
      width: 0;
      height: 1px;
      background: #689bff;
      position: absolute;
      bottom: -8px;
      animation: openHover .3s ease-in-out forwards;
    }
  }

  @keyframes openHover {
    0% {
      width: 0;
    }
    100% {
      width: 90%;
    }
  }

</style>
