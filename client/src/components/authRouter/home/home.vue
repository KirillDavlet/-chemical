<template>
  <div id="home" style="margin-top: 45px">
    <div class="home">
      <div class="home-title">
        <span>Домашняя</span>
      </div>
      <div class="home-body">
        <widget-container
          v-for="widget in get__activeWidgets"
          :full="widget.full"
          :id-widget="widget.id"
          :key="widget.id"
          :data-widget="widget.data"
          :type-widget="widget.type"/>
      </div>
    </div>
  </div>
</template>

<script>
    import Layout from "../../layout/layout";
    import Slider from "../../slider/slider";
    import Cm__selectionTestCard from "../../testings/test-selection/cm__selection-test-card";
    import WidgetContainer from "../settings/settings-widgets/widgetContainer/widgetContainer";

    export default {
        name: "home",
        components: {WidgetContainer, Cm__selectionTestCard, Slider, Layout},
        computed: {
          get__activeWidgets() {
              return this.$store.getters.get_widgetsInRole
          }
        },
        mounted() {
            this.$store.dispatch('WidgetsInRole'); // :TODO получаем данные с хранилища ( сервера ) по виджетам
            this.$store.commit('SET_LOADER', false);
        }
    }
</script>

<style lang="less">
  #home {
    width: 100%;
    height: 200vh;
    box-sizing: border-box;

    .home {
      width: 100%;
      height: 100%;

      &-title {
        width: 100%;
        height: 50px;

        > span {
          padding: 5px 15px;
          font-size: 36px;
          color: black;
          letter-spacing: 0.02em;
        }
      }

      &-body {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
</style>
