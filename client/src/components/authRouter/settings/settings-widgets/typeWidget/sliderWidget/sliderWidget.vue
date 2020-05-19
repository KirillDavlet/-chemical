<template>
    <div class="slider-widget" @mousemove="displayNavigationButtons = false" @mouseleave="displayNavigationButtons = true">
      <div class="slider-widget__workspace" v-if="dataSlider && dataSlider.length > 0"
           :style="{width: sizeAllContainer + '%', marginLeft: - sliderOffsetStep * sliderActive + '%'}">
          <div class="slider-widget__workspace-el"
               v-if="!numberElSlider"
               v-for="(el, i) in dataSlider"
               :key="i"
               :style="{width: sliderOffsetStep + '%'}">
            <div class="slider-widget__workspace-el__container" v-if="el.img" :style="{backgroundImage: `url(${el.img})`}">
                <div class="slider-widget__workspace-el__container-description">
                  <div class="slider-widget__workspace-el__container-description-title" v-if="el.title && el.title !== ''">
                      <span>{{ el.title }}</span>
                  </div>
                  <div class="slider-widget__workspace-el__container-description-desc" v-if="el.description && el.description !== ''">
                    <span>{{ el.description.length > 50 ? el.description.substr(0, 50) + '...' : el.description }}</span>
                  </div>
                </div>
            </div>
            <div class="slider-widget__workspace-el__container" v-if="!el.img || el.img === ''" :style="{background: randomGradient}">
              <div class="slider-widget__workspace-el__container-description">
                <div class="slider-widget__workspace-el__container-description-title" v-if="el.title && el.title !== ''">
                  <span>{{ el.title }}</span>
                </div>
                <div class="slider-widget__workspace-el__container-description-desc" v-if="el.description && el.description !== ''">
                  <span>{{ el.description.length > 80 ? el.description.substr(0, 80) + '...' : el.description }}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="slider-widget__empty" v-if="!dataSlider || dataSlider.length === 0">
        <empty-content label="По вашему профилю, в данном виджите пока что нет иформации" type-resource="slider"/>
      </div>
      <div class="slider-widget__navigation" v-if="!numberElSlider && dataSlider && dataSlider.length > 0">
        <div class="slider-widget__navigation-next" :class="{'next-navigation' : displayNavigationButtons, 'next-navigation-reverse' : !displayNavigationButtons}" @click="sliderStep('next')">
          <arrow />
        </div>
        <div class="slider-widget__navigation-back" :class="{'back-navigation' : displayNavigationButtons, 'back-navigation-reverse' : !displayNavigationButtons }" ref="navigationBack" @click="sliderStep('back')">
            <arrow style="transform: rotate(180deg)"/>
        </div>
      </div>
    </div>
</template>

<script>
    import Arrow from "../../../../../icon/arrow";
    import EmptyContent from "../../../../../mainComponent/emptyContent/emptyContent";
    export default {
        name: "sliderWidget",
        components: {EmptyContent, Arrow},
        computed: {
            // свойство по возврату градиента
          randomGradient() {
              return this.gradient[Math.ceil(Math.random() * this.gradient.length)]
          }
        },
        props: {
            // данные по slider
            dataSlider: {
                type: Array,
                default: () => []
            },
            sizeCont: {
              type: String,
              default: ''
            },
            /**
             * параметр отвечающий за количество отображаемых элементов на каждой странице слайдера
             * :TODO пока что напишу 1 элемент на 1 странице
             */
            numberElSlider: {
                type: Number,
                default: null
            },
            /**
             * параметр отвечающий за автоматическую смену страниц
             */
            auto: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                sliderEl: null, // количество элементов slider`а,
                sliderAllCount: null, // количество страниц слафдера
                sliderActive: 0, //активный слайдер
                sizeAllContainer: null, //размер всего блока под странички слайдера
                sliderOffsetLeft: null,// Отступ тела со слайдами в контейнере
                sliderOffsetStep: null, // Шаг одного слайда = его длина
                // параметр отображает возможность при наведении отображдать кнопки, при уходе убирать кнопки навигации
                displayNavigationButtons: true
            }
        },
        methods: {
            /**
             * метод инициализации слайдера
             */
            initComp() {
                this.sliderEl = this.dataSlider.length; // записал количество элементов в slider
                if(this.numberElSlider) {
                    //:TODO потом дописать логику отображения по несколько эл в слайдере
                }
                // если 1 элемент = 1 слайдеру, тогда приравниваю их
                else {
                    this.sliderAllCount = this.sliderEl;
                }
                this.sliderOffsetStep = 100; // записал размер 1 шага ( весь блок по ширине ) :TODO возможно нужно этот параметр перезаписывать от размера окна
                this.sliderOffsetLeft = this.sliderActive * this.sliderOffsetStep; // записал отступ а слайдере (по факту присвоил 0, но если параметр измениться тогда перерасчёт будет сразу)
                this.sizeAllContainer = this.sliderOffsetStep * this.sliderAllCount; // записал общий размер блока под slider
            },
            /**
             * метод перехода по страничкам
             * @param action - куда идем
             */
            sliderStep(action) {
                if(action === 'next') {
                    if(this.sliderActive === this.sliderAllCount-1) {
                        this.sliderActive = 0
                    } else {
                        this.sliderActive++
                    }
                } else {
                    if(this.sliderActive === 0) {
                        this.sliderActive = this.sliderAllCount-1
                    } else {
                        this.sliderActive--
                    }
                }
            },
            buttonActive() {

            }
        },
        mounted() {
            this.initComp()
        },
    }
</script>

<style lang="less">
.slider-widget {
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  position: relative;
  &__empty {
    min-width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__workspace {
    min-width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    transition: .2s ease-in-out;
    &-el {
      width: 100%;
      height: 100%;
      &__container {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        align-items: flex-end;
        &-description {
          width: 100%;
          height: 35%;
          background: rgba(0, 0, 0, 0.47);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 10px 15px;
          &-title {
            width: 100%;
            > span {
              font-weight: 500;
              font-size: 1.8em;
              letter-spacing: 0.314509px;
              color: #FFFFFF;
            }
          }
          &-desc {
            width: 100%;
            margin-top: .5em;
            > span {
              font-weight: normal;
              font-size: 1em;
              letter-spacing: 0.209672px;
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }
  &__navigation {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    > div {
      width: 2em;
      height: 2em;
      border: 1px solid gray;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      cursor: pointer;
      border-radius: 50%;
      transition: .2s ease-in-out;
    }
    &-next {
      top: calc(50% - 2em);
      right: 15px;
    }
    &-back {
      top: calc(50% - 2em);
      left: 15px;
    }
  }

  .next-navigation {
    animation: next .2s ease-in-out forwards;
  }

  .back-navigation {
    animation: back .2s ease-in-out forwards;
  }

  .next-navigation-reverse {
    animation: nextReverse .2s ease-in-out forwards;
  }

  .back-navigation-reverse {
    animation: backReverse .2s ease-in-out forwards;
  }

  @keyframes next{
    0%{
      top:calc(50% - 2em);
      opacity: 1;
    }
    100%{
      top:-100%;
      opacity: 0;
    }
  }
  @keyframes back{
    0%{
      top:calc(50% - 2em);
      opacity: 1;
    }
    100%{
      top:100%;
      opacity: 0;
    }
  }
  @keyframes nextReverse{
    0%{
      top:-100%;
      opacity: 0;
    }
    100%{
      top:calc(50% - 2em);
      opacity: 1;
    }
  }
  @keyframes backReverse{
    0%{
      top:100%;
      opacity: 0;
    }
    100%{
      top:calc(50% - 2em);
      opacity: 1;
    }
  }


}
</style>
