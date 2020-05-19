<template>
  <span id="toolbar" ref="toolbar">
      <span class="toolbar-slot" @mouseover="showToolbar = true" @mouseout="showToolbar = false">
        <slot></slot>
      </span>
    <div

      class="mc__toolbar"
      v-if="showToolbar"
      :style="{background:theme.background, color: theme.color}">
      <span :style="{fontSize:size+'px'}">
        {{ _(toolbar) }}
      </span>
    </div>
  </span>
</template>

<script>
    export default {
        name: "cm-toolbar",
        props: {
            toolbar: String,
            size: {
                type: Number,
                default: 14
            },
        },
        data() {
            return {
                showToolbar: false
            }
        },
        computed: {
            theme() {
                // return this.$store.getters.ACTIVETHEME.body
                return {
                    background:'#1E1E1E',
                    color:'#FFFFFF'
                }
            }
        },
    }
</script>

<style lang="less">
  #toolbar {
    position: relative;
    cursor: pointer;
    .toolbar-slot {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mc__toolbar {
      width: auto;
      height: auto;
      min-height: 35px;
      max-width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      opacity: 0;
      z-index: 5000;
      animation: show .3s ease-in-out forwards;
      border-radius: 4px;
      > span {
        color: inherit;
        padding: 5px 8px;
      }
    }
  }

  @keyframes show {
    0% {opacity: 0}
    100% {opacity: 1}
  }
</style>
