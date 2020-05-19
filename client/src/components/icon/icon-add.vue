<template>
    <div id="arrow" :style="{width: width+'px', height: height+'px'}">
      <svg :width="width" :height="height" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.9844 7.98438H7.98438V13.9844H6.01562V7.98438H0.015625V6.01562H6.01562V0.015625H7.98438V6.01562H13.9844V7.98438Z" :fill="fill"/>
      </svg>
    </div>
</template>

<script>
    export default {
        name: "icon-add",
        props: {
            width: {
                type: String,
                default: '10'
            },
            height: {
                type: String,
                default: '10'
            },
            fill: {
                type: String,
                default: '#1E1E1E'
            }
        }
    }
</script>

<style lang="less">
#arrow {
  position: relative;
  > svg {
    position: absolute;
  }
}
</style>
