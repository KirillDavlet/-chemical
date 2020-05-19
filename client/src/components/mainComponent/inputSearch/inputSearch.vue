<template>
  <div class="input-search">
    <input type="text"
           :placeholder="_(placeholder) + '...'"
           @input="outText"
           v-model="text"
           @focus="onFocus"
           @blur="onBlur">
  </div>
</template>

<script>
  export default {
    name: "inputSearch",
    props: {
      /**
       * стркоа поиска ( если сохраняеться )
       */
      textSearch: {
        type: String,
        default: ''
      },
      /**
       * имя строки по поиску
       */
      title: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: 'search'
      },
      label: {
        type: String,
        default: ''
      },
      nameTable: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        text:
          this.$store.getters.get_search[this.nameTable] && this.$store.getters.get_search[this.nameTable][this.title] ?
          this.$store.getters.get_search[this.nameTable][this.title] : ''
      }
    },
    computed: {
      filtersSearch() {
        if(this.$store.getters.get_search[this.nameTable] && this.$store.getters.get_search[this.nameTable][this.title]) {
          return this.$store.getters.get_search[this.nameTable][this.title]
        }
      }
    },
    methods: {
      onFocus() {
        this.$emit('onFocus', true)
      },
      onBlur() {
        this.$emit('onFocus', false)
      },
      /**
       * метод отправки родителю текста который печатаем
       */
      outText() {
        let options = {title: this.title, text: this.text, name:this.nameTable};
        this.$store.dispatch('SET_search_administration', options)
      }
    }
  }
</script>

<style lang="less">

.input-search {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #70889E;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > input {
    border: none;
    outline: none;
    padding: 0 15px 0 5px;
    &:active, &:focus, &:hover {
      border: none;
      outline: none;
    }
  }
}
</style>
