<template>
  <div id="menuInfoUser"
       :style="{
        transform: openClose,
        background: themeActive && themeActive.navigationBackground.background,
        color: themeActive && themeActive.navigationBackground.color,
      }"
  >
    <div class="menu-info">
      <div class="menu-info__photo">
        <div
          class="menu-info__photo__style"
          >
        </div>
        <div class="menu-info__photo-img">

        </div>
      </div>
      <div class="menu-info__data">
        <div class="menu-info__data-FIO">
          <span v-if="dataUserFIO">{{ dataUserFIO }}</span>
        </div>
        <div class="menu-info__data-phone">
          <a
            :style="{color: themeActive && themeActive.navigationBackground.color}"
            :href="'tel:'+dataUserPhone"><span v-if="dataUserPhone">{{ dataUserPhone }}</span></a>
        </div>
        <div class="menu-info__data-position" :style="{color: themeActive && themeActive.navigationBackground.color}">
          <span v-if="dataUserPosition">{{ dataUserPosition }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "menuInfoUser",
        computed: {
            openClose() {
                if (!this.$store.getters.MENUINFOUSER) {
                    return 'translateX(340px)'
                } else {
                    return 'translateX(0)'
                }
            },
            // ОТСЛЕДИВАЕМ ИЗМЕНЕНИЕ ТЕМЫ
            themeActive() {
                if (this.$store.getters.get_activeThemeSwitcher.selectedTheme && this.$store.getters.get_activeThemeSwitcher.selectedTheme.active) {
                    return this.$store.getters.get_activeThemeSwitcher.selectedTheme.mandatory
                } else if(this.$store.getters.get_activeThemeSwitcher.standart && this.$store.getters.get_activeThemeSwitcher.standart.active) {
                    return this.$store.getters.get_activeThemeSwitcher.standart.mandatory
                } else {return null}
            },
            /**
             * МЕТОД ФОРМАТИРОВАНИЯ ИНЕЦИАЛОВ
             * */
            dataUserFIO() {
                return `${this.$store.getters.INFOUSER.firstName} ${this.$store.getters.INFOUSER.nameUser} ${this.$store.getters.INFOUSER.lastName}`
            },
            /**
             * МЕТОД ФОРМАТИРОВАНИЯ ТЕЛЕФОНА
             * @returns {string}
             */
            dataUserPhone() {
                if(this.$store.getters.INFOUSER.phone.length > 6) {
                    return `${this.$store.getters.INFOUSER.phone[0]}
                (${this.$store.getters.INFOUSER.phone.slice(1,4)})
                ${this.$store.getters.INFOUSER.phone.slice(4,7)}-${this.$store.getters.INFOUSER.phone.slice(7,9)}-${this.$store.getters.INFOUSER.phone.slice(9,11)}
                `
                } else {
                    return `${this.$store.getters.INFOUSER.phone}`
                }

            },
            /**
             * метод форматирования должности
             * @returns {string}
             */
            dataUserPosition() {
                return `Должность - ${this.$store.getters.INFOUSER.positionUser}`
            },
        }
    }
</script>

<style lang="less">
  #menuInfoUser {
    height: calc(100vh - 45px);
    width: 320px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
    position: fixed;
    top: 45px;
    right: 0;
    transition: .3s ease-in-out;
    z-index: 500;

    .menu-info {
      width: 100%;
      height: 100%;

      &__photo {
        width: 100%;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &-img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          z-index: 100;
          background-image: url("../../../../static/image/UserNoPhoto.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        &__style {
          content: '';
          position: absolute;
          top: 0;
          width: 100%;
          height: 50%;
          background: #D4E3FB;
          z-index: 50;
        }
      }

      &__data {
        padding: 0 15px;
        > div:not(:last-child) {
          margin-bottom: 12px;
        }
        &-FIO {
          >span {
            text-transform: capitalize;
            font-size: 20px;
            line-height: 24px;
            letter-spacing: 0.02em;
          }
        }
        &-phone {
          > a {
            text-decoration: none;
            > span {
            }
          }
        }
      }
    }
  }
</style>
