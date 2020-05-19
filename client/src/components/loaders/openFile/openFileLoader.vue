<template>
    <div class="open-file-loader">

    </div>
</template>

<script>
    export default {
        name: "openFileLoader"
    }
</script>

<style lang="less">
.open-file-loader {
  width: 50px;
  height: 50px;
  border: 1px solid lightblue;
  border-radius: 45%;
  animation: loaderOpenFile .4s linear infinite;

  @keyframes loaderOpenFile {
    0% {transform: rotate(0)}
    100% {transform: rotate(360deg)}  }

}
</style>
