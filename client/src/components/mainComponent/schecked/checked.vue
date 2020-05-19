<template>
  <div id="checked">
    <span>{{labelActive && activeChecked ? labelActive :  label }}</span>
    <div
      @click="modelChecked"
      class="checked-switch"
      :style="{background: themeActiveComp ? themeActiveComp.mainBackground.background : '#ffffff'}">
      <div class="checked-switch-circle"
           :style="{background: themeActiveComp ? themeActiveComp.mainBackground.color : '#2c4aff', transform: !activeChecked ? ' translateX(25px)' : ''}">
        <svg v-if="active" width="12" height="8" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.9844 1.42188L8.40625 7L13.9844 12.5781L12.5781 13.9844L7 8.40625L1.42188 13.9844L0.015625 12.5781L5.59375 7L0.015625 1.42188L1.42188 0.015625L7 5.59375L12.5781 0.015625L13.9844 1.42188Z"
                :fill="themeActiveComp ? themeActiveComp.mainBackground.background :  '#ffffff'"/>
        </svg>
        <svg v-if="!active" width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.71715 5.84853L0.117152 3.24853C-0.0390508 3.09233 -0.0390508 2.83906 0.117152 2.68284L0.682825 2.11715C0.839028 1.96094 1.09231 1.96094 1.24851 2.11715L3 3.86863L6.75149 0.117152C6.90769 -0.0390508 7.16097 -0.0390508 7.31717 0.117152L7.88285 0.682841C8.03905 0.839044 8.03905 1.09231 7.88285 1.24853L3.28284 5.84855C3.12662 6.00475 2.87336 6.00475 2.71715 5.84853Z"
            :fill="themeActiveComp ? themeActiveComp.mainBackground.background : '#ffffff'"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
    /**
     * компонент переключатель
     * @param props:
     *              - active                                     - параметр от родителя, в каком положении переключатель
     *              - label                                      - текстовое поле
     *
     * @param data:
     *              - activeChecked                              - внутренее состояние компонента ( active )
     *
     */
    export default {
        name: "checked",
        props: {
            active: {
                type: Boolean,
                default: false
            },
            label: {type: String, default: ''},
            labelActive: {
              type: String,
              default: null
            }
        },
        data() {
            return {
                activeChecked: false
            }
        },
        computed: {
            // стили активной темы
            style() {
                // return this.$store.getters.ACTIVETHEME.header
            },
        },
        methods: {
            modelChecked() {
                this.activeChecked = !this.activeChecked;
                this.$emit('activeChecked', this.activeChecked)
            }
        },
        mounted() {
            this.activeChecked = this.active
        }
    }
</script>

<style lang="less">
  #checked {
    display: flex;
    max-height: 30px;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .checked-switch {
      width: 46px;
      height: 20px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      padding: 0 1px;
      position: relative;
      cursor: pointer;

      &-circle {
        position: absolute;
        z-index: 50;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .2s ease-in-out;
      }
    }
  }
</style>
