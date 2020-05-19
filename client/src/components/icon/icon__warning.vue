<template>
    <div id="icon__warning" :style="{width: size+'px', height: size+'px'}">
      <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7749 18.4692C22.4158 19.594 21.6113 21 20.3313 21H3.66855C2.38602 21 1.58525 19.5918 2.22491 18.4692L10.5564 3.84322C11.1976 2.71791 12.8036 2.71995 13.4437 3.84322L21.7749 18.4692ZM12 15.4453C11.1179 15.4453 10.4028 16.1694 10.4028 17.0625C10.4028 17.9556 11.1179 18.6797 12 18.6797C12.8821 18.6797 13.5972 17.9556 13.5972 17.0625C13.5972 16.1694 12.8821 15.4453 12 15.4453ZM10.7412 14.4136L10.4836 9.63237C10.4706 9.3907 10.6606 9.1875 10.8996 9.1875H13.1004C13.3394 9.1875 13.5294 9.3907 13.5164 9.63237L13.2589 14.4136C13.2468 14.6374 13.0641 14.8125 12.8428 14.8125H11.1572C10.9359 14.8125 10.7532 14.6374 10.7412 14.4136Z" :fill="color.mass"/>
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="20" height="18">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7749 18.4692C22.4158 19.594 21.6113 21 20.3313 21H3.66855C2.38602 21 1.58525 19.5918 2.22491 18.4692L10.5564 3.84322C11.1976 2.71791 12.8036 2.71995 13.4437 3.84322L21.7749 18.4692ZM12 15.4453C11.1179 15.4453 10.4028 16.1694 10.4028 17.0625C10.4028 17.9556 11.1179 18.6797 12 18.6797C12.8821 18.6797 13.5972 17.9556 13.5972 17.0625C13.5972 16.1694 12.8821 15.4453 12 15.4453ZM10.7412 14.4136L10.4836 9.63237C10.4706 9.3907 10.6606 9.1875 10.8996 9.1875H13.1004C13.3394 9.1875 13.5294 9.3907 13.5164 9.63237L13.2589 14.4136C13.2468 14.6374 13.0641 14.8125 12.8428 14.8125H11.1572C10.9359 14.8125 10.7532 14.6374 10.7412 14.4136Z" :fill="color.fill"/>
        </mask>
      </svg>
    </div>
</template>

<script>
    export default {
        name: "icon__warning",
        props: {
            small: {
                type: Boolean,
                default: false
            },
            normal: {
                type: Boolean,
                default: false
            },
            big: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                size: null,
                color: {
                    mass:'#ff980f',
                    fill:'#ffe99e'
                }
            }
        },
        methods: {
            initIcon() {
                if (this.big) {
                    this.size = 40
                }
                else if(this.small) {
                    this.size = 16
                }
                else {
                    this.size = 24
                }
            }
        },
        mounted() {
            this.initIcon()
        }
    }
</script>

<style scoped>

</style>
