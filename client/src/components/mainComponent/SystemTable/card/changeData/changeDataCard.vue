<template>
    <div id="changeDataCard">
        <div
          class="change-data-info"
          v-for="(item , i) in dataCardChange" :key="i"
          v-if="i.indexOf('id') === -1">
<!--          :TODO дописать и продумать как лучше переключаемые свойства отображать -->
          <span class="change-title ">{{ i }}</span>  <!-- ПРОВЕРЯЕМ НА НАЛИЧИЕ В СТРОК id , что бы не отображать -->
          <input :data-input="i" class="change-info" type="text" :value="item">
        </div>
      <div class="change-data-footer">
        <div @click="saveDataModal"><span>Сохранить</span></div>
        <div @click="closeModal"><span>Закрыть</span></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "changeDataCard",
        props:{dataCard:Object},
        data() {
            return {
                dataCardChange:{}
            }
        },
        methods: {
            //Метод закрытия модального окна
            closeModal() {
                this.$emit('closeModal')
            },
            saveDataModal() {
              console.log(this)
            }
        },
        mounted() {
            this.dataCardChange = this.dataCard
        }
    }
</script>

<style lang="less">
#changeDataCard {
  width: 100%;
  padding: 15px 18px;
  display: flex;
  flex-direction: column;
  .change-data-info {
    display: flex;
    min-height: 50px;
    margin-bottom: 7px;
    flex-direction: column;
    .change-title {
      font-weight: 500;
      font-size: 26px;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: #1F2041;
      padding-bottom: 5px;
    }
    .change-info {
      font-weight: normal;
      font-size: 20px;
      line-height: 21px;
      letter-spacing: 0.02em;
      color: rgba(31, 32, 65, 0.75);
      padding: 8px;
      border: 1px solid #a8acb0;
      border-radius: 4px;
    }
  }
  .change-data-footer {
    width: 100%;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
      margin: 0 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FF9800;
      border-radius: 4px;
      padding: 7px 15px;
      cursor: pointer;
      > span {
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.02em;
        color: #FFFFFF;
      }
    }
  }
}
</style>
