<template>
  <div id="FSLoader">
    <div class="fs_loader">
      <span>Загрузка</span>
    </div>
  </div>
</template>

<script>
    /**
     * КОМПОНЕНТ ЗАГРУЗЧИКА ФАЙЛОВОГО ХРАНИЛИЩА
     */
    export default {
        name: "FS__loader"
    }
</script>

<style lang="less">
  #FSLoader {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .fs_loader {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        color: black;
      }
    }
  }
</style>
