<template>
  <transition name="DDMenu">
<!--    background:ActiveTheme.background, color:ActiveTheme.color-->
    <div
      v-if="getters.bool"
      :style="{top:getters.data.top+'px', left:getters.data.left+'px',}"
      id="dropdownMenu">
      <div class="dropdown__menu">
        <div class="dropdown__menu-header">
          <span>{{ getters.data.title ? getters.data.title : 'название блока' }}</span>
        </div>
        <div class="dropdown__menu-body">
          <router-link
            v-if="getters.data.type === 'link' && getters.data.type"
            v-for="link in getters.data.dataLinks"
            :to="link.link.replace(':id', linkUser)">
            <span>{{ link.title }}</span>
          </router-link>
          <div
            v-if="getters.data.type === 'text'"
            :data-set="getters.data.set"
            :data-iduser="getters.data.idUser"
            v-for="info in getters.data.data"
            :data-id="info.id"
            @click="eventDropDown"
          >
            <span>{{ info.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Axios from 'axios'
    export default {
        name: "dropdownMenu",
        computed: {
            getters() {

                return this.$store.getters.DROPDOWNMENU
            },
            //МЕТОД ОТЛАВЛИВАЮЩИЙ  ИЗМЕНЕНИЯ В ТЕМЕ И ПРИМЕНЯЮЩИЙ ИХ
            ActiveTheme() {
                return this.$store.getters.ACTIVETHEME.barLink
            },
            linkUser() {
                return this.$store.getters.INFOUSER.id
            }
        },
        methods: {
            /**
             * МЕТОД ИЗМЕнЕНИЙ ДАННЫХ
             * СОБИРАЕТ ДАННЫЕ ПО МЕТОДУ SETTER
             * id у кого меняем
             * roleID - на что меняем
             * @param e
             */
            async eventDropDown(e) {
                let user = {
                    id: e.currentTarget.dataset.iduser,
                    roleId: e.currentTarget.dataset.id,
                    typeSet: e.currentTarget.dataset.set
                }
                const res = await Axios.put('http://localhost:8081/administration/put/roleUser', user);
                //записал новые данные, по результатам запроса к database
                this.$store.getters.ADMINUSERS.forEach(el=> {
                    if(el.id == user.id) {
                        el.role = res.data.role
                    }
                });
            }
        },
        beforeUpdate() {

        }
    }
</script>

<style lang="less">
  #dropdownMenu {
    width: auto;
    min-width: 250px;
    height: auto;
    position: absolute;
    z-index: 1000;
    background: #F5F5F5;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
    padding: 5px 0;

    .dropdown__menu {
      width: 100%;
      height: auto;
      color: inherit;

      &-header {
        height: 35px;
        display: flex;
        justify-content: start;
        align-items: center;
        color: inherit;
        padding: 7px 20px;
        position: relative;
        > span {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 20px;
          color: inherit;
          letter-spacing: 0.02em;
          text-transform: capitalize;
        }
      }
      &-header:before {
        content: '';
        width: 100%;
        height: 1px;
        background: #E5E5E5;
        position: absolute;
        bottom: 0;
        left: 0;
      }

      &-body {
        display: flex;
        flex-direction: column;
        padding-top: 5px;
        cursor: pointer;
        > a, > div {
          height: 35px;
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
          padding: 7px 15px;
        }
      }
    }
  }

  .DDMenu-enter-active, .DDMenu-leave-active {
    transition: opacity .2s;
  }
  .DDMenu-enter, .DDMenu-leave-to {
    opacity: 0;
  }
</style>
