<template>
  <div id="MC__pagination">
    <div class="pagination-container">
      <div
        class="pagination-container-page__back"
        data-page="back"
        disabled
        @click="clickPage "
        :class="activePage === 1 ? 'pagination-disabled' : ''">
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4219 7.40625L10.8281 12L15.4219 16.5938L14.0156 18L8.01562 12L14.0156 6L15.4219 7.40625Z"
                  fill="#666666"/>
          </svg>
        </span>
      </div>
      <div
        class="pagination-container-page"
        v-for="(page,i) in numberPages"
        :data-page="i+1"
        @click="clickPage"
        :class="page === activePage ? 'pagination-active__page' : 'pagination-page'"
      >
        <span>{{ page }}</span>
      </div>
      <div
        class="pagination-container-page__forward"
        @click="clickPage"
        data-page="forwards">
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
     * ОБЩИЙ КОМПОНЕТН ПАГИНАЦИИ
     * @param props:
     *              - activePage                    - активная страница
     *              - numberPages                   - общее количество страниц
     *              - numberOfButtons               - параметр отвечающий сколько всего отображать кнопок
     *
     */
    export default {
        name: "MC__pagination",
        props: {
            activePage: {type: Number, default: 1},
            numberPages: {type: Number, default: 1},
            numberOfButtons: {type:Number,default: 3}
        },
        computed: {
        },
        methods: {
            /**
             * переключение страниц
             * @param e
             */
            clickPage(e) {
                let event = {page: this.activePage};
                if(e.currentTarget.dataset.page === 'back' && this.activePage > 1) event.page-- ;
                else if(e.currentTarget.dataset.page === 'forwards' && this.activePage < this.numberPages)event.page++;
                else if(!isNaN(e.currentTarget.dataset.page)) event.page = Number(e.currentTarget.dataset.page)
                this.$emit('activePage', event)
            }
        }
    }
</script>

<style lang="less">
  #MC__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin-top: 15px;
    .pagination-container {
      max-width: 50%;
      display: flex;

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

  .pagination-active__page {
    background: #1867c0 !important;
    color: #FFFFFF;
  }

  .pagination-page {
    background: #FFFFFF;
    color: #1E1E1E;
  }
</style>
