<template>
  <div class="selected-lang" @click="showMenuActive">
    <cm-toolbar :toolbar="_('language')">
      <lang/>
      <span class="selected-lang__info">{{ langActive }}</span>
    </cm-toolbar>
    <div class="selected-lang__list">
      <drop-down-menu v-if="showMenu" :settings="langList" @actionDDM="actionDDMParent"/>
    </div>
  </div>
</template>

<script>

  import Lang from "../../../../icon/lang";
  import CmToolbar from "../../../../mainComponent/toolbar/toolbar";
  import DropDownMenu from "../../../../mainComponent/SystemTable/drop-down-menu/drop-down-menu";

  export default {
    name: "selectLang",
    components: {DropDownMenu, CmToolbar, Lang},
    computed: {
      langActive() {
        return this.$store.getters.get_lang
      },
    },
    data() {
      return {
        showMenu: false
      }
    },
    methods: {
      /**
       * метод инициализации компонента и записывания активного языка
       */
      initComp() {
        if (this.langActive === '') {
          this.$store.dispatch('actions_lang', this.$store.getters.INFOUSER.userInfo.lang)
        }
      },
      actionDDMParent(data) {
        this.$store.dispatch('actions_lang', data.action)
      },
      showMenuActive() {
        this.showMenu = !this.showMenu
      }
    },
    mounted() {
      this.initComp()
    }
  }
</script>

<style lang="less">
  .selected-lang {
    margin-right: 12px;
    position: relative;
    &__info {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 10px;
    }

    &__list {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 100;
      padding: 5px;
    }

  }
</style>
