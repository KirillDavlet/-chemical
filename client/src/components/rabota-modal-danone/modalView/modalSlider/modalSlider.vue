<template>
  <div class="modal-slider" @keydown="modalliderClose">
    <div class="modal-slider-container">
      <div class="modal-slider-container-slider" :style="step">
        <div v-for="(el, i) in dataSlider.arrayUrl" :style="{backgroundImage: `url(${el})`}"></div>
      </div>
    </div>
    <div class="modal-slider-next" v-if="dataSlider.arrayUrl.length > 1" @click="stepSlider('next')">
      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.707107 17.3229C0.316582 17.7134 0.316583 18.3466 0.707107 18.7371L1.06289 19.0929C1.45342 19.4834 2.08658 19.4834 2.47711 19.0929L11.67 9.9L2.47711 0.707107C2.08658 0.316583 1.45342 0.316582 1.06289 0.707107L0.707107 1.06289C0.316582 1.45342 0.316583 2.08658 0.707107 2.47711L8.13 9.9L0.707107 17.3229Z"
          fill="white"/>
      </svg>

    </div>
    <div class="modal-slider-back" v-if="dataSlider.arrayUrl.length > 1" @click="stepSlider('back')">
      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.2929 17.3229C11.6834 17.7134 11.6834 18.3466 11.2929 18.7371L10.9371 19.0929C10.5466 19.4834 9.91342 19.4834 9.52289 19.0929L0.33 9.9L9.52289 0.707107C9.91342 0.316583 10.5466 0.316582 10.9371 0.707107L11.2929 1.06289C11.6834 1.45342 11.6834 2.08658 11.2929 2.47711L3.87 9.9L11.2929 17.3229Z"
          fill="white"/>
      </svg>

    </div>
    <div class="modal-slider-close" @click="modalliderClose">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.6" cx="12" cy="12" r="12" fill="#51565F"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17.4 7.8C17.7314 7.46863 17.7314 6.93137 17.4 6.6C17.0686 6.26863 16.5314 6.26863 16.2 6.6L12 10.8L7.8 6.6C7.46863 6.26863 6.93137 6.26863 6.6 6.6C6.26863 6.93137 6.26863 7.46863 6.6 7.8L10.8 12L6.6 16.2C6.26863 16.5314 6.26863 17.0686 6.6 17.4C6.93137 17.7314 7.46863 17.7314 7.8 17.4L12 13.2L16.2 17.4C16.5314 17.7314 17.0686 17.7314 17.4 17.4C17.7314 17.0686 17.7314 16.5314 17.4 16.2L13.2 12L17.4 7.8Z"
              fill="white"/>
      </svg>

    </div>
  </div>
</template>

<script>
    export default {
        name: "modalSlider",
        props: {
            dataSlider: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                activePage: null // активная страинца
            }
        },
        computed: {
            step() {
                return {left: `-${this.activePage * 100}%`}
            },
            styleSlider() {
                return {width: `${this.dataSlider.arrayUrl.length * 100} %`}
            }
        },
        methods: {
            modalliderClose() {
                this.$emit('closeModalSlider')
            },
            stepSlider(action) {
                if (action === 'next') {
                    if (this.activePage < this.dataSlider.page) {
                        this.activePage++
                    } else if (this.activePage === this.dataSlider.page) {
                        this.activePage = 0
                    }
                } else if (action === 'back') {
                    if (this.activePage === 0) this.activePage = this.dataSlider.page;
                    else if (this.activePage > 0) this.activePage--
                }
            },
            /**
             * выход из просмотра с помощью esc
             * @param e
             */
            exitKey(e) {
                if (e.key === 'Escape') this.modalliderClose()
            },
            // переход к новой картинке по кнопкам
            nextKey(e) {
                if (e.key === 'ArrowRight') this.stepSlider('next');
                else if(e.key === 'ArrowLeft')  this.stepSlider('back');
            },
        },
        mounted() {
            this.activePage = this.dataSlider.activePage;
            document.addEventListener('keydown', this.exitKey, false);
            document.addEventListener('keydown', this.nextKey, false);
        },
        destroyed() {
            document.removeEventListener('keydown', this.exitKey, false);
            document.removeEventListener('keydown', this.nextKey, false);
        }
    }
</script>

<style lang="less">
  .modal-slider {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;

    &-container {
      width: 80%;
      height: 90%;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      &-slider {
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        transition: .2s ease-in-out;

        > div {
          height: 100%;
          min-width: 100%;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }

    &-close {
      position: absolute;
      top: 2em;
      right: 2em;
      cursor: pointer;
    }

    &-next, &-back {
      width: 48px;
      height: 48px;
      position: absolute;
      top: calc(50% - 24px);
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    &-next {
      right: 5%;
    }

    &-back {
      left: 5%;
    }
  }

  @media (max-width: 916px) {
    .modal-slider {
      &-container {
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
