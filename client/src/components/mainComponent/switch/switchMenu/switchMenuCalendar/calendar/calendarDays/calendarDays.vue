<template>
  <div id="calendarDays">
    <div class="calendar-days" @wheel.prevent="changeDays">
      <div class="calendar-days-title">
        <div class="calendar-days-title__month"><span>{{ _(arrMonth[activeMonth]) }} {{ activeYear }}</span></div>
        <div class="calendar-days-title__back" @click="daysMonthBack">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0.015625L12 6.01562L10.5938 7.42188L6 2.82812L1.40625 7.42188L0 6.01562L6 0.015625Z"
                  :fill="themeActiveComp ? themeActiveComp.mainBackground.color : '#666666'"/>
          </svg>
        </div>
        <div class="calendar-days-title__arrow" @click="daysMonthArrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5938 0.578125L12 1.98438L6 7.98438L0 1.98438L1.40625 0.578125L6 5.17188L10.5938 0.578125Z"
                  :fill="themeActiveComp ? themeActiveComp.mainBackground.color : '#666666'"/>
          </svg>
        </div>
      </div>
      <div class="calendar-days__calendar">
        <div
          class="calendar-days__calendar-days-week">
          <div
            class="calendar-days__calendar-days-week"
            v-for="(day,i) in daysWeek"
            :key="`dayWeek-${i}`">
            <span>{{ _(day) }}</span>
          </div>
        </div>
        <div
          ref="calendarDaysCalendarDays"
          class="calendar-days__calendar-days">
          <div
            class="calendar-days__calendar-days__day"
            v-for="(day,i) in dataMonth.arrDaysWithOffsetRow"
            :key="`day-${i}`"
            :class="{
              'day-past': day.status === 'past',
              'day-current': day.status === 'current',
              'day-following': day.status === 'following',
              'active-day': activeDay === `${day.day}-${day.month}-${day.year}-${day.status}`,
              'events-day' : testEvents(day)
            }"
            :style="{
            background: currentDay === `${day.day}-${day.month}-${day.year}` ? themeActiveComp && themeActiveComp.mainBackground.background : ''}"
            :data-day="day.day"
            :data-year="day.year"
            :data-month="day.month"
            :data-status="day.status"
            @click="dayPick"
          >
            <span
              :style="{color: currentDay === `${day.day}-${day.month}-${day.year}` ? themeActiveComp && themeActiveComp.mainBackground.color : ''}">{{ day.day }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * Компонент отображения дней месяца по месяцам
   */
  export default {
    name: "calendarDays",
    props: {
      month: {
        type: Number,
        default: new Date().getMonth()
      }, //текущий месяц
      year: {type: Number, default: 2020},
      day: {
        type: Number,
        default: null
      },
      events: {type: Array, default: () => []} //массив событий для пользователя
    },
    data() {
      return {
        activeMonth: 0, //активный месяц где 0 - январь 11 - декабрь
        arrMonth: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'], //все доступные месяца
        arrMonthEng: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], //все доступные месяца на английском
        activeYear: null, //активный год
        daysWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        yearData: null,
        activeDay: '', //активный день
        currentDay: null, //текущий день
        flagStopScroll: true, //поле стопарит дикую прокрутку
        monthData: null // переменая для хранения масяцев от 1 - 12
      }
    },
    computed: {
      /**
       * метод расчета сколько дней в текущем месяце и с какого дня начинаеться месяц
       * возвращает объект: отвечающий за отображение дней по месяцу и с захватом следующиего и предыдущего ( для закрывания пустоты )
       *                      -
       */
      dataMonth() {
        let daysNumber = 32 - new Date(this.activeYear, this.activeMonth, 32).getDate(), //количество дней в текущем месяце
          previousMonthDays = '', //количество дней в предыдущий месяц
          nextMonthDays = 1, //счетсчик следующего месяца
          nextMounth = null, //следующий месяц
          daysWeek = new Date(`${this.arrMonthEng[this.activeMonth]} 1, ${this.activeYear} 12:01:00`).getDay(), //номер дня начала месяца
          withOffsetRow = 6, //колличество строк с учетом смещения
          arrDaysWithOffsetRow = [];

        if (this.activeMonth === 0) {
          previousMonthDays = 32 - new Date(this.activeYear - 1, 11, 32).getDate()
        } else if (this.activeMonth > 0) {
          previousMonthDays = 32 - new Date(this.activeYear, this.activeMonth - 1, 32).getDate()
        }


        //status - past - прошедший; current -текущий;  following - следущий
        // на предыдущий месяц нельзя добалять и настраивать какие либо события ( поэтому строка будет пустая )
        for (let i = 0; i < withOffsetRow * 7; i++) {
          nextMounth = this.activeMonth;
          let test = null;
          //заполняю днями предыдущего месяца
          if (i < daysWeek) {
            test = {
              day: previousMonthDays - (daysWeek - i - 1),
              month: '',
              year: '',
              status: 'past',
            };
          } else {
            //заполнение днями текущего месяца
            if (i < daysNumber + daysWeek) {
              test = {
                day: i - daysWeek + 1,
                month: this.activeMonth,
                year: this.activeYear,
                status: 'current',
              }
            }
            //заполнение днями следущего месяца
            else {
              nextMounth === 11 ? nextMounth = 0 : nextMounth++;
              test = {
                day: nextMonthDays,
                month: nextMounth,
                year: this.activeMonth + 1 > 11 ? this.activeYear + 1 : this.activeYear,
                status: 'following',
              };
              nextMonthDays++
            }
          }
          arrDaysWithOffsetRow.push(test)
        }
        return {
          daysNumber: daysNumber,
          daysWeek: this.daysWeek[daysWeek],
          daysWeekNumber: daysWeek,
          withOffsetRow: withOffsetRow,
          arrDaysWithOffsetRow: arrDaysWithOffsetRow
        }
      },
    },
    methods: {
      /**
       * метод проверки даты на события
       */
      testEvents(day) {
        let month = day.month === 11 ? 12 : day.month === 0 ? 1 : day.month + 1
        let data = `${day.year}-${month < 10 ? '0' + month : month}-${day.day < 10 ? `0${day.day}` : day.day}`
        return this.events.find(el => el.format_date === data) !== undefined
      },
      allEvents() {
        console.log(this.activeMonth)
      },
      /**
       * метод пролистывания месяца назад
       */
      daysMonthBack() {
        this.$refs.calendarDaysCalendarDays.classList.add('outgoing-block-up')
        if (this.activeMonth === 0) {
          setTimeout(() => {
            this.$refs.calendarDaysCalendarDays.classList.remove('outgoing-block-up')
            this.activeMonth = 11
            this.activeYear-- //перешел на предыдущий год
            this.flagStopScroll = true
          }, 100)
        } else {
          setTimeout(() => {
            this.$refs.calendarDaysCalendarDays.classList.remove('outgoing-block-up')
            this.activeMonth--
            this.flagStopScroll = true
          }, 100)
        }
      },
      /**
       * метод пролистывания месяца вперед
       */
      daysMonthArrow() {
        this.$refs.calendarDaysCalendarDays.classList.add('outgoing-block-down')
        if (this.activeMonth === 11) {
          setTimeout(() => {
            this.$refs.calendarDaysCalendarDays.classList.remove('outgoing-block-down')
            this.activeMonth = 0
            this.activeYear++ //перешел на следующий год
            this.flagStopScroll = true
          }, 100)
        } else {
          setTimeout(() => {
            this.$refs.calendarDaysCalendarDays.classList.remove('outgoing-block-down')
            this.activeMonth++
            this.flagStopScroll = true
          }, 100)
        }
      },
      /**
       * Метод выбора дня
       */
      dayPick(e) {
        let dataDay = {
          day: e.currentTarget.dataset.day,
          month: e.currentTarget.dataset.month,
          year: e.currentTarget.dataset.year,
          status: e.currentTarget.dataset.status,
          dayWeek: new Date(`${this.arrMonthEng[e.currentTarget.dataset.month]} ${e.currentTarget.dataset.day}, ${e.currentTarget.dataset.year} 12:01:00`).getDay()
        }
        let month = Number(dataDay.month) === 11 ? 12 : Number(dataDay.month) === 0 ? 1 : Number(dataDay.month) + 1
        dataDay.dataEvent = `${dataDay.year}-${month < 10 ? '0' + month : month}-${dataDay.day < 10 ? `0${dataDay.day}` : dataDay.day}`
        this.activeDay = ''
        this.activeDay = `${dataDay.day}-${dataDay.month}-${dataDay.year}-${dataDay.status}`
        this.$emit('activeDay', dataDay)
      },
      /**
       * метод пролистывания колесиком
       */
      changeDays(event) {
        if (this.flagStopScroll) {
          this.flagStopScroll = false;
          if (event.deltaY < 0) {
            this.daysMonthBack();
          } else {
            this.daysMonthArrow();
          }
        }
      }
    },
    mounted() {
      /**
       * инициализация текущего дня
       * @type {number}
       */
      this.currentDay = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
    },
    created() {

      /**
       * при инициализации смотрим какой сейчас год
       * @type {default.props.year|{default, type}}
       */
      this.activeYear = this.year;
      /**
       * инициализация активного месяца
       * @type {default.props.month|{default, type}}
       */
      this.activeMonth = this.month;
      this.activeDay = this.day
    }
  }
</script>

<style lang="less">
  #calendarDays {
    width: 100%;
    padding: 0 7px;

    .calendar-days {
      width: 100%;

      &-title {
        width: 100%;
        height: 35px;
        display: flex;
        padding: 7px 0;

        > div {
          display: flex;
          align-items: center;

          > span {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.02em;
          }
        }

        &__month {
          width: 80%;
        }

        &__back {
          width: 10%;
          justify-content: center;
          cursor: pointer;
        }

        &__arrow {
          width: 10%;
          justify-content: center;
          cursor: pointer;
        }
      }

      &__calendar {
        width: 100%;
        display: flex;
        flex-direction: column;

        &-days-week {
          display: flex;
          width: 100%;
          margin: 10px 0;

          > div {
            width: calc(100% / 7);
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            > span {
              font-size: 14px;
              text-transform: capitalize;
            }
          }

        }

        &-days {
          width: 100%;
          height: auto;
          display: flex;
          flex-wrap: wrap;

          > div {
            width: calc(100% / 7);
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }

          &__day {
            cursor: pointer;
          }

          &__day:hover {
            border: 1px solid #596161;
          }

          &__day:nth-child(7n+1), &__day:nth-child(7n+7) {
            > span {
              text-shadow: 0 0 1px #1e1e1e;
            }
          }
        }
      }
    }

    /*  ОБЩИЕ СТИЛИ*/

    .day-past {
      > span {

      }
    }

    .day-current {
      > span {

      }
    }

    .day-following {
      > span {
        color: gray;
      }
    }

    .events-day {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        z-index: 100;
        border-radius: 50%;
        width: 29px;
        height: 29px;
        border: 2px solid #796ddb
      }
    }

  }

  .active-day {
    border: 1px solid blue;
  }


  //анимирование исчезновения пред месяца, при переключении месяцев

  .outgoing-block-up {
    opacity: 1;
    animation: outgoingBlockUp .1s ease-in-out forwards;
  }

  @keyframes outgoingBlockUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-15px);
    }

  }


  .outgoing-block-down {
    opacity: 1;
    animation: outgoingBlockDown .1s ease-in-out forwards;
  }

  @keyframes outgoingBlockDown {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(15px);
    }

  }


</style>
