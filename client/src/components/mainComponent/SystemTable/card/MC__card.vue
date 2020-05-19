<template>
    <transition name="fade">
      <div id="MC__card">
        <div class="modal-card">
          <div
            @click="closeModalCard"
            class="modal-card__close">
            <span>X</span>
          </div>
          <img
            v-if="dataCard.img"
            :src="dataCard.img" alt="">
          <view-data-card
            v-if="typeAction === 'view'"
            :data-card="dataCard"
          />
          <change-data-card
            v-if="typeAction === 'change'"
            :data-card="dataCard"
            @closeModal="closeModalCard"
          />
        </div>
      </div>
    </transition>
</template>

<script>
    import ViewDataCard from "./viewData/viewDataCard";
    import ChangeDataCard from "./changeData/changeDataCard";
    /**
     * КОМПОНЕНТ КАРТОЧКИ
     * ПРОСМОТР и Изменение Данных в зависимости от типа
     *
     * @param props:
     *              - typeAction                          - тип события ( изменение или просмотр )
     *              - dataCard                            - данные для отображения
     *              - typeCard                            - тип карточки ( неапример таблица support? тип будет support )
     *
     */
    export default {
        name: "MC__card",
        components: {ChangeDataCard, ViewDataCard},
        props: {
            typeAction: String,
            dataCard: {type:Object, default:()=> {}},
            typeCard: {type:Object,default:()=> {}}
        },
        methods: {
            closeModalCard() {
                this.$emit('closeModalCard')
            }
        },

    }
</script>

<style lang="less">
#MC__card {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-card {
    width: 460px;
    height: auto;
    min-height: 100px;
    background: #FFFFFF;
    box-shadow: 0 9px 46px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    position: relative;
    &__close {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
    > img {
      width: 100%;
      height: 200px;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
