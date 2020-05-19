<template>
    <div id="reminderSize">
    <span>Всего событий - 12</span>
    <span>Сегодня - 1</span>
    <span>Завтра - 11</span>
    </div>
</template>

<script>
    export default {
        /**
         * компонент отрисовки общей информации по событию ( сколько всего, сколько сегодня, сколько завтра )
         */
        name: "reminderSize",
        props: {

        }
    }
</script>

<style lang="less">
#reminderSize {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 5%;
  > span:not(:last-child) {
    margin-right: 25px;
  }
  > span {
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 0.02em;
    color: #1E1E1E;
  }
}
</style>
