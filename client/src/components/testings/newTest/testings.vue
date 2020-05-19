<template>
  <div class="testings">
    <div class="testings_header">
      <div class="testings_header-classifiers" :style="testFlag.classifiers ? activeTestFlagStyle : ''">
        <span @click="activeNewTest('classifiers')">классификаторы</span>
      </div>
      <div class="testings_header-answer" :style="testFlag.createAnswer ? activeTestFlagStyle : ''">
        <span @click="activeNewTest('createAnswer')">Создать вариант ответа</span>
      </div>
      <div class="testings_header-question" :style="testFlag.createQuestion ? activeTestFlagStyle : ''">
        <span @click="activeNewTest('createQuestion')">Создать вопрос</span>
      </div>
      <div class="testings_header-new" :style="testFlag.newTest ? activeTestFlagStyle : ''">
        <span @click="activeNewTest('newTest')">Создать тест</span>
      </div>
    </div>
    <div class="testings_body">
      <new-test v-if="testFlag.newTest"/>
      <create-question
        v-if="testFlag.createQuestion"
        @nextStep="activeNewTest('newTest')"/>
      <create-answer v-if="testFlag.createAnswer"/>
      <classifiers v-if="testFlag.classifiers" />
    </div>
  </div>
</template>

<script>
    import NewTest from "./newTest/newTest";
    import CreateQuestion from "./createQuestion/createQuestion";
    import CreateAnswer from "./createAnswer/createAnswer";
    import Classifiers from "./classifiers/classifiers";

    export default {
        name: "testings",
        components: {Classifiers, CreateAnswer, CreateQuestion, NewTest},
        data() {
            return {
                testFlag: {
                    newTest: false,
                    createQuestion: false,
                    createAnswer: false,
                    classifiers: true
                }
            }
        },
        computed: {
            activeTestFlagStyle() {
                return {borderBottom: '1px solid blue'}
            }
        },
        methods: {
            /**
             * метод по выбору активной вкладки
             * @param name
             */
            activeNewTest(name) {
                this.testFlag[name] = true;
                for (let test in this.testFlag) {
                    if (test !== name) this.testFlag[test] = false
                }
            },
            nextStepParent(title) {
                console.log(title)
            }
        },
        mounted() {
            this.$store.dispatch('INIT_questionSettings', {url: 'http://localhost:8081/answers/all'})
        }
    }
</script>

<style lang="less">
  .testings {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &_header {
      width: 100%;
      height: 10%;
      margin-bottom: 10px;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;

      > div {
        padding: 5px 12px;
        cursor: pointer;

        > span {
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 0.02em;
          color: #1E1E1E;
        }

        &:not(:last-child) {
          margin-right: 7px;
        }
      }
    }

    &_body {
      width: 100%;
      height: 90%;
      background: #FFFFFF;
      box-shadow: 0 10px 30px rgba(209, 213, 223, 0.5);
      border-radius: 4px;
      padding: 5px 15px;
    }
  }
</style>
