<template>
    <div id="arrow" :style="{width: width+'px', height: height+'px'}">
      <svg :width="width" :height="height" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.656954 18.6167C0.247543 19.0261 0.247543 19.6899 0.656954 20.0993L1.02995 20.4723C1.43936 20.8817 2.10314 20.8817 2.51255 20.4723L12.15 10.8348L2.51255 1.19736C2.10314 0.787947 1.43936 0.787948 1.02995 1.19736L0.656953 1.57035C0.247543 1.97976 0.247542 2.64355 0.656953 3.05296L8.43883 10.8348L0.656954 18.6167Z" :fill="fill"/>
      </svg>
    </div>
</template>

<script>
    export default {
        name: "arrow",
        props: {
            width: {
                type: String,
                default: '14'
            },
            height: {
                type: String,
                default: '14'
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
