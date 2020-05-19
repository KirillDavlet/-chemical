<template>
  <div id="app__auth-user">
    <auth__header/>
    <nav-menu/>
    <menu-info-user/>
    <router-view
      :style="{marginLeft:MarginLeft}"
      style="transition: .3s linear"
    />
  </div>
</template>

<script>
  import Auth__header from "./header/auth__header";
  import NavMenu from "../navigationMenu/navMenu";
  import MenuInfoUser from "./menuInfoUser/menuInfoUser";

  export default {
    name: "app__auth-users",
    components: { MenuInfoUser, NavMenu, Auth__header},
    computed: {
      MarginLeft() {
        return this.$store.getters.NAVMENUWIDTH
      },
    },
    mounted() {
      this.$store.commit('SET_LOADER', true);
      setTimeout(() => {
        this.$store.commit('SET_LOADER', false)
      }, 1000)
      this.$router.push(`/${this.$store.getters.INFOUSER.id}`).catch(err => console.log(err))//:TODO тут какая то ошибка вылезла, нужно будет разобраться потом
    }
  }
</script>

<style lang="less">
  #app__auth-user {
    display: flex;
    flex-wrap: wrap;
  }
</style>
