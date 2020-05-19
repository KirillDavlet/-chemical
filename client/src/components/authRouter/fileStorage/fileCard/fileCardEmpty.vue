<template>
    <div id="fileCardEmpty">
      <span>Папка пустая</span>
    </div>
</template>

<script>
    export default {
        name: "fileCardEmpty"
    }
</script>

<style lang="less">
#fileCardEmpty {
  width: 100%;
  margin-top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    font-style: normal;
    font-weight: 300;
    font-size: 34px;
    line-height: 32px;
    letter-spacing: 0.02em;
    color: #1E1E1E;
  }
}
</style>
