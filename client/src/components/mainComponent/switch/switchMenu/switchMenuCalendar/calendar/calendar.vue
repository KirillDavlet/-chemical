<template>
  <div id="calendar" :style="{color:themeActiveComp ? themeActiveComp.navigationBackground.color : '#1e1e1e'}">
    <div class="calendar">
      <div class="calendar-real__date">
        <span>
          {{ realDate.day === 0 ? '01' : realDate.day < 10 ? '0'+realDate.day : realDate.day}}
          {{realDate.month === 0 ? '01' : realDate.month < 10 ? '0'+ realDate.month : realDate.month   }} {{ realDate.year }} {{ _('y') }}
        </span>
      </div>
      <div class="calendar-display-selection">
        <div
          class="calendar-display-selection__back"
          @click="displaySelectionBack">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.0156 8.01562V9.98438H4.82812L10.4062 15.6094L9 17.0156L0.984375 9L9 0.984375L10.4062 2.39062L4.82812 8.01562H17.0156Z"
              :fill="themeActiveComp ? themeActiveComp.navigationBackground.color : '#1e1e1e'"/>
          </svg>
        </div>
        <div class="calendar-display-selection__active">
          <span>{{ _(arrActiveCalendar[activeBlockCalendar].title) }}</span>
        </div>
        <div
          class="calendar-display-selection__arrow"
          @click="displaySelectionArrow">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z"
              :fill="themeActiveComp ? themeActiveComp.navigationBackground.color : '#1e1e1e'"/>
          </svg>
        </div>
      </div>
      <div class="calendar-block">
        <calendar-days
          v-if="activeBlockCalendar === 2"
          :month="date.month"
          :year="date.year"
          :day="date.day"
          :events="allEvents"
          ref="calendar-days"
          @activeDay="activeDayParrent"
        />
        <calendar-month
          v-if="activeBlockCalendar === 1"
          ref="calendar-month"
          :active-year="date.year"
          :current-month="date.month"
          @activeMonth="activeMonthParrent"
          @scrollingYear="scrollingYearParrent"
        />
        <calendar-year
          v-if="activeBlockCalendar === 0"
          :this-year="date.year"
          ref="calendar-year"
          @yeasrActive="yeasrActiveParrent"
        />
      </div>
      <div class="calendar-event">
        <div class="calendar-event__title">
          <span>{{ displaySelectedDay }}</span>
        </div>
        <div
          v-if="activeDataEvents.length > 0"
          class="calendar-event__body">
          <calendar-event
            v-for="(item, i) in activeDataEvents"
            :key="`event-${i}`"
            :data-event="item"
            @activeReminder="activeReminderParent"
            @deleteEvents="deleteEventsParent"
            @doneEvents="doneEventsParent"
          />
        </div>
      </div>
      <div class="calendar-event-add" @click="showNewEvent">
        <span>{{ _('create') +' '+ _('events')}}</span>
        <span><icon-add :fill="themeActiveComp ? themeActiveComp.navigationBackground.color : '#1e1e1e'"/></span>
      </div>
      <transition name="new-event">
        <new-event
          v-if="showNewEventFlag"
          @saveNewEvent="saveNewEventParent"
        />
      </transition>
    </div>
  </div>
</template>

<script>
  import CalendarDays from "./calendarDays/calendarDays";
  import CalendarMonth from "./calendarMonth/calendarMonth";
  import CalendarYear from "./calendarYear/calendarYear";
  import IconAdd from "../../../../../icon/icon-add";
  import NewEvent from "./newEvent/newEvent";
  import CalendarEvent from "./event/calendarEvent";

  //api
  import getEventsInUser from "../api/getEventsInUser";
  import saveNewEvent from "../api/saveNewEvent";
  import changeReminder from "../api/changeReminder";
  import deleteEvent from "../api/deleteEvent";
  import doneEvent from "../api/doneEvent";


  export default {
    name: "calendar",
    components: {CalendarEvent, NewEvent, IconAdd, CalendarYear, CalendarMonth, CalendarDays},
    computed: {
      /**
       * метод отображения выбранной даты или сегодняшнего дня, если совпадают выбранное и текущее
       */
      displaySelectedDay() {
        if (JSON.stringify(this.realDate.day) !== JSON.stringify(this.date.day)) {
          return `${this.daysWeekList[this.date.dayWeek] !== undefined ?
            this._(this.daysWeekList[this.date.dayWeek]) : ''} ${this.date.day}`
        } else {
          return this._('today')
        }
      },
      /**
       * свойство отображения ыбранной даты
       * если день не выбрат, тогда отдаеться дата с которой пришли иначе выбранная
       */
      activeEventDate() {
        if (JSON.stringify(this.realDate.day) !== JSON.stringify(this.date.day)) {
          return this.date
        } else {
          return this.realDate
        }
      },
      // ОТСЛЕДИВАЕМ ИЗМЕНЕНИЕ ТЕМЫ
      themeActive() {
        if (this.$store.getters.get_activeThemeSwitcher.selectedTheme && this.$store.getters.get_activeThemeSwitcher.selectedTheme.active) {
          return this.$store.getters.get_activeThemeSwitcher.selectedTheme.mandatory
        } else if (this.$store.getters.get_activeThemeSwitcher.standart && this.$store.getters.get_activeThemeSwitcher.standart.active) {
          return this.$store.getters.get_activeThemeSwitcher.standart.mandatory
        } else {
          return null
        }
      },
    },
    data() {
      return {
        daysWeekList: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        arrActiveCalendar: [{name: 'year', title: 'year'}, {name: 'month', title: 'month'}, {
          name: 'days',
          title: 'day'
        }], //массив доступных отображений календаря
        activeBlockCalendar: 2, //активный элемент массива по default 1 - month
        date: {},
        realDate: {}, //реальная дата
        showNewEventFlag: false, //флаг отвечающий за отображения блока создания нового события
        allEvents: [], //массив всех событий по пользователю
        activeDataEvents: [], // массив событий по выбранному дню
        // объъект по напоминаниям , сегодня - завтра ( если стоит флаг напомнить )
        todayTomorrowDayEvents: {
          toDay: [],
          tomorrowDay: []
        }
      }
    },
    methods: {
      /**
       * метод возврата на реальную дату
       * :TODO                                                                                      ДОПИСАТЬ МЕТОД
       */
      startRealDate() {
        console.log('го на реалную дату ПОКА ЧТО НЕДОПИСАНО ДО КОНЦА')
        this.date = Object.assign({}, this.realDate) // возврат н реальную дату
      },


      /**
       * метод сбора данных по собыиям пользователя
       */
      async getEvents() {
        const res = await getEventsInUser.getAllEvents(this.$store.getters.INFOUSER.id);
        if (res && res.data) {
          this.allEvents = res.data.allEvents;
          // записываю события пользователя при загрузке
          let month = this.date.month === 11 ? 12 : this.date.month === 0 ? 1 : this.date.month + 1;
          let dataEvent = `${this.date.year}-${month < 10 ? '0' + month : month}-${this.date.day < 10 ? `0${this.date.day}` : this.date.day}`;
          this.allEvents.forEach(el => {
            if (el.format_date === dataEvent) {
              this.activeDataEvents.push(el)
            }
          });

          this.getEventsInTodayTomorrow()
        }
      },
      /**
       * метод нажатия назад ( выбор отображения блока - год, месяц, дни месяца )
       */
      displaySelectionBack() {
        if (this.activeBlockCalendar !== 0) {
          let activeBlock = this.activeBlockCalendar === 0 ? 'calendar-year' : this.activeBlockCalendar === 1 ? 'calendar-month' : 'calendar-days'
          this.$refs[activeBlock].$el.style.animation = 'animDecrease .2s linear forwards'
          this.activeAnimation = ''
          setTimeout(() => {
            if (this.activeBlockCalendar > 0) this.activeBlockCalendar--
          }, 300)
          this.activeAnimation = 'animDecrease';
        }
      },
      displaySelectionArrow() {
        if (this.activeBlockCalendar < this.arrActiveCalendar.length - 1) {
          let activeBlock = this.activeBlockCalendar === 0 ? 'calendar-year' : this.activeBlockCalendar === 1 ? 'calendar-month' : 'calendar-days'
          this.$refs[activeBlock].$el.style.animation = 'animIncrease .2s linear forwards'
          this.activeAnimation = ''
          setTimeout(() => {
            if (this.activeBlockCalendar < this.arrActiveCalendar.length - 1) this.activeBlockCalendar++
          }, 300)
          this.activeAnimation = 'animIncrease';
        }
      },
      /**
       * метод инициализации текущей даты
       */
      initCurrentdate() {
        this.date = {
          year: Number(new Date().getFullYear()),
          month: Number(new Date().getMonth()),
          day: new Date().getDate()
        }
        this.realDate = Object.assign({}, this.date) //копирую текущую дату
      },
      /**
       * метод выбора месяца
       * так же отрабатываеться анимация перехода
       * @param data
       */
      activeMonthParrent(data) {
        this.date.month = data.monthNumber;
        this.date.year = data.year;
        let activeBlock = this.activeBlockCalendar === 0 ? 'calendar-year' : this.activeBlockCalendar === 1 ? 'calendar-month' : 'calendar-days';
        this.$refs[activeBlock].$el.style.animation = 'animIncrease .2s linear forwards'
        setTimeout(() => {
          this.activeBlockCalendar = 2
        }, 300)
      },
      /**
       * метод пролистывания года в блоке с месяцами
       */
      scrollingYearParrent(data) {
        if (data === 'plus') this.date.year++
        else if (data === 'minus') this.date.year--
      },

      /**
       * обработка выбора года
       * записываю год
       * @param data
       */
      yeasrActiveParrent(data) {
        this.date.year = data.year;
        let activeBlock = this.activeBlockCalendar === 0 ? 'calendar-year' : this.activeBlockCalendar === 1 ? 'calendar-month' : 'calendar-days';
        this.$refs[activeBlock].$el.style.animation = 'animIncrease .2s linear forwards'
        setTimeout(() => {
          this.activeBlockCalendar = 1 //ставим следующий блок активным - выбор месяца
        }, 300)
      },
      /**
       * обработка вбранного дня
       */
      activeDayParrent(data) {
        // сбрасиваю и по новой записываю все события по выбранному дню
        this.activeDataEvents = []
        this.allEvents.forEach(el => {
          if (el.format_date === data.dataEvent) {
            this.activeDataEvents.push(el)
          }
        })
        this.date = {
          day: Number(data.day),
          month: Number(data.month),
          year: Number(data.year),
          dayWeek: data.dayWeek
        }
      },
      /**
       * метод отображения блока по созаднию нового события
       */
      showNewEvent() {
        this.showNewEventFlag = !this.showNewEventFlag
      },
      /**
       * мето сохранения события
       * @param data - инофрмация для сохранения
       */
      async saveNewEventParent(data) {
        let dataSave = {
          description: data.description,
          id_user: this.$store.getters.INFOUSER.id,
          activeReminder: data.activeReminder,
          date: `${this.date.year}-${this.date.month + 1}-${this.date.day}`
        }
        this.showNewEventFlag = false
        const res = await saveNewEvent.saveEvent(dataSave)
        if (res) {
          this.allEvents.push(res.data.data)
          let month = this.date.month === 11 ? 12 : this.date.month === 0 ? 1 : this.date.month + 1
          let data = `${this.date.year}-${month < 10 ? '0' + month : month}-${this.date.day < 10 ? `0${this.date.day}` : this.date.day}`
          res.data.data.format_date === data ? this.activeDataEvents.push(res.data.data) : ''
        }
      },


      /////////////////////////////////////////////////////МЕТОДЫ РАБОТЫ С КАРТОЧКАМИ СОБЫТИЙ ПОЛЬЗОВАТЕЛЯ
      /**
       * метод активации/деактивации оповещения по событию
       * @param data - флаг
       */
      async activeReminderParent(data) {
        await changeReminder.changeReminder(data)
          .then(res => {
            if (res && res.status === 200 && res.data.status) {
              this.activeDataEvents.find(el => el.id === data.idEvent).reminder = !this.activeDataEvents.find(el => el.id === data.idEvent).reminder ? 1 : 0
            } else {
              if (!res.data.status) {
                alert(res.data.message)
              }
            }
          })
          .catch(err => console.log(err))

      },

      async deleteEventsParent(data) {
        let deleteEvents = confirm('вы действительно хитите удалить событие ? ')
        if (deleteEvents) {
          await deleteEvent.deleteEvent({id: data})
            .then(res => {
              if (res && res.status === 200 && res.data.status) {
                this.activeDataEvents.splice(this.activeDataEvents.findIndex(el => el.id === data), 1)
                this.allEvents.splice(this.allEvents.findIndex(el => el.id === data), 1)

                // this.activeDataEvents.find(el=> el.id === data.idEvent).reminder = !this.activeDataEvents.find(el=> el.id === data.idEvent).reminder ? 1 : 0
              } else {
                if (!res.data.status) {
                  alert(res.data.message)
                }
              }
            })
            .catch(err => console.log(err))
        }
      },

      /**
       * метод изменения выполнено/невыполнено событие
       * @returns {Promise<void>}
       */
      async doneEventsParent(data) {
        await doneEvent.doneEvent(data)
          .then(res => {
            if (res && res.data && res.status === 200) {
              this.activeDataEvents.find(el => el.id === data.idEvent).status = !this.activeDataEvents.find(el => el.id === data.idEvent).status ? 1 : 0
            }
          })
          .catch(err => console.log(err))
      },

      // метод определения событий за сегодня и завтра
      getEventsInTodayTomorrow() {
        // составление строки для определения есть ли на сегодня активное событие
        let month = this.realDate.month === 11 ? 12 : this.realDate.month === 0 ? 1 : this.realDate.month + 1
        let toDay = `${this.realDate.year}-${month < 10 ? '0' + month : month}-${this.realDate.day < 10 ? '0' + this.realDate.day : this.realDate.day}`;
        // количество дней в текущем месяце
        let currentMonthInDays = 32 - new Date(this.realDate.year, this.realDate.month, 32).getDate();
        let dayTomorrow = this.realDate.day;
        let monthTomorrow = month;
        let yearTomorrow = this.realDate.year;
        if (Number(dayTomorrow) + 1 > Number(currentMonthInDays)) {
          dayTomorrow = '01'
          if (monthTomorrow + 1 > 12) {
            monthTomorrow = '01';
            yearTomorrow++
          }
        } else {
          dayTomorrow++
        }
        dayTomorrow < 10 ? dayTomorrow = `0` + dayTomorrow : dayTomorrow
        let tomorrow = `${yearTomorrow}-${monthTomorrow < 10 ? '0' + monthTomorrow : monthTomorrow}-${dayTomorrow}`;

        // проверка на доступные события ( сегодня - завтра ) и если нужно напоминать по ним
        this.allEvents.forEach(el => {
          if (el.format_date === toDay) {
            if (el.reminder === 1 && el.status === 0) {
              this.todayTomorrowDayEvents.toDay.push(el)
            }
          }
          if (el.format_date === tomorrow) {
            if (el.reminder === 1 && el.status === 0) {
              this.todayTomorrowDayEvents.tomorrowDay.push(el)
            }
          }
        });

        console.log()

        this.$store.commit('SET_ALERTARRAY', {
          message: `Событий сегодня - ${this.todayTomorrowDayEvents.toDay.length} , Событий завтра - ${this.todayTomorrowDayEvents.tomorrowDay.length}`,
          type: 'info'
        })

        this.$store.dispatch('addEventsTomorrow', this.todayTomorrowDayEvents) // записал в хранилище события за сегодня/завтра

      }

    },
    mounted() {
      this.getEvents()
      this.initCurrentdate()
    }
  }
</script>

<style lang="less">
  #calendar {
    width: 100%;
    height: auto;
    margin-top: 15px;

    .calendar {
      width: 100%;
      height: 100%;

      &-real__date {
        width: 100%;
        height: 30px;


        > span {
          color: rgb(37, 116, 207);
          font-size: 18px;
        }
      }

      &-display-selection {
        width: 100%;
        display: flex;

        &__back, &__arrow {
          width: 20%;
          display: flex;
          cursor: pointer;
        }

        &__back {
          justify-content: flex-start;
        }

        &__arrow {
          justify-content: flex-end;
        }

        &__active {
          width: 60%;
          display: flex;
          justify-content: center;
          align-items: center;

          > span {
            color: #1e1e1e;
          }
        }
      }

      &-block {
        margin: 10px 0;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
      }

      &-event {
        width: 100%;
        min-height: 30px;
        margin: 15px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__title {
          height: 35px;
          width: 80%;
          display: flex;
          align-items: center;
        }

        &__body {
          height: auto;
          width: 90%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      }

      &-event-add {
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 10%;

        > span {
          margin-right: 15px;
        }
      }

    }
  }


  /****
  ОБЩИЕ СТИЛИ
   */

  .new-event-enter-active {
    transition: all .3s ease;
  }

  .new-event-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .new-event-enter, .new-event-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }


  //анимация уменьшения
  @keyframes animDecrease {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(.8);
    }
  }

  //анимация увиличения
  @keyframes animIncrease {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
</style>
