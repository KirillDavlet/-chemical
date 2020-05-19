<template>
  <div id="checkedRadio" @click="active">
      <div class="checked"
           :style="{border: `2px solid ${activeColor}`, width: width+'px', height: height+'px'}">
        <div v-if="checked" :style="{background: activeColor}"></div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "checkedRadio",
        props: {
            checked: {type: Boolean, default: false},
            width: {type: Number, default: 20},
            height: {type: Number, default: 20},
            color: {
                type: Array,
                default: function () {
                    return ['#4A90E2','#989898']
                }

            },
        },
        computed: {
            // свойство стилей по активному/ неактивному флагу
            activeColor() {
                return this.checked ? this.color[0] : this.color[1]
            }
        },
        methods: {
            //метод активации флага
            // родителю летит противополодный флаг тому, который пришел
            active() {
                this.$emit('activeFlag', !this.checked)
            }
        }
    }
</script>

<style lang="less">
#checkedRadio {
  width: auto;
  height: auto;
  .checked {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    > div {
      width: 40%;
      height: 40%;
      border-radius: 50%;
    }
  }
}
</style>
