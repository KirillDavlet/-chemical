<template>
  <div id="fsIconBack">
    <svg :width="size" :height="size" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.431745 11.5678L9.48345 20.6192C10.0592 21.1953 10.9928 21.1953 11.5683 20.6192C12.1439 20.0436 12.1439 19.1101 11.5683 18.5346L3.55896 10.5255L11.5681 2.51663C12.1437 1.94083 12.1437 1.00741 11.5681 0.431848C10.9925 -0.14395 10.059 -0.14395 9.48322 0.431848L0.431511 9.48342C0.143728 9.77134 0 10.1483 0 10.5254C0 10.9028 0.144009 11.28 0.431745 11.5678Z" :fill="fill"/>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "FS__icon-back",
        props: {
            size: {
                type: Number,
                default: 24
            },
            fill: {
                type: String,
                default: '#F9B552'
            }
        },
    }
</script>

<style scoped>

</style>


