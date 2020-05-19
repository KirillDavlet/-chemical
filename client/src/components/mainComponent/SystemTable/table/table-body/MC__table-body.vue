<template>
  <div id="MCTableBody" :style="{height: numberRow * 35+'px'}">
    <MC__tableBodyRow
      v-if="dataTableBody.length > 0"
      :name-table="nameTable"
      v-for="(list, i) in dataTableBody"
      :key="`row-${i}`"
      :data-table-body-row="list"
      :table-size="tableSize"
      :id-row="list.id"
      :checked-active="checkedActive"
      :active-checked-array="activeCheckedArray"
      @activeRowSettings="activeRowSettingsParrent"
      @changeRow="changeRowParent"
    />
    <div class="results-none" v-if="dataTableBody.length === 0">
      <span>извините, по вашемц запросу нет совпадений</span>
    </div>
  </div>
</template>

<script>
  /**
   * КОМПОНЕНТ ТЕЛА ТАБЛИЦЫ
   *
   * @param props:
   *              - dataTableBody                -Рабочий массив объектов
   *              - tableSize                    - размеры колонок
   *              - numberRow                    - количество строк на странице в таблице, необходимо для расчета высоты тела таблицы
   *
   *
   * @param data:
   *
   *
   */
  import MC__tableBodyRow from "./MC__table-body-row";
  import DropDownMenu from "../../drop-down-menu/drop-down-menu";

  export default {
    name: "MC__table-body",
    components: {DropDownMenu, MC__tableBodyRow},
    props: {
      dataTableBody: {
        type: Array,
        default: () => []
      },
      tableSize: {
        type: Array,
        default: () => []
      },
      numberRow: {Number},
      nameTable: {
        type: Object,
        default: () => {
        }
      },
      checkedActive: {
        type: Boolean,
        default: false
      }, // парамкетр отвечает нужно ли отрисовывать выбор строк
      activeCheckedArray: {
        type: Array,
        default: ()=> []
      } //параметр отвечающий какие строки выбраны
    },
    methods: {
      /**
       * ловим событие клика по строке и отправляю данные родителю
       * @param data - id (записи)
       */
      activeRowSettingsParrent(data) {
        this.$emit('dataDDM', {
          position: data.position,
          info: data.el
        })
      },
      changeRowParent(data) {
        this.$emit('changeRow', data)
      }
    },
  }
</script>

<style lang="less">
  #MCTableBody {
    display: flex;
    flex-direction: column;
    .results-none {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0.02em;
        color: #70889E;
      }
    }
  }
</style>
