<template>
    <div id="newTest">
      <div class="newTest">
        <div class="newTest__header">
          <span>СОЗДАТЬ НОВЫЙ ТЕСТ</span>
        </div>
        <div class="newTest__body">
          <testings />
        </div>
      </div>

    </div>
</template>

<script>
    import Testings from "./testings";
    export default {
        name: "newTest",
      components: {Testings},
      mounted() {
          this.get_access('testings/newTest')
        }
    }
</script>

<style lang="less">
  #newTest {
    width: 100%;
    height: auto;
    margin-top: 45px;
    .newTest {
      width: 100%;
      height: 100%;
      &__header {
        width: 100%;
        height: 50px;
        > span {
          padding: 5px 15px;
          font-size: 36px;
          color: black;
          letter-spacing: 0.02em;

        }
      }
      &__body {
        width: 100%;
        height: 100%;
        padding: 15px 12px ;
      }
    }
  }
</style>
