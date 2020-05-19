<template>
  <div class="create-answer">
    <div class="create-answer__body">
      <div class="create-answer__body-all">
        <div class="create-answer__body-all__item" v-for="(answer, i ,arr) in get_answer">
          <div><span>{{ answer.description }}</span></div>
          <div><span @click="deleteAnswer(answer.id)"><icon__delete /></span></div>
        </div>
      </div>
      <div class="create-answer__body-new">
        <div class="create-answer__body-new__action">
          <span @click="newAnswer">создать новый вариант ответа</span>
        </div>
        <div class="create-answer__body-new__form" v-if="newAnswerFlag">
          <span>введите описание варианта ответа</span>
          <input type="text" v-model="dataAnswerNew">
          <div>
            <span @click="saveNewAnswwer">сохранить</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Icon__delete from "../../../icon/iconDelete";
    export default {
        name: "createAnswer",
      components: {Icon__delete},
      data() {
            return {
                newAnswerFlag: false,
                dataAnswerNew: ''
            }
        },
        computed: {
            get_answer() {
                return this.$store.getters.get_answers
            }
        },
        methods: {
            /**
             * метод вызова действия из хранилища ( по удалению варианта ответа )
             * @param id
             */
            deleteAnswer(id) {
                let deleteAnswer = confirm('вы уврены что хоитте удалить ответ');
                if (deleteAnswer) {
                    this.$store.dispatch('DELETe_answer', {id: id})
                }
            },
            /**
             * метод отображения нового варианта ответа
             */
            newAnswer() {
                this.newAnswerFlag = !this.newAnswerFlag
            },
            /**
             * метод по сохранению нового варианта ответа
             */
            saveNewAnswwer() {
                if (this.dataAnswerNew !== '') {
                    this.$store.dispatch('ADD_answer', {description: this.dataAnswerNew})
                    this.newAnswer()
                }
            }
        }

    }
</script>

<style lang="less">
  .create-answer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &__header {
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
      flex-direction: column;

      &-all {
        width: 100%;
        height: 100%;
        margin-bottom: 15px;
        &__item {
          display: flex;
          min-height: 35px;
          > div:first-child {
            width: 50%;
            max-width: 350px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          > div:last-child {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            cursor: pointer;
          }
        }
      }

      &-new {
        width: 100%;
        height: 100%;
        &__action {
          padding: 0 7px;
          max-width: 350px;
          height: 32px;
          border: 1px solid gray;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        &__form {
          width: 100%;
          margin-top: 12px;
          > input {
            height: 32px;
            padding: 0 6px;
            color: #1e1e1e;
            border-bottom: 1px solid #808080;
            &:active, &:focus, &:hover {
              border-bottom: 1px solid #808080;
              outline: none;
            }
          }
          > div {
            width: 200px;
            height: 32px;
            border: 1px solid gray;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-top: 7px;
          }
        }
      }
    }
  }
</style>
