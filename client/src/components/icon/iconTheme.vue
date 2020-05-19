<template>
  <div
    id="iconTheme"
    :style="{width: size+'px', height:size+'px'}"
    @mouseover="inColor"
    @mouseleave="outColor"
    @click="clickTheme"
  >
    <cm-toolbar :toolbar="'изменить тему оформления'">
      <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4062 11.5781C16.7188 11.8594 17.0781 12 17.4844 12C17.8906 12 18.2344 11.8594 18.5156 11.5781C18.8281 11.2969 18.9844 10.9375 18.9844 10.5C18.9844 10.0625 18.8281 9.70312 18.5156 9.42188C18.2344 9.14062 17.8906 9 17.4844 9C17.0781 9 16.7188 9.14062 16.4062 9.42188C16.125 9.70312 15.9844 10.0625 15.9844 10.5C15.9844 10.9375 16.125 11.2969 16.4062 11.5781ZM13.4062 7.59375C13.7188 7.875 14.0781 8.01562 14.4844 8.01562C14.8906 8.01562 15.2344 7.875 15.5156 7.59375C15.8281 7.28125 15.9844 6.92188 15.9844 6.51562C15.9844 6.10938 15.8281 5.76562 15.5156 5.48438C15.2344 5.17188 14.8906 5.01562 14.4844 5.01562C14.0781 5.01562 13.7188 5.17188 13.4062 5.48438C13.125 5.76562 12.9844 6.10938 12.9844 6.51562C12.9844 6.92188 13.125 7.28125 13.4062 7.59375ZM8.4375 7.59375C8.75 7.875 9.10938 8.01562 9.51562 8.01562C9.92188 8.01562 10.2656 7.875 10.5469 7.59375C10.8594 7.28125 11.0156 6.92188 11.0156 6.51562C11.0156 6.10938 10.8594 5.76562 10.5469 5.48438C10.2656 5.17188 9.92188 5.01562 9.51562 5.01562C9.10938 5.01562 8.75 5.17188 8.4375 5.48438C8.15625 5.76562 8.01562 6.10938 8.01562 6.51562C8.01562 6.92188 8.15625 7.28125 8.4375 7.59375ZM5.4375 11.5781C5.75 11.8594 6.10938 12 6.51562 12C6.92188 12 7.26562 11.8594 7.54688 11.5781C7.85938 11.2969 8.01562 10.9375 8.01562 10.5C8.01562 10.0625 7.85938 9.70312 7.54688 9.42188C7.26562 9.14062 6.92188 9 6.51562 9C6.10938 9 5.75 9.14062 5.4375 9.42188C5.15625 9.70312 5.01562 10.0625 5.01562 10.5C5.01562 10.9375 5.15625 11.2969 5.4375 11.5781ZM12 3C14.4688 3 16.5781 3.78125 18.3281 5.34375C20.1094 6.90625 21 8.79688 21 11.0156C21 12.3906 20.5 13.5625 19.5 14.5312C18.5312 15.5 17.3594 15.9844 15.9844 15.9844H14.25C13.8125 15.9844 13.4531 16.1406 13.1719 16.4531C12.8906 16.7344 12.75 17.0781 12.75 17.4844C12.75 17.8281 12.875 18.1562 13.125 18.4688C13.375 18.7812 13.5 19.125 13.5 19.5C13.5 19.9375 13.3594 20.2969 13.0781 20.5781C12.7969 20.8594 12.4375 21 12 21C9.5 21 7.375 20.125 5.625 18.375C3.875 16.625 3 14.5 3 12C3 9.5 3.875 7.375 5.625 5.625C7.375 3.875 9.5 3 12 3Z" :fill="colorIcon"/>
      </svg>
    </cm-toolbar>
  </div>
</template>

<script>
    import CmToolbar from "../mainComponent/toolbar/toolbar";
    export default {
        /**
         * КОМПОНЕНТ ИКОНИ ДОМОЙ
         * @param:
         *        size      - размер иконки
         *        color     - цвет иконки
         *
         * ПРИМЕР ВЫЗОВА ИКОНКИ
         *                      <div class="icon" style="width: 100%; height: 50px;">
         *                             <icon-navigation-home :color="'red'"/>
         *                       </div>
         */
        name: "iconTheme",
        components: {CmToolbar},
        props: {
            size: {
                type: Number,
                default: 34
            },
            color: {
                type: String,
                default: '#FFFFFF'
            }
        },
        data() {
            return {
                colorIcon: '#909090',
                testBool:false
            }
        },
        computed: {
          style() {
              return [this.$store.getters.get_activeThemeSwitcher.standart.active, this.$store.getters.get_activeThemeSwitcher.selectedTheme.active]
          }
        },
        methods: {
            inColor() {
                this.colorIcon = '#4A90E2';
            },
            outColor() {
                this.colorIcon = this.color;
            },
            clickTheme() {
                this.$store.commit('set_activeTopicChange')
            },
            initActiveThemeStorage() {
                this.$store.dispatch('activeTheme')

            }
        },
        mounted() {
            this.colorIcon = this.color;
            this.initActiveThemeStorage()
        }
    }
</script>

<style lang="less">
  #navigationHomeTestings {
    position: relative;
    > svg {
      position: absolute;
    }
  }
</style>





