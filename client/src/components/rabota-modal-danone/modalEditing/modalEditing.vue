<template>
  <div class="layout-modal">
    <span @click="flagModal = true">{{ label }}</span>
    <transition name="modal-settings">
      <div class="modal-settings" v-if="flagModal">
        <div class="modal-settings-body">
          <div class="modal-settings-body__closed" @click="modalSettingsClose">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.6012 11.9999L16.9265 7.6746C17.0918 7.50873 17.0921 7.2402 16.9265 7.0746C16.7601 6.90873 16.4918 6.90873 16.326 7.0746L12.0009 11.3997L7.67557 7.0746C7.51051 6.90873 7.24117 6.90873 7.07557 7.0746C6.90971 7.2402 6.90971 7.50873 7.07557 7.6746L11.4006 11.9999L7.07584 16.3247C6.90997 16.4906 6.90997 16.7591 7.07584 16.9253C7.15877 17.0079 7.26731 17.0498 7.37584 17.0495C7.48464 17.0498 7.59317 17.0079 7.67584 16.9253L12.0009 12.6002L16.326 16.9253C16.4089 17.0079 16.5177 17.0498 16.6262 17.0498C16.7345 17.0498 16.8433 17.0079 16.9265 16.9253C17.0921 16.7591 17.0921 16.4906 16.9262 16.3247L12.6012 11.9999Z"
                fill="#1E1E1E"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0 12C0 5.38347 5.38347 0 12 0C18.6168 0 24 5.38347 24 12C24 18.6165 18.6168 24 12 24C5.38347 24 0 18.6168 0 12ZM0.848958 11.9999C0.848958 18.1484 5.85136 23.1508 11.9999 23.1508C18.1487 23.1508 23.1508 18.1484 23.1508 12.0002C23.1508 5.8511 18.1487 0.848698 11.9999 0.848698C5.85109 0.848698 0.848958 5.85083 0.848958 11.9999Z"
                    fill="#1E1E1E"/>
            </svg>
          </div>
          <div class="modal-settings-body__title">
            <span>Задача: </span>
          </div>
          <div class="modal-settings-body__date">
            <div class="modal-settings-body__date-title">
              <span>Дата</span>
            </div>
            <div class="modal-settings-body__date-form">
              <input type="date" v-model="date">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.84907 6.92774H4.432C4.74454 6.92774 4.99805 6.67422 4.99805 6.36169V5.77876C4.99805 5.46622 4.74454 5.21289 4.432 5.21289H3.84907C3.53654 5.21289 3.2832 5.46622 3.2832 5.77876V6.36169C3.28338 6.67422 3.53654 6.92774 3.84907 6.92774Z"
                  fill="#125BB5"/>
                <path
                  d="M7.70844 6.92774H8.29173C8.60427 6.92774 8.8576 6.67422 8.8576 6.36169V5.77876C8.8576 5.46622 8.60427 5.21289 8.29173 5.21289H7.70844C7.39591 5.21289 7.14258 5.46622 7.14258 5.77876V6.36169C7.14276 6.67422 7.39609 6.92774 7.70844 6.92774Z"
                  fill="#125BB5"/>
                <path
                  d="M11.566 6.92774H12.149C12.4615 6.92774 12.7148 6.67422 12.7148 6.36169V5.77876C12.7148 5.46622 12.4615 5.21289 12.149 5.21289H11.566C11.2535 5.21289 11 5.46622 11 5.77876V6.36169C11.0002 6.67422 11.2537 6.92774 11.566 6.92774Z"
                  fill="#125BB5"/>
                <path
                  d="M3.84907 9.84295H4.432C4.74454 9.84295 4.99805 9.58944 4.99805 9.27691V8.6938C4.99805 8.38126 4.74454 8.12793 4.432 8.12793H3.84907C3.53654 8.12793 3.2832 8.38126 3.2832 8.6938V9.27691C3.28338 9.58944 3.53654 9.84295 3.84907 9.84295Z"
                  fill="#125BB5"/>
                <path
                  d="M7.70844 9.84295H8.29173C8.60427 9.84295 8.8576 9.58944 8.8576 9.27691V8.6938C8.8576 8.38126 8.60427 8.12793 8.29173 8.12793H7.70844C7.39591 8.12793 7.14258 8.38126 7.14258 8.6938V9.27691C7.14276 9.58944 7.39609 9.84295 7.70844 9.84295Z"
                  fill="#125BB5"/>
                <path
                  d="M11.566 9.84295H12.149C12.4615 9.84295 12.7148 9.58944 12.7148 9.27691V8.6938C12.7148 8.38126 12.4615 8.12793 12.149 8.12793H11.566C11.2535 8.12793 11 8.38126 11 8.6938V9.27691C11.0002 9.58944 11.2537 9.84295 11.566 9.84295Z"
                  fill="#125BB5"/>
                <path
                  d="M3.84907 12.759H4.432C4.74454 12.759 4.99805 12.5055 4.99805 12.1929V11.6096C4.99805 11.2971 4.74454 11.0439 4.432 11.0439H3.84907C3.53654 11.0439 3.2832 11.2971 3.2832 11.6096V12.1929C3.28338 12.5055 3.53654 12.759 3.84907 12.759Z"
                  fill="#125BB5"/>
                <path
                  d="M7.70844 12.759H8.29173C8.60427 12.759 8.8576 12.5055 8.8576 12.1929V11.6096C8.8576 11.2971 8.60427 11.0439 8.29173 11.0439H7.70844C7.39591 11.0439 7.14258 11.2971 7.14258 11.6096V12.1929C7.14276 12.5055 7.39609 12.759 7.70844 12.759Z"
                  fill="#125BB5"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M14.0021 0H1.99787C0.896356 0 0 0.896178 0 1.99787V12.9728C0 14.0745 0.896356 14.9707 1.99787 14.9707H14.002C15.1036 14.9707 16 14.0745 16 12.9728V1.99787C16 0.896178 15.1036 0 14.0021 0ZM15.4339 12.9727C15.4339 13.7622 14.7918 14.4047 14.0019 14.4047H1.9978C1.20829 14.4047 0.565799 13.7624 0.565799 12.9727V3.56649H15.4339V12.9727ZM0.565972 3.00065H15.4339H15.4341V1.99763C15.4341 1.20776 14.7918 0.565451 14.0021 0.565451H1.99797C1.20828 0.565451 0.565972 1.20794 0.565972 1.99763V3.00065Z"
                      fill="#125BB5"/>
              </svg>
            </div>
          </div>
          <div class="modal-settings-body__comment">
            <div class="modal-settings-body__comment-title">
              <span>Комментарий</span>
            </div>
            <div class="modal-settings-body__comment-form">
              <textarea v-model="textarea"></textarea>
            </div>
          </div>
          <div class="modal-settings-body__img">
            <div class="modal-settings-body__img-title">
              <span>Изображения</span>
            </div>
            <div class="modal-settings-body__img-container" v-if="files && files.length > 0">
              <div class="modal-settings-body__img-container-img" v-for="(el, i) in files">
                <img :id="`img-${i}`" alt="предпросмотр">
                <div class="modal-settings-body__img-container-img__settings">
                  <div class="modal-settings-body__img-container-img__settings-name">
                    <span>{{ el.name }}</span>
                  </div>
                  <div class="modal-settings-body__img-container-img__settings-delete" @click="deleteImg(i)">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle opacity="0.6" cx="8" cy="8" r="8" fill="#51565F"/>
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.6 5.2C11.8209 4.97909 11.8209 4.62091 11.6 4.4V4.4C11.3791 4.17909 11.0209 4.17909 10.8 4.4L8 7.2L5.2 4.4C4.97909 4.17909 4.62091 4.17909 4.4 4.4V4.4C4.17909 4.62091 4.17909 4.97909 4.4 5.2L7.2 8L4.4 10.8C4.17909 11.0209 4.17909 11.3791 4.4 11.6V11.6C4.62091 11.8209 4.97909 11.8209 5.2 11.6L8 8.8L10.8 11.6C11.0209 11.8209 11.3791 11.8209 11.6 11.6V11.6C11.8209 11.3791 11.8209 11.0209 11.6 10.8L8.8 8L11.6 5.2Z"
                            fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-settings-body__img-form">
              <div class="modal-settings-body__img-form-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.717 8.64373C15.5605 8.64373 15.434 8.77031 15.434 8.92675V13.7884C15.434 14.5776 14.7918 15.2203 14.002 15.2203H1.99787C1.20836 15.2203 0.565867 14.5778 0.565867 13.7884V8.92658C0.565867 8.77013 0.439111 8.64355 0.282844 8.64355C0.126578 8.64355 0 8.77031 0 8.92658V13.7883C0 14.8898 0.896356 15.7861 1.99787 15.7861H14.002C15.1036 15.7861 16 14.8898 16 13.7883V8.92658C16 8.77031 15.8734 8.64373 15.717 8.64373Z"
                    fill="white"/>
                  <path
                    d="M3.25624 5.21413L7.71775 0.752622V11.1905C7.71775 11.3469 7.8445 11.4735 8.00077 11.4735C8.15722 11.4735 8.28379 11.3469 8.28379 11.1905V0.7528L12.7453 5.21413C12.8557 5.32471 13.0351 5.32471 13.1455 5.21413C13.2559 5.10373 13.2559 4.92453 13.1455 4.81413L8.56468 0.233333C8.25375 -0.0779555 7.74779 -0.0776 7.43704 0.233333L2.85624 4.81431C2.74584 4.92471 2.74584 5.10373 2.85624 5.21431C2.96664 5.32471 3.14584 5.32471 3.25624 5.21413Z"
                    fill="white"/>
                </svg>
                <span>Загрузить</span>
                <input type="file" @change="previewFiles" multiple>
              </div>
            </div>
          </div>
          <div class="modal-settings-body__actions">
            <div class="modal-settings-body__actions-save" @click="chekingData">
              <span>Сохранить</span>
            </div>
            <div class="modal-settings-body__actions-cancel" @click="modalSettingsClose">
              <span>Отмена</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
    import CardPhotoPreview from "./cardPhotoPreview";

    export default {
        name: "modalEditing",
        components: {CardPhotoPreview},
        props: {
            dataEditing: {
                type: Object,
                default: () => {
                    return {
                        date: '2020-02-23',
                        dataComment: 'Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.  В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03. Бизнес: во всех ДМ переставить каши согласно стандартам компании Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.  В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03. Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.  В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03. Бизнес: во всех ДМ переставить каши согласно стандартам компании оветская переставить нутрилон супер премиум на золотую полку.'
                    }
                }
            },
            label: {
                type: String,
                default: 'кнопка редактирования'
            }
        },
        data() {
            return {
                files: null,
                date: this.dataEditing.date || null,
                textarea: this.dataEditing.dataComment || null,
                error: [],
                flagModal: false
            }
        },
        watch: {
            date(data) {
                console.log(data)
            }
        },
        methods: {
            modalSettingsClose() {
                this.flagModal = false
                // this.$emit('closeModal')
            },
            exitKey(e) {
                if (e.key === 'Escape') this.modalSettingsClose()
            },
            previewFiles(event) {
                this.files = event.target.files;
                for (let i = 0; i < this.files.length; i++) {
                    this.readUrl(this.files[i], i)
                }

            },
            // метод по представлению данных в формате base64
            readUrl(input, i) {
                if (input) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        document.getElementById(`img-${i}`).setAttribute('src', e.target.result)
                    };
                    reader.readAsDataURL(input)
                }
            },
            /**
             * метод удаления выбраной фотографии
             * @param el
             */
            deleteImg(el) {
                let newFile = [];
                for (let i = 0; i < this.files.length; i++) {
                    if (el === i) console.log(this.files[i]);
                    if (el !== i) newFile.push(this.files[i])
                }
                this.files = newFile;
                for (let i = 0; i < this.files.length; i++) {
                    this.readUrl(this.files[i], i)
                }
            },
            chekingData() {
                this.error = []
                if (this.date) {
                    if (!/\d\d\-\d\d\-\d\d/.test(this.date)) {
                        this.error.push('поле дата заполнено не верно, format " YY-MM-DD " ');
                    }
                } else {
                    this.error.push('поле дата не должно быть пустым');
                }
                // вывод всех сообщений об ошибке
                if (this.error.length > 0) alert(this.error.join('\n'));
                else if (this.error.length === 0) {
                    console.log('можно отправлять изменения');
                    this.modalSettingsClose()
                }
            }
        },
        mounted() {
            document.addEventListener('keydown', this.exitKey, false);
        },
        destroyed() {
            document.removeEventListener('keydown', this.exitKey, false);
        }
    }
</script>

<style lang="less">
  .modal-settings {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999999;

    &-body {
      width: 70%;
      height: 85%;
      background: #FFFFFF;
      border-radius: 2px;
      position: relative;
      padding: 34px 36px 36px 36px;
      overflow: auto;
      box-sizing: border-box;

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

      &__closed {
        position: absolute;
        right: 36px;
        top: 36px;
        cursor: pointer;
      }

      &__title {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #E1DDDD;

        > span {
          font-weight: bold;
          font-size: 24px;
          line-height: 28px;
          letter-spacing: 0.3px;
          color: #000000;
        }
      }

      &__date {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 25px;

        &-title {
          margin-bottom: 8px;

          > span {
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: 0.3px;
            color: #000000;
          }
        }

        &-form {
          width: 100%;
          height: 22px;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          > input {
            width: 350px;
            margin-right: 6px;
            background: #FFFFFF;
            border: 1px solid #1976D3;
            box-sizing: border-box;
            border-radius: 2px;
            padding: 3px;
            outline: none;
          }
        }


      }

      &__comment {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 26px;
        margin-top: 26px;

        &-title {
          width: 100%;
          margin-bottom: 8px;

          > span {
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: 0.3px;
            color: #000000;
          }
        }

        &-form {
          width: 100%;
          height: 185px;
          max-height: 185px;
          border: 1px solid gray;
          box-sizing: border-box;

          > textarea {
            width: 100%;
            height: 100%;
            resize: none;
            background: #FFFFFF;
            border: 1px solid #D8D8D8;
            box-sizing: border-box;
            outline: none;

            &:focus, &:active {
              /*border: 1px solid #D8D8D8;*/

            }
          }

        }
      }

      &__img {
        width: 100%;
        min-height: 208px;
        display: flex;
        flex-direction: column;

        &-title {
          width: 100%;
        }

        &-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-top: 8px;

          &-img {
            width: 200px;
            min-width: 200px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            margin-right: 45px;
            margin-bottom: 17px;
            box-sizing: border-box;

            > img {
              width: 130px;
              height: 80px;
            }

            &__settings {
              width: 100%;
              height: 16px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-top: 9.6px;

              &-name {
                width: 165px;
                max-width: 165px;
                margin-right: 16px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                > span {
                  font-weight: normal;
                  font-size: 12px;
                  line-height: 14px;
                  letter-spacing: 0.3px;
                  color: #748AA1;
                }
              }

              &-delete {
                cursor: pointer;
              }
            }
          }
        }

        &-title {
          width: 100%;

          > span {
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: 0.3px;
            color: #000000;
          }
        }

        &-form {
          width: 100%;
          margin-top: 16px;
          padding-bottom: 13px;
          border-bottom: 1px solid #E1DDDD;

          &-button {
            width: 140px;
            height: 29px;
            background: #748AA1;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            position: relative;

            > input {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              cursor: pointer;
              z-index: 10000;
            }

            > span {
              font-weight: normal;
              font-size: 12px;
              line-height: 14px;
              letter-spacing: 0.3px;
              color: #FFFFFF;
            }

            > svg {
              margin-right: 6px;
            }
          }
        }
      }

      &__actions {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-top: 42px;

        > div {
          width: 140px;
          min-width: 140px;
          height: 36px;
          min-height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          margin-right: 34px;
          cursor: pointer;

          > span {
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: 0.3px;
          }
        }

        &-save {
          background: #125AB6;

          > span {
            color: #FFFFFF;
          }
        }

        &-cancel {
          background: #FFFFFF;
          border: 1px solid #125AB6;
          box-sizing: border-box;

          > span {
            color: #125AB6;
          }
        }
      }
    }
  }


  .modal-settings-enter-active {
    transition: all .1s ease;
  }

  .modal-settings-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .modal-settings-enter, .modal-settings-leave-to {
    transform: scale(0.7);
    opacity: 0;
  }

  @media (max-width: 916px) {
    .modal-settings {
      &-body {
        width: 100%;
        height: 100%;
        padding: 16px;

        &__closed {
          right: 16px;
          top: 16px;
        }
      }
    }
  }

  @media (max-width: 500px) {
    .modal-settings {

      &-body {
        &__actions {
          justify-content: space-around;
          > div {
            margin: 0;
          }
        }
      }
    }
  }
</style>
