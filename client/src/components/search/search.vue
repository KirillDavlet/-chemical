<template>
  <div id="search">
    <div class="search">
      <div class="search-input">
        <svg width="16" height="16" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M69.1606 34.5802C69.1606 43.5332 65.7376 51.7063 60.1337 57.8523L89.5275 87.2475C90.1575 87.8775 90.1575 88.8975 89.5275 89.5275C88.8975 90.1575 87.8775 90.1575 87.2475 89.5275L57.8527 60.1323C51.7057 65.7364 43.5358 69.1594 34.5798 69.1594C15.5129 69.1594 0 53.6463 0 34.5792C0 15.5121 15.5129 -0.000999957 34.5798 4.83441e-08C53.6477 4.83441e-08 69.1606 15.5131 69.1606 34.5802ZM3.22498 34.5802C3.22498 51.8693 17.2899 65.9354 34.5808 65.9354C51.8697 65.9354 65.9366 51.8683 65.9366 34.5802C65.9366 17.2891 51.8707 3.22302 34.5808 3.22302C17.2899 3.22302 3.22498 17.2891 3.22498 34.5802Z"
                fill="black"/>
        </svg>
        <input type="text"
               v-model="search"
               v-on="searchComponent"
               placeholder="поиск..."
        >

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        /**
         * ИСПОЛЬЗОВАНИЕ КОМПОНЕНТА
         *
         * реактивноое поле - search
         *
         * при изменении отправляю родителю данные "searchComponent"
         *
         * вызов компонента у родителя:
         *      <search @search="searchData" />
         * ОБРАБОТКА ДАННЫХ У РОДИТЕЛЯ:
         *      searchData(data) { this.searchTitle = data.search},
         *
         * searchTitle - реактивное поле по которому применяется фильтр
         *
         * ФИЛЬТРАЦИЯ У РОДИТЕЛЯ
         *
         * search() {
         *     if(this.searchTitle) {
         *         return this.dataTEstCard.filter(el=> {
         *             return el.title.includes(this.searchTitle) || el.id.includes(this.searchTitle)
         *         })
         *     } else {
         *         return this.dataTEstCard
         *     }
         *   }
         *
         * ОТРИСОВКА СПИСКА У РОДИТЕЛЯ
         * v-for="item in search" через цикл . где рабочий массив уже является отфильтрованным, если пустая строка, тогда полный массив
         *
         */
        name: "search",
        data() {
            return {
                search: ''
            }
        },
        computed: {
            searchComponent() {
                let vm = this; //запомнил ткущий объект
                return Object.assign({}, this.$listeners, {
                    input: function (event) {
                        vm.$emit('search', {
                            search: vm.search
                        })
                    }
                });
            }
        }
    }
</script>

<style lang="less">
  #search {
    width: auto;
    max-width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    background: white;
    border-radius: 7px;
    box-shadow: 0 10px 30px rgba(209, 213, 223, 0.5);


    .search {
      width: 100%;
      height: 100%;
      display: flex;

      &-input {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        > svg {
          position: absolute;
          left: 0;
        }

        > input {
          height: 25px;
          border: none;
          padding: 10px 5px 10px 25px;
          box-sizing: border-box;
          background: transparent;
          color: black;
        }

        > input:focus {
          outline: none;
        }
      }

    }
  }
</style>
