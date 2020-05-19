<template>
    <div id="viewDataCard">
      <div
        class="view-data-info"
        v-for="(item, i) in dataCard" :key="i"
        v-if="i.indexOf('id') === -1"
      >
        <span class="view-title">{{ i }}</span>
        <span class="view-info">{{ item }}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "viewDataCard",
        props:{dataCard:Object},
    }
</script>

<style lang="less">
#viewDataCard {
  width: 100%;
  padding: 15px 18px;
  display: flex;
  flex-direction: column;
  .view-data-info {
    display: flex;
    min-height: 50px;
    margin-bottom: 15px;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 0, 0, 0.28);
    .view-title {
      font-weight: 500;
      font-size: 26px;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: #1F2041;
      margin-bottom: 8px;
    }
    .view-info {
      font-weight: normal;
      font-size: 20px;
      line-height: 21px;
      letter-spacing: 0.02em;
      color: rgba(31, 32, 65, 0.75);
    }
  }
}
</style>
