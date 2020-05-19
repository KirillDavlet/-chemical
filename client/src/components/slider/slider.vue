<!-- Слайдер -->
<template>
  <div id="slider" ref="slider">
    <div class="slider" v-if="dataInfo">
      <slider__header :title="dataInfo.title"/>
      <slider-block
        :info="dataInfo.data"
        :navigation="navigationSlider"
        :carScrolling="carScrolling"
      />

    </div>
  </div>
</template>

<script>
    import Slider__header from "./slider__header";
    import SliderBlock from "./sliderBlock";
    /**
     * Данный слайдер принимает
     * - sizeSlider = размер окна ( целый, половина, треть) Пример - typeSize big, half, third. стандартно big
     * @param props
     * dataInfo         - объект данных объектов для модуля слайдера
     * navigation       - boolean определяет , отображать ли навигацию внизу
     * carScrolling     - boolean определяет, прокручивать ли информацию автоматически
     *
     * @param data
     * sizeSlider     - определяет размер салйдера, по проверке добавляется класс, необходим для более точной настройки
     * buttNavigation - для записи параметра buttonNavigation для каждого экземпляра
     * */
    export default {
        name: "slider",
        components: {SliderBlock, Slider__header},
        props: {
            dataInfo: Object,
            navigation: Boolean,
            carScrolling: Boolean,
        },
        data() {
            return {
                dataInfoSlider: {},
                navigationSlider: true,
            }
        },
        methods: {
          init() {
              this.dataInfoSlider = this.dataInfo;
              this.navigationSlider = this.navigation;
          }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="less">

  #slider {
    height: auto;
    max-height: 600px;
    width: 100%;

    .slider {
      width: 100%;
      height: 100%;
    }
  }

</style>
