<template>
  <div id="fsIconVideo">
    <svg :width="size" :height="size" viewBox="0 0 26 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M14.4 4L24 13.6V29.44C24 31.2957 22.4957 32.8 20.64 32.8H3.36C1.50432 32.8 0 31.2957 0 29.44V7.36C0 5.50432 1.50432 4 3.36 4H14.4Z" fill="url(#paint0_linear)"/>
      <g filter="url(#filter0_d)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 13.6H17.9297C16.074 13.6 14.4 11.9259 14.4 10.0703V3.99998L24 13.6Z" fill="white" fill-opacity="0.4"/>
      </g>
      <path opacity="0.99" d="M12.2433 21.0615V22.9297L15.7042 24.9941V19.0026L12.2433 21.0615Z" fill="white"/>
      <path opacity="0.99" fill-rule="evenodd" clip-rule="evenodd" d="M5.44188 18.4034H12.669C13.0232 18.4034 13.3066 18.6867 13.3121 19.0353V24.9614C13.3121 25.3154 13.0232 25.5987 12.6744 25.5987H5.44188C5.08761 25.5987 4.8042 25.31 4.8042 24.9614V19.0407C4.8042 18.6867 5.09306 18.4034 5.44188 18.4034ZM11.2024 21.9983L7.56162 19.7651V24.2315L11.2024 21.9983Z" fill="white"/>
      <defs>
        <filter id="filter0_d" x="12.4" y="0" width="13.6" height="13.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="-2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0909637 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear" x1="0" y1="4" x2="0" y2="32.8" gradientUnits="userSpaceOnUse">
          <stop :stop-color="fill"/>
          <stop offset="1" :stop-color="fill"/>
        </linearGradient>
      </defs>
    </svg>

  </div>
</template>

<script>
    export default {
        name: "FS__icon-video",
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


