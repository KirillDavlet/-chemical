<template>
    <div class="slider-icon-empty" :style="style">
        <span>место для иконки</span>
    </div>
</template>

<script>
    export default {
        name: "icon_emptySlider",
        props: {
            size: {
                type: Number,
                default: 120
            }
        },
        computed: {
            style() {
                return {
                    width: `${this.size}px`,
                    height: `${this.size}px`,
                    background: this.$props.color ? this.$props.color : '#80808033'
                }
            }
        }
    }
</script>

<style lang="less">
.slider-icon-empty {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
