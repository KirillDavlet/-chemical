<template>
  <div class="layout-modal">
    <span @click="openModal">{{ label }}</span>
    <transition name="modal-danone">
      <div class="report-form" ref="modalElement" v-if="flagModalTsk">
        <div class="report-form__container">
          <div class="report-form__container-close" @click="closeModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.6012 11.9999L16.9265 7.6746C17.0918 7.50873 17.0921 7.2402 16.9265 7.0746C16.7601 6.90873 16.4918 6.90873 16.326 7.0746L12.0009 11.3997L7.67557 7.0746C7.51051 6.90873 7.24117 6.90873 7.07557 7.0746C6.90971 7.2402 6.90971 7.50873 7.07557 7.6746L11.4006 11.9999L7.07584 16.3247C6.90997 16.4906 6.90997 16.7591 7.07584 16.9253C7.15877 17.0079 7.26731 17.0498 7.37584 17.0495C7.48464 17.0498 7.59317 17.0079 7.67584 16.9253L12.0009 12.6002L16.326 16.9253C16.4089 17.0079 16.5177 17.0498 16.6262 17.0498C16.7345 17.0498 16.8433 17.0079 16.9265 16.9253C17.0921 16.7591 17.0921 16.4906 16.9262 16.3247L12.6012 11.9999Z"
                fill="#1E1E1E"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0 12C0 5.38347 5.38347 0 12 0C18.6168 0 24 5.38347 24 12C24 18.6165 18.6168 24 12 24C5.38347 24 0 18.6168 0 12ZM0.848958 11.9999C0.848958 18.1484 5.85136 23.1508 11.9999 23.1508C18.1487 23.1508 23.1508 18.1484 23.1508 12.0002C23.1508 5.8511 18.1487 0.848698 11.9999 0.848698C5.85109 0.848698 0.848958 5.85083 0.848958 11.9999Z"
                    fill="#1E1E1E"/>
            </svg>
          </div>
          <div class="report-form__container-task">
            <div class="report-form__container-task__title">
              <span>Задача:</span>
            </div>
            <div class="report-form__container-task__description">
              <div class="report-form__container-task__description-desc"
                   v-if="dataReportForm.task && dataReportForm.task.description">
                <span>{{ dataReportForm.task.description }}</span>
              </div>
              <div class="report-form__container-task__description-status"
                   v-if="dataReportForm.task && dataReportForm.task.status">
                <span><i>статус:</i>{{ dataReportForm.task.status }}</span>
                <span><i>Дата постановки:</i> {{ dataReportForm.task.dateStaging || '' }}</span>
                <span><i>Дата выполнения:</i> {{ dataReportForm.task.dateFulfillment || '' }}</span>
                <span><i>Дата завершения:</i> {{ dataReportForm.task.dateCompletion || '' }}</span>
                <span><i>Оценочная форма:</i> {{ dataReportForm.task.valuationForm || ''}}</span>
              </div>
            </div>
            <div class="report-form__container-task__author">
              <span><i>Авторы задачи:</i>{{ dataReportForm.task.author || '' }}</span>
              <span><i>исполнитель задачи:</i>{{ dataReportForm.task.executorTask || ''}}</span>
              <span><i>подразделение 1 уровня исполнителя:</i>{{ dataReportForm.task.levelOneUnit || '' }}</span>
              <span><i>Подразделение испольнителя:</i>{{ dataReportForm.task.executiveDivision || ''}}</span>
            </div>
          </div>
          <div class="report-form__container-comment">
            <div class="report-form__container-comment__title">
              <span>Комментарии:</span>
            </div>
            <div class="report-form__container-comment__body">
              <div>
                <comment from="автор" :data-comment="dataReportForm.comment.author || []"/>
              </div>
              <div>
                <comment from="исполнитель" :data-comment="dataReportForm.comment.executor || []"/>
              </div>
            </div>
          </div>
          <div class="report-form__container-snapshots">
            <div class="report-form__container-snapshots__title">
              <span>Снимки</span>
            </div>
            <div class="report-form__container-snapshots__body">
              <div class="report-form__container-snapshots__body-author">
                <div class="report-form__container-snapshots__body-author-title"><span>автор</span></div>
                <div class="report-form__container-snapshots__body-author-body all-snapshots">
                  <card-photo v-for="(card, i) in dataReportForm.snapshots.author" type-card="author" :key="i"
                              :data-card="card" @openPhoto="openPhotoParent"/>
                </div>
              </div>
              <div class="report-form__container-snapshots__body-executor">
                <div class="report-form__container-snapshots__body-executor-title"><span>исполнитель</span></div>
                <div class="report-form__container-snapshots__body-executor-body all-snapshots">
                  <card-photo v-for="(card, i) in dataReportForm.snapshots.executor" type-card="executor" :key="i"
                              :data-card="card" @openPhoto="openPhotoParent"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal-slider v-if="flagModalSlider" :data-slider="dataSlider" @closeModalSlider="closeModalSliderParent"/>
    </transition>
  </div>
</template>

<script>

    import Axios from 'axios'
    import CardPhoto from "./cardPhoto/cardPhoto";
    import Comment from "./comment/comment";
    import ModalSlider from "./modalSlider/modalSlider";

    export default {
        name: "rabota-modal-danone",
        components: {ModalSlider, Comment, CardPhoto},
        props: {
            link: {
                type: String,
                default: 'http://danone/fc/ajax/get-task/task_id/8115'
                // default: 'http://danone/fc/ajax/get-task/task_id/5116'
            },
            label: {
                type: String,
                default: 'кнопка'
            }
        },
        data() {
            return {
                // отображение собственно модалки
                flagModalTsk: false,
                // флаг модалкит просмотра фоток
                flagModalSlider: false,
                // данные для карточки
                dataReportForm: {
                    task: {},
                    comment: {},
                    snapshots: {
                        executor: [],
                        author: []
                    }
                },
                // информация по слайдеру
                dataSlider: {
                    page: null, // сколько всего картинок
                    activePage: null, // активная картинка
                    arrayUrl: null, //массив картинок
                    from: null // в каком блоке
                }
            }
        },
        methods: {
            openModal() {
                this.flagModalTsk = true;
                let context = this;
                let promEl = new Promise(function (res, rej)  {
                    res(document.getElementsByClassName('report-form'))
                });
                promEl
                    .then(result => {
                        let el = result[0];
                        result[0].remove();
                        document.body.append(el)
                    })
                    .catch(err => alert('ошибка'))
            },
            // метод закрытия модлки информационной, отправка родителю
            closeModal() {
                this.flagModalTsk = false
                // this.$emit('modalClose')
            },
            // Обработка клика выбора фотографии
            openPhotoParent(data) {
                this.dataSlider.from = data.type;
                this.dataSlider.page = this.dataReportForm.snapshots[data.type].length - 1;
                this.dataSlider.arrayUrl = this.dataReportForm.snapshots[data.type].slice().map(el => el.url);
                this.dataReportForm.snapshots[data.type].forEach((el, i) => el.url === data.url ? this.dataSlider.activePage = i : '');
                this.flagModalTsk = false;
                this.flagModalSlider = true;
            },
            exitKey(e) {
                if (e.key === 'Escape') this.closeModal()
            },
            // функция получения данных
            async getData() {
                await Axios.get(this.link)
                    .then(res => {
                        for (let i in res.data.images) {
                            console.log(i)
                            if (res.data.images[i]['by_supervisor'] === '0') {
                                this.dataReportForm.snapshots.executor.push(res.data.images[i])
                            } else if (res.data.images[i]['by_supervisor'] === '1') {
                                this.dataReportForm.snapshots.author.push(res.data.images[i])
                            }
                        }
                        this.dataReportForm.task = {
                            description: res.data.name,
                            status: res.data.state,
                            dateStaging: res.data.date_event,
                            dateFulfillment: res.data.date,
                            dateCompletion: res.data.date_final,
                            valuationForm: res.data.competence,
                            author: res.data.superFio, // авторы задачи
                            executorTask: res.data.userFio, //исполнитель задачи
                            levelOneUnit: res.data.topDepartment, // подразделение 1гшо уровня
                            executiveDivision: res.data.department,//Подразделение испольнителя
                        };
                        this.dataReportForm.comment = {
                            author: res.data.comment_supervisor,
                            executor: res.data.comment_user
                        }
                    })
                    .catch(err => console.log(err))
            },
            // обработка фоток
            closeModalSliderParent() {
                this.flagModalTsk = true;
                this.flagModalSlider = false;
            },
        },
        mounted() {
            document.addEventListener('keydown', this.exitKey, false);
            this.getData()
        },
        destroyed() {
            document.removeEventListener('keydown', this.exitKey, false);
        }
    }
</script>

<style lang="less">
  .report-form {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999999999999999;

    &__container {
      width: 80%;
      height: 90%;
      background: #FFFFFF;
      border-radius: 2px;
      position: relative;
      padding: 34px 34px 26px 34px;
      box-sizing: border-box;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #979797;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);

        &:hover {
          background-color: #8f8597;
        }
      }

      &-close {
        position: absolute;
        right: 32px;
        top: 36px;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      &-task {
        width: 100%;

        &__title {
          width: 100%;
          height: 45px;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          border-bottom: 1px solid #E1DDDD;

          > span {
            font-family: Ubuntu;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 28px;
            letter-spacing: 0.3px;
            color: #000000;
          }
        }

        &__description {
          width: 100%;
          height: 208px;
          display: flex;
          flex-wrap: nowrap;
          margin-top: 19px;

          > div {
            width: 50%;
          }

          &-desc {
            height: 100%;
            display: flex;
            padding: 16px 21px 16px 16px;
            background: #FAFAFA;
            border: 1px solid #E0E0E0;
            box-sizing: border-box;
            border-radius: 2px;
            overflow: auto;

            &::-webkit-scrollbar {
              width: 6px;
            }

            &::-webkit-scrollbar-track {
              -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
              border-radius: 10px;
            }

            &::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background-color: #979797;
              -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);

              &:hover {
                background-color: #8f8597;
              }
            }

            > span {
              font-family: Ubuntu;
              font-style: normal;
              font-weight: normal;
              font-size: 14px;
              line-height: 16px;
              letter-spacing: 0.3px;
              color: #000000;
            }
          }

          &-status {
            display: flex;
            flex-direction: column;
            padding-left: 115px;
            box-sizing: border-box;

            > span {
              font-family: Ubuntu;
              font-style: normal;
              font-weight: normal;
              font-size: 14px;
              line-height: 16px;
              letter-spacing: 0.3px;
              color: #000000;

              > i {
                text-decoration-line: underline;
                text-transform: none;
                font-style: normal;
              }

              &:not(:last-child) {
                margin-bottom: 32px;
              }
            }
          }
        }

        &__author {
          width: 50%;
          min-height: 200px;
          margin-top: 29px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          > span {
            font-family: Ubuntu;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: 0.3px;
            color: #000000;

            > i {
              text-decoration-line: underline;
              text-transform: none;
              font-style: normal;
            }

            &:not(:last-child) {
              margin-bottom: 32px;
            }
          }
        }
      }

      &-comment {
        width: 100%;

        &__title {
          width: 100%;
          height: 45px;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          border-bottom: 1px solid #E1DDDD;

          > span {
            font-family: Ubuntu;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 28px;
            letter-spacing: 0.3px;
            color: #000000;
          }
        }

        &__body {
          width: 100%;
          display: flex;
          flex-wrap: nowrap;

          > div:nth-child(1) {
            width: 698px;
            margin-right: 112px;
          }

          > div:nth-child(2) {
            width: 398px;
          }
        }
      }

      &-snapshots {
        width: 100%;
        margin-top: 39px;

        &__title {
          width: 100%;
          height: 45px;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          border-bottom: 1px solid #E1DDDD;

          > span {
            font-family: Ubuntu;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 28px;
            letter-spacing: 0.3px;
            color: #000000;
          }
        }

        &__body {
          display: flex;
          margin-top: 16px;

          &-author {
            width: 698px;
            margin-right: 112px;

            &-body {
              > div:nth-child(2n + 1) {
                margin-right: 64px;
              }
            }
          }

          &-executor {
            width: 398px;

            &-body {

            }
          }

          &-author, &-executor {
            &-title {
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

            &-body {
              display: flex;
              flex-wrap: wrap;
              margin-top: 16px;

              > div {
                margin-bottom: 42px;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 1604px) {
    .report-form {
      &__container {
        &-comment {
          &__body {
            > div:nth-child(1) {
              width: 580px;
            }
          }
        }

        &-snapshots {
          &__body {
            &-author {
              margin-right: 6px;

              &-body {
                > div:nth-child(2n + 1) {
                  margin-right: 12px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 1367px) {
    .report-form {
      &__container {
        padding: 34px 16px;

        &-task {
          &__description {
            justify-content: space-between;

            > div {
              width: calc(50% - 27px);
            }

            &-status {
              padding-left: 0;
            }
          }

          &__author {
            height: auto;
            min-height: auto;
            margin-top: 20px;
            margin-bottom: 28px;

            > span:not(:last-child) {
              margin-bottom: 16px;
            }
          }
        }

        &-comment {
          &__body {
            justify-content: space-between;

            > div {
              width: calc(50% - 15.5px) !important;
            }

            > div:nth-child(1) {
              margin-right: 0 !important;
            }
          }
        }

        &-snapshots {
          &__body {
            > div {
              width: 50%;

              .all-snapshots {
                > div {
                  width: 328px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 916px) {
    .report-form {
      &__container {
        width: 100%;
        height: 100%;
        &-task {
          &__description {
            height: auto;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &-desc {
              height: auto;
              width: 100% !important;
              padding: 12px !important;
              margin-bottom: 24px;
            }

            &-status {
              width: 100% !important;

              > span:not(:last-child) {
                margin-bottom: 16px;
              }
            }

            &-author {
              width: 100% !important;
            }
          }
        }

        &-comment {
          &__body {
            justify-content: center;
            align-items: center;
            flex-direction: column;

            > div {
              width: 100% !important;
            }
          }
        }

        &-snapshots {
          &__body {
            justify-content: center;
            align-items: center;
            flex-direction: column;

            > div {
              width: 100%;

              .all-snapshots {
                justify-content: center;

                > div {
                  min-width: 328px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 500px) {
    .report-form {
      &__container {
        &-comment {
          &__body {

          }
        }

        &-snapshots {
          &__body {
            > div {
              > .all-snapshots {
                > div {
                  width: 100%;
                  min-width: 100%;
                  margin-right: 0 !important;
                }
              }
            }
          }
        }
      }
    }
  }


  .modal-danone-enter-active {
    transition: all .1s ease;
  }

  .modal-danone-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .modal-danone-enter, .modal-danone-leave-to {
    transform: scale(0.7);
    opacity: 0;
  }
</style>
