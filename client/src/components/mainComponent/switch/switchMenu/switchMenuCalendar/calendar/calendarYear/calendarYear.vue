<template>
  <div id="calendarYear">
    <div class="list-year"><span >{{ yearsMappings[0] }} - {{ yearsMappings[yearsMappings.length-1] }}</span></div>
    <div class="years" @wheel.prevent="changeYears">
      <div
        class="years-year"
        v-for="(year,i) in yearsMappings"
        :key="`year-${year}`"
        :data-year="year"
        @click="yearsChoice"
      >
        <span >{{ year < 0 ? `${-year} д.н.э.` : year}}</span>

      </div>
    </div>
  </div>
</template>

<script>
    /**
     * Комопнент отображения текущего года и предыдущих/будущих лет
     *
     * @param props:
     *                - thisYear                                  - текущий год
     *
     * @param data:
     *                 - counterYear                               - количество лет для отображения ( блоков )
     *                 - yearsMappings                             - массив с видимыми годами ( по нему рисую )
     *                 - stepYear                                  - число отвечающее сколько лет в 1 строке и => сколько добавляем/удаляем при прокрутке
     */
    export default {
        name: "calendarYear",
        props: {
            thisYear: {type: Number, default: null}
        },
        computed: {
            activeStyle() {
                return this.$store.getters.ACTIVETHEME
            }
        },
        data() {
            return {
                counterYear: 16,
                stepYear: 4,
                yearsMappings: []
            }
        },
        watch: {
            yearsMappings(data) {
                console.log(data)
            }
        },
        methods: {
            /**
             * метод инициализации компонента
             */
            initComponent() {
                for (let i = 0; i < this.counterYear; i++) {
                    this.yearsMappings.push(this.thisYear + i)
                }
            },
            /**
             * метод прокрутки колесом
             */
            changeYears(ev) {
                if (ev.deltaY < 0) {
                    this.changeArrayYear('up')

                } else {
                    this.changeArrayYear('down')
                }

            },
            /**
             * метод изменения массива дат
             */
            changeArrayYear(event) {
                if (event === 'up') {
                    this.yearsMappings.splice(this.counterYear - this.stepYear, this.counterYear)
                    let start = this.yearsMappings[0] - 5,
                        end = this.yearsMappings[0] - 1;
                    for (let i = end; i > start; i--) {
                        this.yearsMappings.unshift(i)
                    }
                } else if (event === 'down') {
                    this.yearsMappings.splice(0, this.stepYear)
                    let start = this.yearsMappings[this.yearsMappings.length - 1]+1,
                        end = this.yearsMappings[this.yearsMappings.length - 1] + 5;
                    for (let i = start; i < end; i++) {
                        this.yearsMappings.push(i)
                    }
                }
            },
            /**
             * метод выбора года
             */
            yearsChoice(e) {
                this.$emit('yeasrActive',{year:Number(e.currentTarget.dataset.year)})
            }

        },
        mounted() {
            this.initComponent()
        }
    }
</script>

<style lang="less">
  #calendarYear {
    width: 100%;
    height: 285px;
    color: #000000;

    .list-year {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 35px;
    }

    .years {
      width: 100%;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      &-year {
        width: calc(100% / 4);
        min-height: 50px;
        min-width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        > span {

        }
      }

      &-year:hover {
        border: 1px solid #596161;
      }
    }
  }
</style>
