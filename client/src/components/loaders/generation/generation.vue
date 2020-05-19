<template>
  <div class="generation-loader">
    <span>{{ _('generation') }} {{ loadingText }}</span>
  </div>
</template>

<script>
  export default {
    name: "generationLoader",
    data() {
      return {
        count: 1,
        time: 300
      }
    },
    computed: {
      loadingText() {
        return `${'.'.repeat(this.count) }`
      }
    },
    methods: {
      initComp() {
        setInterval(()=> {
          if(this.count > 4) {
            this.count = 1
          } else {
            this.count++
          }
        }, this.time)
      }
    },
    mounted() {
      this.initComp()
    }
  }
</script>

<style lang="less">
.generation-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
}
</style>
