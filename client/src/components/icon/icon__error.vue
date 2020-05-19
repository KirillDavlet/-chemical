<template>
  <div id="icon__error" :style="{width: size+'px', height: size+'px'}">
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="24" height="24" rx="1" :fill="color.fill"/>
      <path
        d="M12.0001 13.4453C11.1179 13.4453 10.4028 14.1694 10.4028 15.0625C10.4028 15.9556 11.1179 16.6797 12.0001 16.6797C12.8822 16.6797 13.5973 15.9556 13.5973 15.0625C13.5973 14.1694 12.8822 13.4453 12.0001 13.4453Z"
        :fill="color.mass"/>
      <path
        d="M10.4835 7.63237L10.7411 12.4136C10.7532 12.6374 10.9359 12.8125 11.1572 12.8125H12.8428C13.0641 12.8125 13.2468 12.6374 13.2588 12.4136L13.5164 7.63237C13.5294 7.3907 13.3394 7.1875 13.1003 7.1875H10.8995C10.6605 7.1875 10.4705 7.3907 10.4835 7.63237Z"
        :fill="color.mass"/>
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" :width="size" :height="size">
        <rect :width="size" :height="size" :fill="color.mass"/>
      </mask>
      <g mask="url(#mask0)">
      </g>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "icon__error",
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
                    mass:'#dadada',
                    fill:'#e32028'
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

<style lang="less">

</style>
