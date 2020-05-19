<template>
  <div
    id="FSPropertiesFiles"
    :style="{top:`${this.positionMPFS.y}px`, left: `${this.positionMPFS.x}px`}"
  >
    <div
      @mousedown.left="FSPSDragAndDropDown"
      @mouseup.left="FSPSDragAndDropUp"
      class="fs-properties-file__header">
      <span>Свойства:
        <!--            ИКОНКУ ВСТАВИТЬ -->
        {{ dataFiles.name }}
      </span>
      <div
        class="fs-properties-file__header-close"
        @click="closeModalProperties"
      >
        <span>X</span>
      </div>
    </div>
    <div
      class="fs-properties-file__block">
      <div class="fs-properties-file__block-name">
        <span>{{ dataFiles.title }}</span>
        <input type="text" v-model="nameFile">
      </div>
      <hr>
      <div class="fs-properties-file__block-type__file">
        <span>{{ typeFile }}</span>
      </div>
      <div class="fs-properties-file__block-position">
        <span>расположение:</span>
        <span>{{ dataFiles.fullAddress.replace('static','файловое хранилище') }}</span>
      </div>
      <div class="fs-properties-file__block-data">
        <span>дата создания файла:</span>
        <span>{{ dataFiles.dateOfCreation.birthTime }}</span>
      </div>
      <div class="fs-properties-file__block-size">
        <span>размер файла:</span>
        <span>{{ dataFiles.size }}</span>
        <span>байт</span>
      </div>
    </div>
    <div class="fs-properties-file__footer">
      <div @click="SaveModalProperties"><span>Ок</span></div>
      <div @click="closeModalProperties"><span>Отмена</span></div>
    </div>
  </div>
</template>

<script>
    /**
     * КОМПОНЕНТ МОЩДАЛЬНОГО ОКНА СВОЙСТВ ФАЙЛА
     *
     * @param props:
     *              - dataFiles - объект данных по файлу ( папки )
     *
     * ФУНКЦИОНАЛ:
     *            - в модальном окне отображаються дапнные по :
     *                                                          -
     *                                                          -
     *
     * ВЫЗОВ КОМПОНЕНТА В РОДИТЕЛЬСКОМ:
     *
     *     <modal-properties-f-s
     *          v-if="FSModalProperties"
     *          :dataFiles="FSModalPropertiesData"
     *          @closeModalProperties="closeModalPropertiesParent"
     *          @changeTitleFile="changeTitleFileParent"
     *       />
     *
     * Свойства и методы в родительском компоненте:
     *                                             - FSModalProperties ( bool ) флаг отображающий модалку;
     *                                             - FSModalPropertiesData ( null ||  Obj)  записыается в методе "propertiesFilesFS"
     *                                             -  propertiesFilesFS(data) {
     *                                                                         this.FSModalPropertiesData = data //:TODO записал данные по файлу
     *                                                                        this.FSLoader = false //закрываю загрузчик файлового хранилища
     *                                                                         this.FSModalProperties = true; //отображение модального окна по свойствам файла
     *                                                                      },
     *                                                                      Вызываеться в проверке какое событие наступило где switch
     *                                                                      case 'properties':
     *                                                                              this.propertiesFilesFS(this.nestingArray[this.nestingArray.length - 1].find(el => el.fullAddress === data.fullLink)); //:TODO ДОБАВИЛ ПАРАМЕТР ДЛЯ ПРЕДАЧИ В МОДАЛКУ ПО СВОЙСТВАМ ФАЙЛОВ ( ПАПОК )
     *                                                                              break;
     *
     *                                              -  closeModalPropertiesParent() {
     *                                                                               this.FSModalProperties = false
     *                                                                           },
     *                                              - changeTitleFileParent(data) {
     *                                                                             this.nestingArray[this.nestingArray.length - 1].find(el => {
     *                                                                                 if(el.fullAddress === data.fullAddress) {
     *                                                                                     if(el.title !== data.name) {
     *                                                                                         this.setData({
     *                                                                                             nameNew: data.name,
     *                                                                                             nameStart: el.title,
     *                                                                                             url: el.fullAddress
     *                                                                                         })
     *                                                                                     }
     *                                                                                 }
     *                                                                             });
     *                                                                             this.closeModalPropertiesParent()
     *                                                                         },
     *                                                 - async setData(data) { :TODO изменение имени фалйа
     *                                                                         const res = await changeFiles.changeFiles(data);
     *                                                                         //если ответ пришел и он положительный, тогда меняем данные в компоненте
     *                                                                         if(res && res.data.status) {
     *                                                                             this.nestingArray[this.nestingArray.length - 1].find(el => {
     *                                                                                 if(el.fullAddress === res.data.fullAddressStart) {
     *                                                                                     el.fullAddress = res.data.fullAddressNew;
     *                                                                                     el.title = res.data.nameNew
     *                                                                                 }
     *                                                                             })
     *
     *                                                                         }
     *                                                                     },
     *
     *
     *
     *  API:
     *  import api from "./../api"
     *          export default {
     *       changeFiles (data) {
     *         return api().post('/fileStorage/change',{
     *           nameNew:data.nameNew,
     *           nameStart:data.nameStart,
     *           url:data.url
     *         })
     *       }
     *     }

     */
    export default {
        name: "modalPropertiesFS",
        props: {
            dataFiles: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            position: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                mouseMove: false,
                positionMPFS: null, // координаты модалки
                positionStart: null, //координаты где именно курсор над элементом
                nameFile: '', //имя файла ( связываем с input )
            }
        },
        computed: {
            typeFile() {
                switch (this.dataFiles.type) {
                    case '':
                        return 'папка с файлами';
                        break;
                    case '.txt':
                        return `текстовый документ`;
                        break;
                }
            }
        },
        methods: {
            /**
             * МЕТОД ЗАКРЫТИЯ МОДАЛКИ
             */
            closeModalProperties() {
                this.$emit('closeModalProperties')
            },
            /**
             * метод сохранения изменений по файлу
             * $emit - changeTitleFile:
             *                          - ( type ) Object :
             *                                             - fullAddress         - адресс файла ( по нему определим файл )
             *                                             - name                - новое название файла
             * @constructor
             */
            SaveModalProperties() {
                this.$emit('changeTitleFile', {
                    fullAddress: this.dataFiles.fullAddress,
                    name: this.nameFile
                })
            },
            /**
             * Метод drag and dropa при зажимании кнопки ( левой )
             * @constructor
             */
            FSPSDragAndDropDown($event) {
                this.positionStart = {
                    top: $event.pageY - this.$el.getBoundingClientRect().top - window.pageYOffset,
                    left: $event.pageX - this.$el.getBoundingClientRect().left - window.pageXOffset,
                };
                //подвешал событие на тело
                document.body.addEventListener('mousemove', (event) => {
                    this.FSPSDragAndDropMove(this.mouseMove, event)
                });
                this.mouseMove = true
            },
            /**
             *  Метод drag and dropa при отпускании кнопки ( левой )
             * @constructor
             */
            FSPSDragAndDropUp() {
                this.mouseMove = false;
            },

            FSPSDragAndDropMove(bool, $event) {
                if (bool) {
                    this.positionMPFS = {
                        x: $event.pageX - this.positionStart.left,
                        y: $event.pageY - this.positionStart.top
                    };
                } else {
                    return false
                }
            }
        },
        created() {
            this.positionMPFS = this.position;
            this.nameFile = this.dataFiles.title //записал название файла
        }
    }
</script>

<style lang="less">
  #FSPropertiesFiles {
    min-width: 300px;
    max-width: 600px;
    height: auto;
    min-height: 180px;
    background: #FFFFFF;
    position: absolute;
    z-index: 10000;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .fs-properties-file__header {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      background: #B9C3D2;
      position: relative;
      cursor: pointer;

      > span {
        padding: 0 12px;
        color: #FFFFFF;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.02em;

      }

      &-close {
        position: absolute;
        right: 7px;
        cursor: pointer;

        > span {
          font-size: 14px;
          color: #000000;
        }
      }
    }

    .fs-properties-file__block {
      width: 100%;
      height: auto;
      padding: 5px 21px 5px 8px;
      box-sizing: border-box;
      font-size: 12px;
      color: #1E1E1E;

      > div {
        width: 100%;
        min-height: 45px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      &-name {
        > span {
          display: inline-block;
          width: 30%;
        }

        > input {
          width: 70%;
          padding: 0 7px;
          border: 1px solid black;
        }
      }
    }

    .fs-properties-file__footer {
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      background: #B9C3D2;
      justify-content: flex-end;

      > div {
        min-width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        margin-right: 15px;
        border-radius: 4px;
        cursor: pointer;

        > span {
          color: #000000;
          font-size: 14px;
          line-height: 21px;
          letter-spacing: 0.02em;
        }
      }
    }
  }
</style>
