<template>
  <div
    id="MCTableHeader"
    :style="{width:sizeTable.length > 0 ? styleSumm : '100%'}">
    <div
      v-for="(title, i) in titleTable"
      :style="{minWidth:style(i),width:style(i)}"
      :key="`title-${i}`"
      :data-filter="title"
      @click="SORT(title)">
      <span>{{ _(title) }}</span>
      <icon__sorting :style="{transform: activeFilter.status === 'down' && activeFilter.title === title ? '' : 'rotate(180deg)'}"
        :fill="title=== activeFilter.title && activeFilter.status !== '' ? '#097ABD' : '#979fa3'"/>
    </div>
  </div>
</template>

<script>
  import Icon__sorting from "../../tableIcon/sorting";

  /**
   * КОМПОНЕНТ ЗАГОЛОВКА (ШАПКИ) ТАБЛИЦЫ
   * ОТВЕЧАЕТ ЗА НАПРАВЛЯЮЩИЕ ТАБЛИЦЫ, СОРТИРОВКУ, ФИЛЬТРАЦИЮ
   * ОТОБРАЖЕНИЕ ЭЛЕМЕНТОВ ТАБЛИЦЫ ПРОИСХОДИТ ПО УСЛОВИЮ, ОТ НЕОБХОДИМЫХ
   *
   * @param props:
   *              - titleTable                - массив заголовков
   *              - sizeTable                 - массив размеров ( если пустой, тогда автомкатические размеры ) если передаем, то количество размеровЮ долнжо совпадать с количеством заголовков
   */
  export default {
    name: "MC__table-header",
    components: {Icon__sorting},
    props: {
      titleTable: {
        type: Array,
        default: () => []
      },
      sizeTable: {
        type: Array,
        default: () => []
      },
      checkedActive: {
        type: Boolean,
        default: false
      } // парамкетр отвечает нужно ли отрисовывать выбор строк
    },
    data() {
      return {
        activeFilter: {
          title: '',
          status: ''
        }
      }
    },
    computed: {
      /**
       * метод расчета общей длинные блока
       */
      styleSumm() {
        let summ = this.sizeTable.reduce((start, end) => {
          return start + end
        });
        return `${summ}px`
      },
    },
    methods: {
      /**
       * метод расчета размеров блоков
       * @param i - номер поля с которым работаем
       * @returns {string}
       */
      style(i) {
        if (this.sizeTable.length === 0) {
          return `calc(100% / ${this.titleTable.length})`
        } else {
          return this.sizeTable[i] + 'px'
        }
      },
      /**
       * метод сортировки по полю
       * @param title
       * @constructor
       */
      SORT(title) {
        if (this.activeFilter.title === title) {
          if (this.activeFilter.status === 'up') this.activeFilter.status = 'down';
          else if (this.activeFilter.status === 'down') this.activeFilter.status = '';
          else this.activeFilter.status = 'up'
        } else {
          this.activeFilter = {
            title: title,
            status: 'up'
          }
        }
        this.$emit('SORT', this.activeFilter)
      },
    },

  }
</script>

<style lang="less">
  #MCTableHeader {
    width: auto;
    height: auto;
    min-height: 50px;
    display: flex;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      > span {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.02em;
        color: inherit;
        margin-right: 5px;
      }
    }
  }
</style>
