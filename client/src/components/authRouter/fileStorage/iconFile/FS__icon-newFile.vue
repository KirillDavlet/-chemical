<template>
  <div id="fsIconAudio">
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3.51562C21.5312 3.51562 22 3.71875 22.4062 4.125C22.8125 4.5 23.0156 4.95312 23.0156 5.48438V19.5C23.0156 20.0312 22.8125 20.5 22.4062 20.9062C22 21.3125 21.5312 21.5156 21 21.5156H3C2.46875 21.5156 2 21.3125 1.59375 20.9062C1.1875 20.5 0.984375 20.0312 0.984375 19.5V5.48438C0.984375 4.95312 1.1875 4.5 1.59375 4.125C2 3.71875 2.46875 3.51562 3 3.51562H9V5.48438H3V19.5H21V5.48438H15V3.51562H21ZM12 16.5L8.01562 12.5156H11.0156V3.51562H12.9844V12.5156H15.9844L12 16.5Z" :fill="fill"/>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "FS__icon-new-file",
        props: {
            size: {
                type: Number,
                default: 30
            },
            fill: {
                type: String,
                default: '#47a2f9'
            }
        },
    }
</script>

<style scoped>

</style>


