<template>
  <div id="selectionTest" :class="themeCard">
    <div class="card-img" v-if="infoCard.img" :style="{backgroundImage: `url(${infoCard.img})`}">
    </div>
    <div class="info">
      <div class="info__card-title">
        <span v-if="infoCard.title">{{ infoCard.title.length > 30 ? infoCard.title.slice(0, 30)+'...' : infoCard.title }}</span>
        <span v-else>название теста</span>
      </div>
      <div class="info__card-info">
        <span
          v-if="infoCard.info">{{ infoCard.info.length > 100 ? infoCard.info.slice(0, 100)+'...' : infoCard.info  }}</span>
        <span v-else>информация по тесту</span>
      </div>
      <div class="info__card-category">
        <span> {{ infoCard.category }} </span>
      </div>
      <div class="info__card-start">
        <cm__button-standard
          :statusLoading="flagLoaderButton"
          @eventClick="test"
        />
      </div>
    </div>
    <div class="status" v-if="infoCard.status">
      <span>NEW</span>
    </div>
  </div>
</template>

<script>
    import Cm__buttonStandard from "../../button/cm__button-standard";

    /**
     * КОМПОНЕНТ КАРТОЧКА ТЕСТА
     * ПРЕДСТАВЛЯЕТ ИЗ СЕБЯ КАРТУ ВЫБОРА ТЕСТА
     *
     * @param data
     * themeCard        - будущ тема карточки
     * infoCard         - информация по карте
     * flagLoaderButton - состояние кнопки дочерней
     *
     *
     * @param props
     *    dataCard: {
     *               type: Object,
     *               default: {
     *                   id:'Идентификатор теста',
     *                   title: 'Название теста',
     *                   info: "Информация по тесту",
     *                   category: 'Категория теста',
     *                   link:'Ссылка на сам тест',
     *                   status: является ли тест новым
     *                   img: ссылка на картинку, если есть
     *               }
     *           }
     *
     *    theme: { Определяет тему
     *               type: String,
     *               default: "standard"
     *            }
     *
     *
     *   ВЫЗОВ КОМПОНЕНТА
     *   <cm__selection-test-card />
     *
     *
     */
    export default {
        name: "cm__selection-test-card",
        components: {Cm__buttonStandard},
        props: {
            dataCard: {
                type: Object,
                default: () => {
                    return {
                        id: '1',
                        title: 'знание таблицы менделеева',
                        info: "данный тест позволит вам определить знания элемнтов переиодической системы Менделеева",
                        category: 'Неорганика',
                        link: 'http://localhost:8081/test:id',
                        status: true,
                        img: '../../../static/image/fonNews.png'
                    }
                }
            },
            theme: {
                type: String,
                default: "standard"
            }
        },
        data() {
            return {
                themeCard: '',
                infoCard: {},
                flagLoaderButton: false  //:TODO состояние кнопки дочерней по полю загрузка
            }
        },
        methods: {
            /**
             * инициализация инфы по карте
             */
            initCard() {
                for (let item in this.dataCard) {
                    this.infoCard[item] = this.dataCard[item]
                }
            },
            test() {
                this.flagLoaderButton = true;
                setTimeout(() => {
                    this.flagLoaderButton = false
                }, 1000)
            }
        },
        mounted() {
            this.initCard();
            this.themeCard = this.theme

        }
    }
</script>

<style lang="less">
  #selectionTest {
    width: 100%;
    height: 100%;
    max-height: 450px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
    border-radius: 3.72268px;
    position: relative;
    box-sizing: border-box;

    .card-img {
      width: 100%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url("../../../../static/image/fonNews.png");
      height: 150px;
      position: relative;
      &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(11, 26, 247, 0.1);
      }
      &:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 0, 0, 0.1);
      }
    }

    .info {
      width: calc(100% - 36px);
      height: calc(100% - 150px);
      padding: 0 18px;
      display: flex;
      flex-direction: column;

      &__card-title {
        margin-top: 15px;

        > span {
          font-weight: 500;
          font-size: 22px;
          line-height: 22px;
          letter-spacing: 0.02em;
          color: #1F2041;
        }
      }

      &__card-info {
        margin-top: 20px;
        height: 35%;

        > span {
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 0.02em;
          color: #1E1E1E;
          mix-blend-mode: normal;
        }
      }

      &__card-category {
        margin-top: 10px;

        > span {
          padding: 6px 12px;
          background: #E6E6E6;
          opacity: 0.4;
          border-radius: 30px;
        }
      }

      &__card-start {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 26px;
      }
    }

    .status {
      width: 100px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FFC850;
      border-radius: 0 20px 20px 0;
      position: absolute;
      left: -5px;
      top: 40px;
      z-index: 10;

      > span {
        color: #FFFFFF;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: 0.02em;
      }
    }
  }

  .standard {
    background: #FFFFFF;
  }
</style>
