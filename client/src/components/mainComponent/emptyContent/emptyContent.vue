<template>
  <div class="empty-content">
    <icon_empty-slider />
<!--    :TODO вставить сюда разные иконки и все такое-->
    <span>{{ label }}</span>
  </div>
</template>

<script>
    import Icon_emptySlider from "../../icon/iconEmpty/icon_emptySlider";

    export default {
        /**
         * Комопнент отоюражаения пустого рессурса
         */
        name: "emptyContent",
        components: {Icon_emptySlider},
        props: {
            // тип необходимой иконки
            typeResource: {
                type: String,
                default: 'default'
            },
            label: {
                type: String,
                default: 'По вашему запросу нет информации'
            }
        }
    }
</script>

<style lang="less">
  .empty-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > div {
      margin-bottom: 1em;
    }

    > span {
      text-align: center;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: #1E1E1E;
    }
  }
</style>
