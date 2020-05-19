<template>
  <div
    id="MCTableBodyRow"
    class="tbr"
    :style="{width: tableSize.length > 0 ? styleSumm : '100%'}"
    @click="settingsMenu">
    <div class="table-body-checked tbr" v-if="checkedActive">
      <input type="checkbox" @change="changeRow" :checked="searchInArrayChecked">
    </div>
    <div class="table-body-row tbr"
         v-for="(title, name) in dataTableBodyRow"
         ref="dataTableBodyRow">
      <div v-if="name === 'status'" class="table-body-row__status tbr ">
        <div :style="{background: title ? 'green' : 'red'}"></div>
      </div>
      <span class="tbr">
          {{name==='status' ? statusChange(title) : title }}
        </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MC__table-body-row",
    props: {
      dataTableBodyRow: {
        type: Object,
        default: () => {
        }
      },
      tableSize: {
        type: Array,
        default: () => []
      },
      nameTable: {
        type: Object,
        default: () => {
        }
      },
      idRow: {type: Number, default: null}, //уникальный ключ строки
      checkedActive: {
        type: Boolean,
        default: false
      }, // парамкетр отвечает нужно ли отрисовывать выбор строк
      activeCheckedArray: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      /**
       * метод расчета общей длинные блока
       */
      styleSumm() {
        let summ = this.tableSize.reduce((start, end) => {
          return start + end;
        });
        return `${summ}px`;
      },
      searchInArrayChecked() {
        return this.activeCheckedArray.some(el => el === this.dataTableBodyRow.id)
      }

    },
    methods: {
      /**
       * метод расчета размеров блоков
       */
      style() {
        this.$refs.dataTableBodyRow.forEach((el, i) => {
          if (this.tableSize.length === 0) {
            el.style.minWidth = `calc(100% / ${Object.keys(this.dataTableBodyRow).length})`;
            el.style.width = `calc(100% / ${Object.keys(this.dataTableBodyRow).length})`;
          } else {
            el.style.minWidth = `${this.tableSize[i]}px`;
            el.style.width = `${this.tableSize[i]}px`;
          }
        })
      },
      /**
       * метод клика на строку и отображения выподающего меню
       * @param e
       */
      settingsMenu(e) {
        this.$emit('activeRowSettings', {
          el: {id: this.idRow},
          position: {
            x: e.pageX,
            y: e.pageY
          }
        });
      },
      statusChange(status) {
        if (this.nameTable && this.nameTable.nameDB === 'supportsystemchimical') {
          return status === 1 ? 'решен' : 'не решен'
        } else {
          return status === 1 ? 'активный' : 'не активный'
        }
      },
      changeRow({type, target}) {
        this.$emit('changeRow', {id: this.dataTableBodyRow.id, value: target.checked})
      }

    },
    mounted() {
      this.style()
    }
  }
</script>

<style lang="less">
  #MCTableBodyRow {
    width: auto;
    height: auto;
    min-height: 35px;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    cursor: pointer;

    .table-body-checked {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .table-body-row {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      position: relative;

      > span {
        white-space: nowrap;
        overflow: hidden;
        padding: 0 5px;
        text-overflow: ellipsis;
      }

      &__status {
        position: absolute;
        left: 5px;
        width: 7px;
        height: 7px;

        > div {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
</style>
