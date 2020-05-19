<template>
  <div id="selectionButton">
    <span>
      <input
      ref="ellll"
      v-bind:value="label"
      :type="typeSelectionButton"
      :name="name"
      v-on="listListentes"
      v-model="checked"
      >
      {{ label }}
    </span>
  </div>
</template>

<script>
    export default {
        /**
         * КОМПОНЕНТ ВЫБОРА ОТВЕТА ПРИ ТЕСТИРОВАНИИ
         * @param props
         * typeSelectionButton    - default(radio) Варианты (radio, checkbox)
         * name                   - имя группы вопросов default ('')
         * label                  - название варианта
         * idQuestion             - идентификатор вопроса
         * idAnswer               - идентификатор ответа
         *
         * вызов компонента:
         *    *<layout v-for="(item, i) in variableDAta">
         *        <h6>{{ item.title }}</h6>
         *        <layout v-for="variab in item.variable" style="height: 20px">
         *            <selection-button
         *            :type-selection-button="item.type"
         *            :name="item.title"
         *            :idQuestion="item.id"
         *            :label="variab.answer"
         *            :id-answer="variab.id"
         *            @input="gettingAnswers"
         *            />
         *        </layout>
         *    </layout>
         *
         * ПРИМЕР ДАННЫХ
         *
         * variableDAta: [
         *                   {//НУжно будет цчитывать, когда тип вопроса checkbox то answerReceived SET что бы не повторялись значения
         *                        id: 1,
         *                        title: 'Вопрос 1',
         *                        type: 'checkbox',
         *                        answerReceived: new Set(),
         *                        variable: [
         *                            {id: 1, answer: 'вариант 1'},
         *                            {id: 2, answer: 'вариант 2'},
         *                            {id: 3, answer: 'вариант 3'},
         *                        ]
         *                    },
         *                ]
         *
         *  ловим изменения данных
         *
         *  gettingAnswers(data) {
         *                 this.variableDAta.forEach(el => {
         *                     if (el.id === data.idQuestion) {
         *                         if (el.type === 'radio') {
         *                             el.answerReceived = data.idAnswer
         *                         } else if (el.type === 'checkbox') {data.checked ? el.answerReceived.add(data.idAnswer) : el.answerReceived.delete(data.idAnswer)}
         *                         console.log(el.answerReceived)
         *                     }
         *                 })
         *   }
         *
         */
        name: "selection-button",
        props: {
            typeSelectionButton: {
                type: String,
                default: 'radio'
            },
            name: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            idQuestion: {
                type: Number,
                default: null
            },
            idAnswer: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                answer: '',
                idQuest: null,
                idAnswerThis: null,
                checked: false //нужен в частности для checkbox есть галочка или нет
            }
        },
        computed: {
            /**
             * метод связи с родителем при выборе варианта
             * @returns {{} & Record<string, Function | Function[]> & {input: input}}
             *
             * на выходе:
             * answer - вариант ответа
             * idQuestion - идентификатор вопроса
             */
            listListentes: function () {
                let vm = this; //запомнил ткущий объект
                return Object.assign({}, this.$listeners, {
                    input: function (event) {
                        vm.$emit('input', {
                            idAnswer: vm.idAnswer, //идентификатор ответа
                            idQuestion: vm.idQuest, //идентификатор вопроса
                            checked: !vm.checked //активный ли флаг, необходимо для checkbox не успевает обновиться до пробрасывания к родителю , поэтому поставил противоположное значение
                        })
                    }
                });
            }
        },
        methods: {
            /**
             * метод инициализации варианта ответа
             */
          initComponent() {
              //записываю id вопроса в data
              this.idQuest = this.idQuestion;
              //записываю id ответа в data
              this.idAnswerThis = this.idAnswer
          }
        },
        mounted() {
            this.initComponent();

        }
    }
</script>

<style lang="less">

</style>
