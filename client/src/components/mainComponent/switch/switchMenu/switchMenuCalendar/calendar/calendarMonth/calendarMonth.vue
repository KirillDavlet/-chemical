<template>
  <div id="calendarMonth">
    <div class="month-active-year">{{ activeYear }}</div>
    <div class="months" @wheel.prevent="changeMonth">
<!--      :style="{background: currentMonth === i ? activeStyle.background : ''}"-->
      <div
        class="months-month"
        v-for="(item, i ) in listMonth"
        :key="`month-${i}`"
        ref="monthList"

      >
<!--        :style="{color: currentMonth === i ? activeStyle.color : ''}"-->
        <div @click="choiceMonth" :data-month="item.name"><span
          >{{ item.title }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "calendarMonth",
        props: {
            activeYear: {type: Number, default: 2020}, // текущий год , передаеться в обязательном порядек от родителя
            currentMonth: {type: Number, default: null} //текущий месяц передаеться в обязатекльном порядке от родителя
        },
        computed: {
            activeStyle() {
                return this.$store.getters.ACTIVETHEME.header
            }
        },
        data() {
            return {
                listMonth: [
                    {title: 'янв', name: 'January'},
                    {title: 'фев', name: 'February'},
                    {title: 'март', name: 'March'},
                    {title: 'апр', name: 'April'},
                    {title: 'май', name: 'May'},
                    {title: 'июнь', name: 'June'},
                    {title: 'июль', name: 'July'},
                    {title: 'авг', name: 'August'},
                    {title: 'сен', name: 'September'},
                    {title: 'окт', name: 'October'},
                    {title: 'ноя', name: 'November'},
                    {title: 'дек', name: 'December'}
                ],
                scrollActive: true, //флаг для прекращения воспроизведения анимации
                timerAnimation: 300 //таймер с какой скоростью сменяеться год
            }
        },
        methods: {
            /*
            метод передачи а родительский компонент активного месяца ( с годом )
             */
            choiceMonth(e) {
                this.$emit('activeMonth', {
                    year: this.activeYear,
                    month: e.currentTarget.dataset.month,
                    monthNumber: this.listMonth.findIndex(el => el.name === e.currentTarget.dataset.month)
                })
            },
            /**
             * метод прокрутки месяцев ( меняються года )
             */
            changeMonth(ev) {
                if(this.scrollActive) {
                    this.scrollActive = false
                    if (ev.deltaY < 0) {
                        this.animationMonthScroll(this.timerAnimation)
                        setTimeout(()=> {
                            this.scrollActive = true;
                            this.$emit('scrollingYear','minus')
                            this.animationMonthScrollNone()
                        },this.timerAnimation)

                    } else {
                        this.animationMonthScrollReverse(this.timerAnimation)
                        setTimeout(()=> {
                            this.scrollActive = true
                            this.$emit('scrollingYear','plus')
                            this.animationMonthScrollNone()
                        },this.timerAnimation)
                    }
                }
            },
            /**
             * функция анимации при скроллинге
             * @param timer - время анимации ( суммарное )
             */
            animationMonthScroll(timer) {
                this.$refs.monthList.forEach((el,i,arr) => {
                    el.style.animation = `animationMonthScroll ${timer / arr.length / 1000}s ${i !== 0 ? timer / arr.length / 1000 * i : 0}s linear forwards`
                })
            },
            /**
             * функция анимации при скроллинге
             * @param timer - время анимации ( суммарное ) в ДРУГУЮ СТОРОНУ
             */
            animationMonthScrollReverse(timer) {
                this.$refs.monthList.forEach((el,i,arr) => {
                    el.style.animation = `animationMonthScrollReverse ${timer / arr.length / 1000}s ${i !== 0 ? timer / arr.length / 1000 * i : 0}s linear forwards`
                })
            },
            animationMonthScrollNone() {
                this.$refs.monthList.forEach((el,i,arr) => {
                    el.style.animation = ``
                })
            }
        }
    }
</script>

<style lang="less">
  #calendarMonth {
    width: 100%;
    height: 285px;
    color: #000000;

    .month-active-year {
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > span {
        font-size: 18px;
      }

    }

    .months {
      width: 100%;
      height: 220px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      transition: .3s ease-in-out;

      > div {
        width: calc(100% / 4);
        height: calc(100% / 3);
        min-height: 50px;
        min-width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        > div {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        > div:hover {
          border: 1px solid #596161;
        }
      }
    }
  }

  @keyframes animationMonthScroll {
    0%{
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(20px);
      opacity: 0;
    }
  }

  @keyframes animationMonthScrollReverse {
    0%{
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-20px);
      opacity: 0;
    }
  }

  @keyframes animationMonthScrollNone {
    0%{
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

</style>
