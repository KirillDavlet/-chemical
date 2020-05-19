<template>
    <div class="card-in-slider">
      <div class="card-in-slider__body" @mousedown="activeSlider=true" @mouseup="activeSlider=false">
        <div class="card-in-slider__body-el" v-if="dataSlider.length > 0 && dataSlider" v-for="(el,i) in dataSlider" :style="styleEl">
            <card-mini :data-card="el"/>
        </div>
        <div class="card-in-slider__body-empty" v-if="dataSlider.length === 0 || !dataSlider">
          <empty-content label="По вашему профилю, в данном виджите пока что нет иформации" type-resource="card"/>
        </div>
      </div>
    </div>
</template>

<script>
    import CardMini from "../../../../../mainComponent/card/card-mini";
    import EmptyContent from "../../../../../mainComponent/emptyContent/emptyContent";
    export default {
        name: "cardInSlider",
        components: {EmptyContent, CardMini},
        props: {
            // данные по слайдеру
            dataSlider: {
                type: Array,
                default: () => []
            },
            sizeCont: {
                type: String,
                default: ''
            },
        },
        computed: {
          styleEl() {
              return {width:`${this.sizeCard}px`, minWidth: `${this.sizeCard}px`}
          }
        },
        data() {
            return {
                pageCounter: null, // количество страниц с учётом изменения размера блока под карточки
                sizeCard: 250, // размер карточки
                activeSlider: false // флаг отвечает за состяние нажатия и убирания прокрутки
            }
        },
        watch: {
            activeSlider(data) {
                console.log(data)
                //TODO как уже буду писать дял главной страницы Тогда и смотреть (без drag and drop)
            }
        }
    }
</script>

<style lang="less">
.card-in-slider {
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  &__body {
    height: 100%;
    overflow-x: auto;
    max-width: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding: 15px;
    box-sizing: border-box;

    &-el {
      height: 100%;
      background: #FFFFFF;
      box-shadow: 0 10px 30px rgba(209, 213, 223, 0.5);
      border-radius: 4px;
      margin: 0 9px;
    }
    &-empty {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
}
</style>
