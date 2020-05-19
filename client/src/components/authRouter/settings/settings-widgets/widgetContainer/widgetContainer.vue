<template>
    <div class="widget-container" :style="sizeContainer">
      <div class="widget-container__title">
        <span v-if="!settings">Название виджета - {{ idWidget }}</span>
        <span v-if="settings">виджет - {{ typeWidget }}</span>
        <div class="widget-container__title__icons" v-if="settings">
          <div class="widget-container__title__icons-settings" @click="actionsIcon('settings')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.7656 5.48438L23.2031 12L17.7656 18.5156L16.2188 17.25L20.5781 12L16.2188 6.75L17.7656 5.48438ZM11.0156 12.9844V11.0156H12.9844V12.9844H11.0156ZM17.0156 11.0156V12.9844H15V11.0156H17.0156ZM6.98438 12.9844V11.0156H9V12.9844H6.98438ZM7.78125 6.75L3.42188 12L7.78125 17.25L6.23438 18.5156L0.796875 12L6.23438 5.48438L7.78125 6.75Z" fill="#666666"/>
            </svg>
          </div>
          <div class="widget-container__title__icons-delete" @click="actionsIcon('delete')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9844 3.98438V6H5.01562V3.98438H8.48438L9.51562 3H14.4844L15.5156 3.98438H18.9844ZM6 18.9844V6.98438H18V18.9844C18 19.5156 17.7969 19.9844 17.3906 20.3906C16.9844 20.7969 16.5156 21 15.9844 21H8.01562C7.48438 21 7.01562 20.7969 6.60938 20.3906C6.20312 19.9844 6 19.5156 6 18.9844Z" fill="#666666"/>
            </svg>

          </div>
        </div>
      </div>
      <slider-widget  :size-cont="sizeContainer.width"  v-if="typeWidget === 'slider'" :data-slider="dataWidget"/>
      <card-in-slider :size-cont="sizeContainer.width"  v-if="typeWidget === 'cardInSlider'" :data-slider="dataWidget"/>
    </div>
</template>

<script>

    import WidgetTest from "../typeWidget/test/widgetTest";
    import SliderWidget from "../typeWidget/sliderWidget/sliderWidget";
    import CardInSlider from "../typeWidget/cardInSlider/cardInSlider";
    export default {
        name: "widgetContainer",
        components: {CardInSlider, SliderWidget, WidgetTest},
        data() {
          return {

          }
        },
        props: {
            // полный размер 100%
            full : {
                type: Boolean,
                default: false
            },
            // id виджета
            idWidget: {
                type: Number,
                default: null
            },
            // отображения блок настроек
            settings: {
                type: Boolean,
                default: false
            },
            typeWidget: {
                type: String,
                default: ''
            },
            dataWidget: {
                type: [Array, Object],
                default: ()=> []
            }
        },
        computed: {
            // правило размеров виджетов
            sizeContainer() {
                return {
                    width: this.full ? `calc(100% - 3em)` : `calc(50% - 3em)`,
                    cursor: this.settings ? 'grab' : 'default'
                }
            },
        },
        methods :{
            actionsIcon(nameActions) {
                switch (nameActions) {
                    case 'delete':
                        this.$emit('actions', {id:this.idWidget, actions: 'delete'});
                        break;
                    case 'settings':
                        this.$emit('actions', {id:this.idWidget, actions: 'settings'});
                        break;
                }
            }
        }
    }
</script>

<style lang="less">
.widget-container {
  height: 450px;
  background: #FFFFFF;
  box-shadow: 0 10px 30px rgba(209, 213, 223, 0.5);
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
  transition: .2s ease-in-out;
  margin: 1.5em;
  &__title {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span {
      font-weight: 300;
      font-size: 16px;
      line-height: 18px;
      letter-spacing: 0.02em;
      color: rgba(42, 42, 42, 0.42);
      padding-left: 15px;
    }
    &__icons {
      display: flex;
      > div {
        width: 25px;
        height: 25px;
        margin: 4px;
        cursor: pointer;
      }
    }
  }

}
</style>
