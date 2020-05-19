<template>
  <div id="fsIconImage">
    <svg :width="size" :height="size" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M38 0L63.3333 25.3333V67.1333C63.3333 72.0303 59.3636 76 54.4667 76H8.86667C3.96974 76 0 72.0303 0 67.1333V8.86667C0 3.96974 3.96974 0 8.86667 0H38Z" :fill="fill"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M63.333 25.332H47.3142C42.4173 25.332 37.9997 20.9145 37.9997 16.0175V-0.00130081L63.333 25.332Z" fill="white" fill-opacity="0.4"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4111 31.668H14.0764C13.299 31.668 12.6689 32.2982 12.6689 33.0757V55.5947C12.6689 56.3718 13.299 57.0013 14.0764 57.0013H39.4111C40.1885 57.0013 40.8186 56.3718 40.8186 55.5947V33.0757C40.8186 32.2982 40.1884 31.668 39.4111 31.668ZM36.5954 52.7774H16.8909V45.7408L21.1133 41.5181L28.1508 48.5555L32.373 44.3325L36.5954 48.5555V52.7774ZM30.9667 38.7046C30.9667 40.2592 32.2268 41.5193 33.7815 41.5193C35.3362 41.5193 36.5964 40.2592 36.5964 38.7046C36.5964 37.1495 35.3361 35.8898 33.7815 35.8898C32.2268 35.8898 30.9667 37.1494 30.9667 38.7046Z" fill="white"/>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "FS__icon-image",
        props: {
            size: {
                type: Number,
                default: 24
            },
            fill: {
                type: String,
                default: '#627CFE'
            }
        },
    }
</script>

<style scoped>

</style>


