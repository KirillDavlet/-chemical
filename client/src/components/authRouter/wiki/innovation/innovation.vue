<template>
  <div id="wikiInnovation" :style="{color: themeActiveComp ? themeActiveComp.workspaceBackground.backgroundAll : '#1e1e1e'}">
    <div class="innovation">
      <div class="innovation__header">
        <span>{{ _('innovations') }}</span>
      </div>
      <div class="innovation__body" :style="{color: themeActiveComp ? themeActiveComp.workspaceBackground.color : '#1e1e1e'}">
        <span>{{ innovationData }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "innovation",
    computed: {
      innovationData() {
        return this.$store.getters.get_currentPageData
      }
    },
    methods: {
    },
    mounted() {
      this.get_access('wiki/innovation')
    }
  }
</script>

<style lang="less">
  #wikiInnovation {
    width: 100%;
    height: auto;
    margin-top: 45px;

    .innovation {
      width: 100%;
      height: 100%;

      &__header {
        width: 100%;
        height: 50px;

        > span {
          padding: 5px 15px;
          font-size: 36px;
          letter-spacing: 0.02em;
          text-transform: capitalize;

        }
      }
    }
  }
</style>
