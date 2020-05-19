<template>
    <div class="comment">
      <div class="comment-label">
        <span>{{ from }}</span>
      </div>
      <div class="comment-table">
        <div class="comment-table-header">
          <div class="comment-table-header-date">Дата</div>
          <div class="comment-table-header-text">Текст</div>
        </div>
        <div class="comment-table-body">
          <div class="comment-table-body-row" v-for="(el, i) in dataComment">
            <div class="comment-table-body-row__date"><span>{{ el.date }}</span></div>
            <div class="comment-table-body-row__text"><span>{{ el.text }}</span></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props: {
            // чье
            from: {
                type: String,
                default: 'Автор'
            },
            // данные для отображения
            dataComment: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="less">
.comment {
  width: 100%;
  display: flex;flex-direction: column;
  &-label {
    width: 100%;
    margin: 16px 0;
    > span {
      font-family: Ubuntu;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;
      letter-spacing: 0.3px;
      color: #000000;
      text-transform: capitalize;
    }
  }
  &-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    &-header {
      width: 100%;
      height: 40px;
      display: flex;
      background: #EAEAEA;
      border: 1px solid #BFBFBF;
      box-sizing: border-box;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          font-family: Ubuntu;
          font-style: italic;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          letter-spacing: 0.3px;
          color: #000000;
        }
      }
      &-date {
        width: 120px;
        border-right: 1px solid #BFBFBF;
        box-sizing: border-box;
      }
      &-text {
        width: calc(100% - 120px);
      }
    }
    &-body {
      width: 100%;
      display: flex;
      flex-direction: column;
      &-row {
        width: 100%;
        min-height: 40px;
        display: flex;
        border: 1px solid #BFBFBF;
        border-top: none;
        box-sizing: border-box;
        > div {
          display: flex;
          align-items: center;
          padding: 21px 16px;
          box-sizing: border-box;
        }
        &__date {
          width: 120px;
          border-right: 1px solid #BFBFBF;
          box-sizing: border-box;
          justify-content: center;
        }
        &__text {
          justify-content: flex-start;
          width: calc(100% - 120px);
        }
      }
    }
  }
}
</style>
