<template>
  <div id="header">
    <span>{{ title }}</span>
  </div>
</template>

<script>
    export default {
        name: "slider__header",
        props: {
            title: String
        }
    }
</script>

<style lang="less">
#header {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  > span {
    font-size: 24px;
    letter-spacing: 0.02em;
    color: #2e2e2e;
  }
}
</style>
