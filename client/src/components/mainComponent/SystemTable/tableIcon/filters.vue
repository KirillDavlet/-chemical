<template>
  <svg  :width="size" :height="size" :viewBox="vieBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"
          :fill="fill"/>
  </svg>
</template>

<script>
    export default {
        name: "icon__filters",
        props: {
            size: {
                type: Number,
                default: 24
            },
            fill: {
                type: String,
                default: '#5a5674'
            },
            vieBox: '0 0 24 24'
        }
    }
</script>

<style scoped>

</style>




