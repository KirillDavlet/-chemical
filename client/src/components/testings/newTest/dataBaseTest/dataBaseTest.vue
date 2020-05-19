<template>
    <div class="db-test">
      <div class="db-test__header">
        <span>Блок по всем доступным тестам из базы данных</span>
      </div>
      <div class="db-test__body">
        <div v-for="test in getTests">
          <span>{{ test }}</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "dataBaseTest",
        computed: {
          getTests() {
              return this.$store.getters.get_questionSettings
          }
        }
    }
</script>

<style lang="less">
.db-test {
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 0 10px 30px rgba(209, 213, 223, 0.5);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  &__header  {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    > span {
      font-size: 12px;
      color: #1e1e1e;
      font-weight: 500;
    }
  }
  &__body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > div {
      > span {
        font-size: 12px;
      }
    }

  }
}
</style>
