<template>
  <div id="display" :title="title" :style="{width: width+'px', height: height+'px'}">
    <svg :width="width" :height="height" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9844 3.98438V6H5.01562V3.98438H8.48438L9.51562 3H14.4844L15.5156 3.98438H18.9844ZM6 18.9844V6.98438H18V18.9844C18 19.5156 17.7969 19.9844 17.3906 20.3906C16.9844 20.7969 16.5156 21 15.9844 21H8.01562C7.48438 21 7.01562 20.7969 6.60938 20.3906C6.20312 19.9844 6 19.5156 6 18.9844Z" :fill="fill"/>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "icon__delete",
        props: {
          width: {
            type: String,
            default: '16'
          },
          height: {
            type: String,
            default: '16'
          },
          fill: {
            type: String,
            default: 'rgb(143, 143, 143)'
          },
          title: {
            type: String,
            default: 'удалить'
          }
        }
    }
</script>

<style lang="less">
  #display {
    position: relative;

    > svg {
      position: absolute;
    }
  }
</style>
