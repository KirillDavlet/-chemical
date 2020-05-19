<template>
  <div id="allColorScheme">
    <div class="active-theme-title">
      <span>Активные цветовые схемы</span>
      <div
        class="active-theme-title__checked"
      >
      </div>
    </div>
    <div class="active-theme-block">
      <theme-card-options
        ref="active-theme-block"
        v-for="item in activeTheme"
        :choice="false"
        :data-card-theme="item"
        :key="Math.random()"
      />
    </div>
    <span>Все цветовые схемы</span>
    <div class="all-theme">
<!--      // Стандартную тему не отображаю -->
      <theme-card-options
        v-for="(item, i) in availableTheme"
        v-if="item.type === 'standart' ? false : true"
        :data-card-theme="item"
        :active-theme-edit="activeThemeEdit"
        :key="`theme-${i}`"
        @topicSelection="topicSelectionParent"
      />
    </div>
  </div>
</template>

<script>
    import ThemeCardOptions from "./themeCardOptions/themeCardOptions";

    /**
     * компонент отображающий все цветовые схемы
     */
    export default {
        name: "allColorScheme",
        components: {ThemeCardOptions},
        props: {
            // Все темы
            availableTheme: {
                type: Array,
                default: ()=> []
            },
            // Активные темы
            activeTheme: {
                type: Object, default: ()=> {}
            },
            // тема которая активная - id ( для визуализации )
            activeThemeEdit: {
                type: Number,
                default: null
            }
        },
        watch: {
            activeThemeEdit(data) {console.log(data)}
        },
        methods: {
            /**
             * метод обработки выбранной темы
             */
            topicSelectionParent(id) {
              this.$emit('topicSelection', id)
            },
        },
    }
</script>

<style lang="less">
#allColorScheme {
  width: 100%;
  height: auto;

  .active-theme-title {
    display: flex;
    width: 100%;
    margin-top: 15px;
    justify-content: flex-start;
    align-items: center;
    > span {
      font-weight: normal;
      font-size: 24px;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: #696969;
      margin-right: 15px;
    }
    &__checked {
        cursor: pointer;
    }
  }

  .active-theme-block {
    width: 100%;
    display: flex;
    margin-top: 25px;
  }
  .all-theme {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;
    > div {
      margin-bottom: 25px;
    }
  }
}
</style>
