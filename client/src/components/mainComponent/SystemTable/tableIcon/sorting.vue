<template>
  <svg :width="size" :height="size" :viewBox="vieBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12.9844V11.0156H15V12.9844H3ZM3 6H21V8.01562H3V6ZM3 18V15.9844H9V18H3Z" :fill="fill"/>
  </svg>
</template>
<script>
    export default {
        name: "icon__sorting",
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




