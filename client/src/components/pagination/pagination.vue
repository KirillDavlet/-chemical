<template>
  <div id="pagination">
    <div class="pagination-container">
      <div
        class="pagination-container-page__back"
        data-page="back"
        disabled
        :class="activePage === 1 ? 'pagination-disabled' : ''"
        @click="clickPage">
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4219 7.40625L10.8281 12L15.4219 16.5938L14.0156 18L8.01562 12L14.0156 6L15.4219 7.40625Z"
                  fill="#666666"/>
          </svg>
        </span>
      </div>
<!--      background  : page === activePage ? ActiveTheme.background : '#FFFFFF',-->
<!--      color       : page === activePage ? ActiveTheme.color : '#1E1E1E'-->
      <div
        class="pagination-container-page"
        @click="clickPage"
        v-for="page in totalPages"
        :style="{

        }"
        :data-page="page"
      ><span>{{ page }}</span>
      </div>
      <div
        class="pagination-container-page__forward"
        data-page="forwards"
        :class="activePage ===  totalPages ? 'pagination-disabled' : ''"
        @click="clickPage"
      >
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.98438 6L15.9844 12L9.98438 18L8.57812 16.5938L13.1719 12L8.57812 7.40625L9.98438 6Z"
                  fill="#666666"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
    /**
     * КОМПОНЕНТ ПАГИНАЦИИ
     * @param props:
     *              - amountRecords ЧИСЛО ЗАПИСЕЙ
     *              - numberRecords КОЛИЧЕСТВО ЗАПСИЕЙ НА СТРАНИЦЕ
     *              - activePage АКТИВНАЯ СТРАНИЦА
     *              - total количество кнопок отображаемых
     * @param data:
     *              - totalPages количество страниц
     *
     * Вызов компонента:
     *                  <pagination
     *                          :amountRecords="this.search.length" // в данном контексте search является вычисляемый свйоством по поиску
     *                          :active-page="activePage" // активная страница
     *                          @numberRecords="numberRecord" // обработчик описание ниже
     *                          @activePage="activePages" // обработчик описание ниже
     *
     *
     * ОБРАБОТЧИКИ В РОДИТЕЛЬСКОМ КОМПОНЕНТЕ :
     *                                        //ОТЛАВВЛИВАЕМ НОМЕР СТРАНИЦЫ ОТ КОМПОНЕНТА ПАГИНАЦИИ
     *                                        activePages(data) { this.activePage = data },
     *
     *                                        //Ловим от пагинцации, сколько отображать записей на странице
     *                                        numberRecord(data) { this.numberRec = data }
     *
     * СВЯЗКА С ПОИСКОМ:
     *                   watch: {
     *                           //если был применен поиск , тогда ставим первую страницу пагинации
     *                           searchTitle() {
     *                               this.activePage = 1
     *                           }
     *                       },
     *
     */
    export default {
        name: "pagination",
        props: {
            amountRecords: {
                type: Number,
                default: null
            },
            numberRecords: {
                type: Number,
                default: 10
            },
            activePage: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 7
            }
        },
        data() {
            return {
                totalPages: null, //количество страниц
            }
        },
        computed: {
            numberButtonPage() {
                if (this.totalPages > this.total) {
                    return [1, 2, 3, 7, 8]
                } else {
                    return this.totalPages
                }
            },
            //МЕТОД ОТЛАВЛИВАЮЩИЙ  ИЗМЕНЕНИЯ В ТЕМЕ И ПРИМЕНЯЮЩИЙ ИХ
            ActiveTheme() {
                return this.$store.getters.ACTIVETHEME.barLink
            },
        },
        watch: {
            //перезаписываю изменения , если поменялось количество записей ( напрмиер применился поиск )
            amountRecords(data) {
                this.totalPages = Math.ceil(data / this.numberRecords)
            }
        },
        methods: {
            /**
             * метод отлавливания определения стрнаницы и отправка родителю
             * @param e - элемент по которому кликнули
             */
            clickPage(e) {
                let activePageEmit = this.activePage;
                if (e.currentTarget.dataset.page === 'forwards' && this.activePage < this.totalPages) {
                    activePageEmit++;
                } else if (e.currentTarget.dataset.page === 'back' && this.activePage > 1) {
                    activePageEmit--;
                } else if (e.currentTarget.dataset.page !== 'forwards' && e.currentTarget.dataset.page !== 'back') {
                    activePageEmit = Number(e.currentTarget.dataset.page)
                }
                this.$emit('activePage', activePageEmit) //отправка родителю номера страницы
            }
        },
        mounted() {
            this.totalPages = Math.ceil(this.amountRecords / this.numberRecords)
            this.$emit('numberRecords', this.numberRecords) //отправка родителю сколько записей на странице
        },
    }
</script>

<style lang="less">
  #pagination {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;

    .pagination-container {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;

      > div {
        cursor: pointer;
        min-width: 34px;
        padding: 0 5px;
        display: flex;
        background: #FFFFFF;
        justify-content: center;
        align-items: center;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        margin: 0 5px;
        transition: .2s ease-in-out;

        > span {
          color: inherit;
        }
      }

      > div:last-child {
        border-radius: 0 5px 5px 0;
      }

      > div:first-child {
        border-radius: 5px 0 0 5px;
      }
    }
  }

  .pagination-disabled {
    cursor: auto !important;
    opacity: .6;
  }

</style>
