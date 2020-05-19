<template>
  <div id="MCTable">
    {{ closeBodyDDM }}
    <table-filter
      :active-filters="activeFilters"
      :size-table="sizeTable"
      :title-table="worksFields"
      :name-table="titleTable"
      :title-checked="titleChecked"
      @onFocus="onFocusParent"
      @openFilter="openFilterParent"
    />
    <MC__tableHeader
      :titleTable="worksFields"
      :size-table="sizeTable"
      :checked-active="checkedActive"
      @SORT="sortParrent"
    />
    <div class="style-sort"
         ref="styleSort"
    ></div>
    <MC__tableBody
      :data-table-body="filterList.slice(activePage * numberRow - numberRow, activePage * numberRow )"
      :table-size="sizeTable"
      :showMenu="showMenu"
      @dataDDM="dataDDMParrent"
      @changeRow="changeRowParent"
      :number-row="numberRow"
      :name-table="nameTable"
      :checked-active="checkedActive"
      :active-checked-array="activeCheckedArray"
    />
    <MC__pagination
      :number-pages="numberPagesCD"
      :active-page="activePage"
      @activePage="activePageParrent"
    />
    <!--      :TODO обязательно передавать id строки-->
    <drop-down-menu
      v-if="showMenu"
      :settings="settings"
      :position-d-d-m="dataMenu.position"
      :data-d-d-m="dataMenu.info"
      @actionDDM="actionsDDParrent"
    />
    <MC__card
      v-if="showCard"
      :type-action="typeActionsCard"
      :data-card="dataCard"
      :type-card="nameTable"
      @closeModalCard="closeModalCardParrent"
    />
    <MC__formMessage
      v-if="showFormMessage"
      :position-modal-message="{x:150, y:150}"
      :data-who-caused="dataCard"
      :name-id-recipient="nameIdRecipient"
      @closeFormMessage="closeFormMessageParrent"
      @toSendMessage="toSendMessageParrent"
    />
  </div>
</template>

<script>
  import MC__tableHeader from "./table-header/MC__table-header";
  import MC__tableBody from "./table-body/MC__table-body";
  import MC__pagination from "./pagination/MC__pagination";
  import DropDownMenu from "../drop-down-menu/drop-down-menu";

  import deleteRow from "./api/deleteRow/deleteRow";
  import MC__card from "../card/MC__card";
  import MC__formMessage from "../formMessage/formMessage";
  import TableFilter from "./table-filter/tableFilter";
  import api from "./api/api";

  /**
   * ТИПОВЫЙ КОМПОНЕНТ ТАБЛИЦА
   * СОСТОИТ ИЗ КОМПОНЕНТОВ :
   *                          - ШАПКА ТАБЛИЦЫ (MC__tableHeader)
   *                          - ТЕЛО ТАБЛИЦЫ ()
   *                          - ПОДВАЛА ТАБЮЛИЦЫ ()
   *
   * РАБОТА КОМПОНЕНТА:
   *                   - на вход поступает массив объектов с данными по отображению,
   *                   - перебираеться объект по всем полям и создаеться новый объект с полями ( названиями полей для отправки в компонент шапки таблицы)
   *                   - так же имеет возможность принимать массив с размерами : [100,500,300,400,500] размеры в пикселях поочередно дял каждого стобца
   *
   *
   * @param props:
   *              - dataTable                   - массив объектов с данными пор таблице
   *              - sizeTable                   - массив с размерами ( если не передаеться, тогда размеры стандартные, равномерные ) если передаем, то количество размеровЮ долнжо совпадать с количеством заголовков
   *              - settings                    - Объект настроек для таблицы ( что можно будет делать : TODO НЕ ПРОДУМАННЫЙ )
   *              - numberRow                   - количество строк в таблице
   *              - nameTable                   - Объект с данными по базе данных ( обязательное поле, так как без него не сможем отправлять запрос к БД)
   *
   *
   * @param data:
   *              - filterName                  - объект отвечающий за сортировку ( имя поля для сортировки и последовательность )
   *              - status                      - флаг отвечающий, за отображение активых/всех обращений
   *              - activePage                  - активная страница
   *              - showMenu                    - флаг отвечающий за отображение выпадающего меню
   *              - dataMenu                    - объект инофрмации по выподающему меню
   *
   *              - showCard:                   - флаг отвечающий за отображение карточки
   *              - typeActionsCard             - тип карточки
   *              - dataCard                    - данные по строке для пережачи в карту
   *
   *              - showFormMessage             - флаг отвечающий за отображения формы отправки сообщения
   *
   *
   *
   *
   *              ПРИМЕР ВЫЗОВА КОМПОНЕНТА
   <MC__table
   :data-table="dataTableTest"
   :name-table="nameTable"
   :size-table="[100,100, 250, 300, 300, 350, 350, 350]"
   :number-row="10"
   :settings="['редактировать','просмотреть','удалить','ответить','отомстить']"
   />
   *
   */
  export default {
    name: "MC__table",
    components: {
      TableFilter,
      MC__formMessage, MC__card, DropDownMenu, MC__pagination, MC__tableBody, MC__tableHeader
    },
    props: {
      dataTable: {
        type: Array,
        default: () => {
          return []
        }
      },
      sizeTable: {
        type: Array,
        default: () => []
      },
      settings: {
        type: Array,
        default: () => []
      },
      numberRow: {
        type: Number,
        default: 10
      },
      activeCheckedArray: {type: Array, default: () => []},
      nameTable: {
        type: Object, default: () => {
        }
      },
      nameIdRecipient: {type: String, default: 'id_user'}, //поле отвечающее по какому параметру бду отправлять письмо
      settingsActionsTable: false, // поле отвечает за обработку событий в таблице, если false тогда внутри, true отправляеться родителю actions
      checkedActive: {
        type: Boolean,
        default: false
      }, // парамкетр отвечает нужно ли отрисовывать выбор строк
      titleTable: {
        type: String,
        default: ''
      },
      /**
       * строковое представление переключателя
       */
      titleChecked: {
        type: Array,
        default: () => ['all records', 'active records']
      }
    },
    data() {
      return {
        filterName: {title: '', status: ''},
        status: false,
        activePage: 1,
        showMenu: false,
        dataMenu: {},
        //параметры отвечающие за карточку
        showCard: false,
        typeActionsCard: '',
        dataCard: {},
        //параметры отвечающие за форму отправки ссобщения
        showFormMessage: false,
        typeMessage: '',
        copyArrayData: [],
        activeFilters: this.$store.getters.get_filterActive[this.titleTable] || false, // флаг отвечающий за отображение блока фильтров
        focusFilter: false, // флаг отвечает за состоянием фокуса над input поиска
        search: {} // объект с данными по поиску
      }
    },
    computed: {
      getAllRecords() {
        return this.$store.getters.get_allRecords[this.titleTable]
      },
      /**
       * Вычиялсем все ключи
       * @returns {[]}
       */
      worksFields() {
        let keys = [];
        for (let item in this.dataTable[0]) keys.push(item)
        return keys
      },
      filterList() {
        let filterArray = [];
        filterArray = this.dataTable.slice(); //скопировал массив
        if (this.getAllRecords) {
          let StatusArr = [];
          filterArray.find(el => {
            el.status ? StatusArr.push(el) : ''
          })
          filterArray = StatusArr
        }
        if (this.filterName.title === '' && Object.keys(this.forTextInsearch).length === 0) {
          return filterArray
        } else {
          let newArrayFilterInSearch = [];
          if (Object.keys(this.forTextInsearch).length === 0) {
            newArrayFilterInSearch = filterArray
          } else {
            for (let i = 0; i < filterArray.length; i++) {
              let status = true;
              for (let elFilterArray in filterArray[i]) {
                for (let searchText in this.forTextInsearch) {
                  if (searchText === elFilterArray) {
                    if (filterArray[i][elFilterArray].toString().indexOf(this.forTextInsearch[searchText]) === -1) {
                      status = false
                    }
                  }
                }
              }
              if (status) {
                newArrayFilterInSearch.push(filterArray[i])
              }
            }
          }
          if (this.filterName.title && newArrayFilterInSearch.length > 0 && typeof newArrayFilterInSearch[0][this.filterName.title] === 'number') {
            if (this.filterName.status === 'up') {
              newArrayFilterInSearch = newArrayFilterInSearch.sort((a, b) => {
                return a[this.filterName.title] - b[this.filterName.title]
              })
            } else if (this.filterName.status === 'down') {
              newArrayFilterInSearch = newArrayFilterInSearch.sort((a, b) => {
                return b[this.filterName.title] - a[this.filterName.title]
              })
            } else {
              newArrayFilterInSearch = this.dataTable
            }

          } else {
            newArrayFilterInSearch = newArrayFilterInSearch.sort((a, b) => {
              let nameA = a[this.filterName.title] !== null ? a[this.filterName.title] : '',
                nameB = b[this.filterName.title] !== null ? b[this.filterName.title] : '';
              if (this.filterName.status === 'up') {
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                else return 0
              } else if (this.filterName.status === 'down') {
                if (nameA > nameB) return -1;
                if (nameA < nameB) return 1;
                else return 0
              } else {
                newArrayFilterInSearch = newArrayFilterInSearch
              }
            })
          }
          return newArrayFilterInSearch
        }
      },
      /**
       * вычесление количества строк в таблице
       * @returns {number}
       */
      numberPagesCD() {
        return Math.ceil(this.filterList.length / this.numberRow)
      },
      /**
       * обработчик закрытия модального окна при клике на любую область кроме области тела таблицы
       */
      closeBodyDDM() {
        document.body.addEventListener('click', (e) => {
          if (this.showMenu) {
            if (!e.target.classList.contains('tbr')) this.showMenu = false
          }
        })
      },
      filtersSearch() {
        return this.$store.getters.get_search
      },
      textInSearch() {
        if (this.$store.getters.get_search && this.$store.getters.get_search[this.titleTable] !== undefined) {
          return this.$store.getters.get_search[this.titleTable]
        }
      },
      /**
       * обновление даннх по поиску возвращает объект с полями для поиска
       */
      forTextInsearch() {
        let search = {}
        for (let i in this.textInSearch) {
          if (this.textInSearch[i] !== '') {
            search[i] = this.textInSearch[i]
          }
        }
        return search
      }
    },
    methods: {
      /**
       * функция подтверждения
       * @param message - сообщение перед выполнением
       */
      confirmAlert(message) {
        let result = confirm(message)
        return result
      },
      /**
       * ловим данные от шапки по какому полю сортировать
       */
      sortParrent(data) {
        this.filterName = data
      },
      /**
       * ловим от пагинации активную страницу
       * @param data
       */
      activePageParrent(data) {
        this.activePage = data.page
      },
      /**
       * Событие выпадающего меню от тела таблицы и отображаем выпадающее меню
       */
      dataDDMParrent(data) {
        this.dataMenu = data;
        this.showMenu = true
      },
      /**
       * метод обработки ( выбора строки пользователя )
       */
      changeRowParent(data) {
        this.$emit('changeRow', data)
      },
      /**
       * Метод обработики собтия клика по выпадающему меню
       * @param data {action:'EVENT приме р- удать ', data.el.id}
       *
       * В зависимотси что нажали, происходит определнное дейтвие
       *
       */
      actionsDDParrent(data) {
        let activerow = '';
        this.dataTable.forEach(el => {
          el.id === data.el.id ? activerow = el : ''
        });
        if (!this.settingsActionsTable) {
          switch (data.action) {
            case 'удалить':
              if (this.confirmAlert('что бы удалить запись, необходимо подтвердить ')) {
                this.deleteRow({tableName: this.nameTable, id: data.el.id, row: activerow})
              }
              break;
            case 'редактировать' || 'change' :
              this.typeActionsCard = 'change';
              this.showCard = true;
              this.dataCard = activerow;
              break;
            case 'просмотреть' || 'view':
              console.log('вы хотите открыть строку - ');
              this.typeActionsCard = 'view';
              this.showCard = true;
              this.dataCard = activerow;
              break;
            case 'ответить':
              this.showFormMessage = true;
              this.dataCard = activerow;
              break;
            case 'изменить статус':
              this.changeStatus(activerow);
              break;
            default :
              alert('извините, но пока что йункционал не реализован :))')
              break;
          }
        } else {
          this.$emit('actionsTable', data)
        }

      },
      /**
       * Метод удаления данных ииз БД
       * @param data - {tableName:data.tableName,id:data.id}
       */
      async deleteRow(data) {
        const res = await deleteRow.deleteFile(data);
        if (res) {
          if (res.data) {
            // ПОСЛЕ ПОЛУЧЕНИЯ ОТВЕТА, УДАЛЯЮ ДАННЫЕ ИЗ МАССИВА
            this.dataTable.forEach((el, i) => el === data.row ? this.dataTable.splice(i, 1) : '')
          }
        }
      },
      async changeStatus( data ) {
        await api().get(`/change/status/table?id=${data.id}&status=${data.status}&tableName=${this.nameTable.nameTable}`)
          .then(res=> {
            this.dataTable.forEach(el => el.id === Number(res.data.id) ? el.status = res.data.status : '')
          })
          .catch(err => console.log(err))
      },
      /////////////////////////////////////////МЕТОДЫ ОБРАБОТКИ ПО МОДАЛЬНОЙ КАРТОЧКЕ
      /**
       * Метод закрытия модального карточки по таблице
       */
      closeModalCardParrent() {
        this.showCard = false
      },

      ////////////////////////////////////////////методы обоаботки по форме отправки сообщения
      /**
       * обработка закрытия форму отправки сообщения
       */
      closeFormMessageParrent() {
        this.showFormMessage = false
      },
      //ловим данные для отправки сообщения из формы
      toSendMessageParrent(data) {
        console.log(data)
      },

      ///////////////////////////// блок фильтров
      /**
       * метод инициализации горячей клавишы
       */
      initEventButtonFilter() {
        document.addEventListener('keydown', this.filterHotKey, false)
      },
      destroyEventButtonFilter() {
        document.removeEventListener('keydown', this.filterHotKey, false)
      },
      filterHotKey(e) {
        console.log('qweqwe')
        if (e.key.toLowerCase() === 'f' && !this.focusFilter ||
          e.key.toLowerCase() === 'а' && !this.focusFilter) {
          this.activeFilters = !this.activeFilters;
          let options = {
            name: this.titleTable,
            flag: this.activeFilters
          };
          this.$store.dispatch('SET_filterActive', options);
        }
      },

      /**
       *  метод обработки фокуса на input , что бы не использовать события открывания/ закрывания фильтров
       * @param data
       */
      onFocusParent(data) {
        this.focusFilter = data
      },
      /**
       * отлавливаю событие открытия/закрытия фильтров по клику
       */
      openFilterParent() {
        this.activeFilters = !this.activeFilters;
        this.$store.dispatch('SET_filterActive', this.activeFilters);
      }

    },
    mounted() {
      this.initEventButtonFilter()
    },
    beforeUpdate() {
      if (this.sizeTable.length > 0) {
        this.$refs.styleSort.style.width = `${this.sizeTable.reduce((start, end) => {
          return start + end
        })}px`
      } else {
        this.$refs.styleSort.style.width = `100%`
      }
    },
    updated() {
      setTimeout(() => {
        this.$refs.styleSort.style.width = `0`
      }, 1000)

    },
    beforeDestroy() {
      this.destroyEventButtonFilter()
    }
  }
</script>

<style lang="less">
  #MCTable {
    min-width: 100%;
    width: auto;
    min-height: 100%;
    height: auto;
    overflow-x: auto;

    .style-sort {
      width: 0;
      height: 1px;
      background: #2574CF;
      transition: .2s ease-in-out;
    }
  }


  #MCTable::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 1px;
    background-color: #ebf0f5;
  }

  #MCTable::-webkit-scrollbar {
    width: 1px;
    height: 8px;
    background-color: #F5F5F5;
  }

  #MCTable::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(151, 153, 156, 0.3);
    background-color: #565657;
  }
</style>
