<template>
  <div class="table-filter" :style="{width:sizeTable.length > 0 ? styleSumm : '100%'}">
    <div class="table-filter__button">
      <div class="table-filter__button-status"
           v-if="titleTable.find(el => el === 'status')">
        <checked
          :active="getAllRecords"
          :label="_(titleChecked[0])"
          :label-active="_(titleChecked[1])"
          @activeChecked="activeCheckedParrent"
        />
      </div>
      <div class="table-filter__button-filters">
        <cm-toolbar :toolbar="_('F shortcut')" left>
          <div class="table-filter__button-title" @click="openFilter">
            <span>{{ _('filter') }}</span>
          </div>
          <div class="table-filter__button-icon">
            <icon__filters :fill="activeFilters ? '#097ABD' : '#5a5674'"/>
          </div>
        </cm-toolbar>
      </div>
    </div>
    <transition name="filters">
      <div class="table-filter__filters"
           v-show="activeFilters">
        <div class="table-filter__filters-search"
             v-for="(item, i) in titleTable"
             :key="i"
             :style="{minWidth:style(i),width:style(i)}">
          <input-search
            v-if="item !== 'status'"
            :title="item"
            :placeholder="item"
            :name-table="nameTable"
            @onFocus="onFocusParent"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Icon__filters from "../../tableIcon/filters";
  import CmToolbar from "../../../toolbar/toolbar";
  import InputSearch from "../../../inputSearch/inputSearch";
  import Checked from "../../../schecked/checked";

  export default {
    name: "tableFilter",
    components: {Checked, InputSearch, CmToolbar, Icon__filters},
    props: {
      activeFilters: {
        type: Boolean,
        default: false
      },
      sizeTable: {
        type: Array,
        default: () => []
      },
      titleTable: {
        type: Array,
        default: () => []
      },
      //имя таблицы , для хранения истории поиска
      nameTable: {
        type: String,
        default: ''
      },
      activeChecked: false,
      titleChecked: {
        type: Array,
        default: () => []
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
      getAllRecords() {
        return this.$store.getters.get_allRecords[this.nameTable]
      }
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
       * ловим событие фокуса / ухода с инпута
       * @param data
       */
      onFocusParent(data) {
        this.$emit('onFocus', data)
      },
      /**
       * открывание кликом
       */
      openFilter() {
        this.$emit('openFilter')
      },


      // Методы по рабтке с переключением checkbox
      activeCheckedParrent(data) {
        let options = {
          flag: data,
          name: this.nameTable
        };
        this.$store.dispatch('SET_allRecords', options)
      }
    }
  }
</script>

<style lang="less">
  .table-filter {
    min-height: 35px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;

    &__button {
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
      margin-bottom: 12px;

      &-status {
        margin-right: 15px;
        width: 210px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &-filters {
        width: 100px;
        height: 100%;
        border-radius: 4px;
        border: 1px solid #B9C3D2;
        display: flex;
        justify-content: center;
        align-items: center;
        &-title {
          width: auto;
          height: 100%;
          padding: 0 4px;
        }

        &-icon {
          width: 30px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        > div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

    }

    &__filters {
      width: 100%;
      min-height: 35px;
      display: flex;

      &-search {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 15px;

      }
    }

    .filters-enter-active, .filters-leave-active {
      transition: opacity .5s;
    }

    .filters-enter, .filters-leave-to /* .fade-leave-active до версии 2.1.8 */ {
      opacity: 0;
    }

  }
</style>
