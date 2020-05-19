<template>
  <div id="fsIconTextFile">
    <svg :width="size" :height="size" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M37.9998 0L63.333 25.3332V67.133C63.333 72.0299 59.3633 75.9996 54.4664 75.9996H8.86662C3.96972 75.9996 0 72.0299 0 67.133V8.86662C0 3.96972 3.96972 0 8.86662 0H37.9998Z" :fill="fill"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M63.332 25.332H47.3133C42.4164 25.332 37.9988 20.9145 37.9988 16.0176V-0.0011673L63.332 25.332Z" fill="white" fill-opacity="0.4"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M38.0031 33.832H12.6699V36.9987H38.0031V33.832ZM38.0031 40.1655H12.6699V43.3321H38.0031V40.1655ZM12.6699 46.503H38.0031V49.6697H12.6699V46.503ZM25.3365 52.8303H12.6699V55.9969H25.3365V52.8303Z" fill="white"/>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "FS__icon-textFile",
        props: {
            size: {
                type: Number,
                default: 24
            },
            fill: {
                type: String,
                default: '#5895FF'
            }
        },
    }
</script>

<style scoped>

</style>


