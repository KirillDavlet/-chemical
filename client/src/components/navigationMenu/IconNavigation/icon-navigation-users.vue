<template>
  <div id="navigationHomeUsers" :style="{width: size+'px', height:size+'px'}" @mouseover="inColor" @mouseleave="outColor">
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3125 12C2.3125 6.64973 6.64973 2.3125 12 2.3125C17.3503 2.3125 21.6875 6.64973 21.6875 12C21.6875 17.3503 17.3503 21.6875 12 21.6875C6.64973 21.6875 2.3125 17.3503 2.3125 12ZM5.14277 16.9167C6.6741 19.0487 9.17473 20.4375 12 20.4375C14.8253 20.4375 17.3259 19.0487 18.8572 16.9167C18.7345 15.8624 17.9718 14.9773 16.9221 14.7149L15.6575 14.3988C14.6393 15.273 13.3563 15.75 12 15.75C10.6437 15.75 9.36074 15.273 8.34242 14.3988L7.07781 14.7149C6.0282 14.9773 5.26547 15.8624 5.14277 16.9167ZM12 14.5C9.58375 14.5 7.625 12.5413 7.625 10.125C7.625 7.70875 9.58375 5.75 12 5.75C14.4163 5.75 16.375 7.70875 16.375 10.125C16.375 12.5413 14.4163 14.5 12 14.5Z" fill="transparent"/>
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3125 12C2.3125 6.64973 6.64973 2.3125 12 2.3125C17.3503 2.3125 21.6875 6.64973 21.6875 12C21.6875 17.3503 17.3503 21.6875 12 21.6875C6.64973 21.6875 2.3125 17.3503 2.3125 12ZM5.14277 16.9167C6.6741 19.0487 9.17473 20.4375 12 20.4375C14.8253 20.4375 17.3259 19.0487 18.8572 16.9167C18.7345 15.8624 17.9718 14.9773 16.9221 14.7149L15.6575 14.3988C14.6393 15.273 13.3563 15.75 12 15.75C10.6437 15.75 9.36074 15.273 8.34242 14.3988L7.07781 14.7149C6.0282 14.9773 5.26547 15.8624 5.14277 16.9167ZM12 14.5C9.58375 14.5 7.625 12.5413 7.625 10.125C7.625 7.70875 9.58375 5.75 12 5.75C14.4163 5.75 16.375 7.70875 16.375 10.125C16.375 12.5413 14.4163 14.5 12 14.5Z" :fill="colorIcon"/>
      </mask>
      <g mask="url(#mask0)">
        <rect width="24" height="24" :fill="colorIcon"/>
      </g>
    </svg>
  </div>
</template>

<script>
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
        name: "icon-navigation-users",
        props: {
            size: {
                type: Number,
                default: 24
            },
            color: {
                type: String,
                default: '#909090'
            }
        },
        data() {
            return {
                colorIcon: '#909090',
                testBool:false
            }
        },
        methods: {
            inColor() {
                this.colorIcon = '#4A90E2';
            },
            outColor() {
                this.colorIcon = this.color;
            }
        },
        mounted() {
            this.colorIcon = this.color;
        }
    }
</script>

<style lang="less">
  #iconNavigationUsers {
    position: relative;
    > svg {
      position: absolute;
    }
  }
</style>


