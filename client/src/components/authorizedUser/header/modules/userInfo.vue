<template>
    <div
      id="userInfo"
      @click="openCloseInfoMenu"
    >
      <div class="info">
        <div class="info-photo">
            <span v-if="dataUser">{{ initials }}</span>
        </div>
        <div class="info-role">
          <span v-if="dataUser">{{ dataUser.role }}</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "userInfo",
        data() {
            return {
                dataUser: null
            }
        },
        computed: {
            /**
             * ПОЛУЧАЕМ ИНИЦИАЛЫ пользователя
             * @returns {string}
             */
            initials() {
                return this.dataUser.firstName.slice(0,1).toUpperCase() + this.dataUser.nameUser.slice(0,1).toUpperCase()
            }
        },
        mounted() {
            /**
             * Записал данные по пользователю
             * @type {getters.INFOUSER}
             */
            this.dataUser = this.$store.getters.INFOUSER
        },
        methods: {
            /**
             * МЕТОД ОТКРЫТИЯ/ЗАКРЫТИЯ МЕНЮ ИНФОРМЦИИ ПО ПОЛЬЗОВАТЕЛЮ
             */
            openCloseInfoMenu() {
                this.$store.commit('SET_MENUINFOUSER',!this.$store.getters.MENUINFOUSER);
                this.$store.commit('SET_SWITCHMENUACTIVE', null)
            }
        }
    }
</script>

<style lang="less">
#userInfo {
  width: 180px;
  height: 100%;
  color: #FFFFFF;
  margin: 0 7px ;
  cursor: pointer;
  .info {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &-photo {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: #485B70;
      color: #FFFFFF;
      position: absolute;
      left: 10px;
      > span {
        font-size: 14px;
      }
    }
    &-role {
      width: calc(100% - 35px);
      height: 30px;
      background: #485B70;
      border-radius: 17px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > span {
        padding-right: 10px;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.02em;
      }
    }
  }
}
</style>
