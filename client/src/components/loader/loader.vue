<template>
  <div id="loader">
    <div class="loader-transition"></div>
  </div>
</template>

<script>
    export default {
        name: "loader"
    }
</script>

<style lang="less">
  #loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(255,255,255);
    position: absolute;
    z-index: 10000;
    top: 0;
    left: 0;

    .loader-transition {
      width: 5vw;
      height: 5vw;
      border: 1.5vh dashed #9eff70;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: transformLoader .4s linear infinite;
    }
  }

  @keyframes transformLoader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
