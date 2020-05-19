<template>
    <div id="storageSettings">
        <div class="address-line">
          <span>{{ addressLine }}</span>
        </div>
    </div>
</template>

<script>
    /**
     * КОМПОНЕНТ НАСТРОЙЕК ПО ХРАНИЛИЩУ
     * @param      props:
     *                    addressLine  - адресная строка
     *
     *
     */
    export default {
        name: "storageSettings",
        props: {
            addressLine: String
        }
    }
</script>

<style lang="less">
#storageSettings {
  width: 100%;
  height: 45px;
  padding: 7px 5px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  font-family: Roboto, sans-serif;
  box-sizing: border-box;
  .address-line {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 26px;
    box-sizing: border-box;
    > span {
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.02em;
      color: #1E1E1E;
    }
  }
}
</style>
