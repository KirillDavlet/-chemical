<template>
  <div id="sliderBlock" ref="sliderBlock">
    <div class="slider-block__sliders" ref="sliders"
         :style="{width:`calc(100% * ${numberSlide})`, marginLeft:-sliderOffsetLeft+'px', transition: animationStyle}">
      <div class="slide"
           v-for="(item, i) in info"
           :style="{
           width: `calc(100% / ${numberSlide})`,
           backgroundImage: `url(${item.img})`
           }"
      >
        <div class="slide__info">
          <div
            class="slide__info-title"
            :class="i == activeSlider ? 'active-title' : ''"
          >
            <span> {{ item.title }} </span>
          </div>
          <div
            class="slide__info-body"
            :class="i == activeSlider ? 'active-body' : ''"
          >
            <span> {{ item.info }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="next" @click="next">
      <arrow
        width="14"
        height="14"
      />
    </div>
    <div class="arrow" @click="arrow">
      <arrow
        width="14"
        height="14"
        style="transform: rotate(180deg)"
      />
    </div>
    <div class="navigation" v-if="navigation">
      <div class="navigation-circle" v-for="(circle,i) in numberSlide">
        <div class="circle" @click="transitionActive" :data-circle="i"
             :class="i == activeSlider ? 'circle active' : 'circle'"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import Arrow from "../icon/arrow";

    export default {
        name: "sliderBlock",
        components: {Arrow},
        props: {
            info: Array,
            navigation: Boolean,
            carScrolling: Boolean,
        },
        data() {
            return {
                numberSlide: 0,
                activeSlider: 0,
                previousActiveSlider: 0,
                sliderOffsetLeft: 0,
                sliderOffsetStep: 0,
                animationStyle: null,
                autoScrolling: true,
                timeAutoScroll: 15000
            }
        },
        watch: {
            animationStyle() {
                return this.animationStyle;
            },
        },
        methods: {
            next() {
                this.previousActiveSlider = this.activeSlider;
                if (this.sliderOffsetLeft + this.sliderOffsetStep >= this.sliderOffsetStep * this.numberSlide) {
                    this.sliderOffsetLeft = 0;
                    this.activeSlider = 0
                } else {
                    this.sliderOffsetLeft += this.sliderOffsetStep;
                    this.activeSlider++
                }
                if (!this.animationStyle) {
                    this.animationStyle = '.2s linear'
                }
            },
            arrow() {
                this.previousActiveSlider = this.activeSlider;
                if (this.sliderOffsetLeft - this.sliderOffsetStep < 0) {
                    this.sliderOffsetLeft = this.sliderOffsetStep * this.numberSlide - this.sliderOffsetStep;
                    this.activeSlider = this.numberSlide - 1
                } else {
                    this.sliderOffsetLeft -= this.sliderOffsetStep;
                    this.activeSlider--;
                }
                if (!this.animationStyle) {
                    this.animationStyle = '.2s linear'
                }
            },
            transitionActive(e) {
                if (!this.animationStyle) {
                    this.animationStyle = '.2s linear'
                }
                this.activeSlider = e.currentTarget.dataset.circle;
                this.previousActiveSlider = this.activeSlider;
                this.sliderOffsetLeft = this.activeSlider * this.sliderOffsetStep;
            },
            initSlider() {
                this.numberSlide = this.info.length;
                if( this.$refs.sliderBlock) {
                    this.sliderOffsetStep = this.$refs.sliderBlock.clientWidth;
                }

            }
        },
        mounted() {
            this.initSlider();
            this.autoScrolling = this.carScrolling;
            if(this.autoScrolling) {
               setInterval(()=> {
                    this.next()
                },this.timeAutoScroll)
            }
        },
        beforeUpdate() {
            this.initSlider();
            window.addEventListener('resize', () => {
                this.initSlider();
                if(this.$refs.sliderBlock) {
                    this.sliderOffsetStep = this.$refs.sliderBlock.clientWidth
                }

            })
        },
        updated() {
            this.initSlider();
        }
    }
</script>

<style lang="less">
  #sliderBlock {
    height: 90%;
    background: #FFFFFF;
    align-items: center;
    box-shadow: 0 10.4661px 31.3983px rgba(209, 213, 223, 0.5);
    border-radius: 4.18644px;
    overflow: hidden;
    position: relative;

    .next, .arrow {
      position: absolute;
      top: calc(50% - 26px);
      font-size: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: rgba(112, 116, 135, 0.8);
      border-radius: 50%;
      width: 26px;
      height: 26px;
      z-index: 10;
    }

    .next {
      right: 15px;
      z-index: 2;
    }

    .arrow {
      left: 15px;
      z-index: 2;
    }

    .navigation {
      position: absolute;
      bottom: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      z-index: 2;

      > div {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 2px solid white;
        margin: 0 4px;
        box-sizing: border-box;

        .circle {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .circle.active:before {
          content: '';
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: #FFFFFF;
          opacity: 0;
          animation: transitionCircle .2s ease-in-out forwards;
        }
      }
    }

    .slider-block__sliders {
      height: 100%;
      display: flex;
      /*transition: .4s ease-in-out;*/
      background: #FFFFFF;

      > div {
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        .slide__info {
          width: 100%;
          height: 100%;

          &-title {
            padding: 15px 55px;
            position: relative;
            z-index: 2;
            opacity: 0;

            span {
              font-size: 2vw;
              line-height: 32px;
              letter-spacing: 0.02em;
              color: #FFFFFF;
            }
          }

          &-body {
            padding: 15px 55px;
            position: relative;
            z-index: 2;
            opacity: 0;
            span {
              font-size: 1vw;
              letter-spacing: 0.02em;
              line-height: 24px;
              color: #FFFFFF;
            }
          }

          &:before {
            content: '';
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
          }
        }

      }
    }

    .active-title {
      animation: animationCard .4s ease-in-out forwards;
    }

    .active-body {
      animation: animationCard .3s .1s ease-in-out forwards;
    }
  }

  @keyframes transitionCircle {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes animationCard {
    0%{
      transform: translateX(-20px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
