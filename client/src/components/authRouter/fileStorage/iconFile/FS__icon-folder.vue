<template>
  <div id="fsIconFolder">
    <svg :width="size" :height="size" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="nonzero" clip-rule="evenodd"
            d="M11.238 90H78.761C84.958 90 90 84.958 90 78.762V30.53C90 24.334 84.958 19.293 78.762 19.293H48.858C47.326 19.293 45.382 18.092 44.698 16.723L38.503 4.332C37.289 1.903 34.21 0 31.495 0H11.238C5.042 0 0 5.042 0 11.238V78.761C0 84.958 5.042 90 11.238 90ZM3.183 11.238C3.183 6.797 6.797 3.183 11.238 3.183H31.495C33.027 3.183 34.972 4.386 35.655 5.755L41.85 18.144C43.064 20.573 46.142 22.476 48.858 22.476H78.761C83.203 22.476 86.816 26.089 86.816 30.53V37.62H3.183V11.238ZM86.816 40.805H3.183V78.762C3.183 83.204 6.797 86.817 11.238 86.817H78.761C83.204 86.817 86.816 83.203 86.816 78.762V40.805Z"
            :fill="fill" />
    </svg>
  </div>
</template>

<script>
    export default {
        name: "FS__icon-folder",
        props: {
            size: {
                type: Number,
                default: 24
            },
            fill: {
                type: String,
                default: '#ffcf5c'
            }
        },
    }
</script>

<style scoped>

</style>


