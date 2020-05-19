<template>
  <div
    :title="`разрешенные типы файлов : ${allowedFileTypes.map(el=> el.text)}`"
    id="fileCardNew">
    <div
      :class="infoText.class"
    >
      <div class="file-card-new__icon">
        <FS__iconNewFile :size="infoText.sizeIcon"/>
      </div>
      <div class="file-card-new__info">
        <span>Загрузка файлов</span>
        <span>{{ infoText.text }}</span>
      </div>
    </div>
    <input type="file" ref="filesInServer" multiple class="input-files" @change="addFiles">
  </div>
</template>

<script>
    /**
     * КОМОНЕНТ ЗАГРУЗКИ ФАЛОВ
     *
     * @params props:
     *                - typeComp ( boolean ) - определяет размер блока загрузки, если в папке файлов нет, тогда большой и можно перетаскивать drag and drop^ом иначе маленький и загрузка начинаеться по клику
     * @param data:
     *                - files - массив выбранных файлов
     */
    import FS__iconNewFile from "../iconFile/FS__icon-newFile";

    export default {
        name: "fileCardNew",
        props: {
            typeComp: {
                type: Boolean,
                default: false
            }
        },
        components: {FS__iconNewFile},
        data() {
            return {
                files: [],
                allowedFileTypes: [
                    {type: '', text: 'pdf'} //:TODO дописать рарешенные типы данных
                ]
            }
        },
        computed: {
            /**
             * метод вычесления текста и класа блока в зависимости от - есть ли в папке еще файлы или нет
             * @returns {{text: string, class: string}}
             */
            infoText() {
                if (this.typeComp) {
                    return {
                        class: 'file-card-new__big',
                        text: `перетащите в выделенную область файл, что бы загрузчить его`,
                        sizeIcon:70
                    }
                } else {
                    return {
                        class: 'file-card-new__mini',
                        text: 'Нажмите что бы загрузить файл',
                        sizeIcon:30
                    }
                }
            },
        },
        watch: {
            /**
             *Отправка родителю новых файлов
             */
            files(data) {
                this.$emit('newFiles', this.files)
            }
        },
        methods: {
            /***
             * Метод добавления файлов в массив
             *      добавляет следующим образом:
             *                                  - при маленьком , кликаем на блок добавления и выбираем 1 или несколько файлов , каждый раз он обновляет фацлы
             *                                  - при большом drag and drop добавляем при перетаскивании
             */
            addFiles() {
                this.files = this.$refs.filesInServer.files
            }
        }
    };
</script>

<style lang="less">
  #fileCardNew {
    cursor: pointer;
    min-width: 100px;
    width: auto;
    min-height: 80px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 5px;
    padding: 5px;
    border-radius: 4px;
    border: 3px dotted #47a2f9;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    position: relative;

    > div {
      width: auto;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .file-card-new__mini {
      width: 100px;
      .file-card-new__info {
        > span {
          font-size: 10px;
          text-align: center;
        }
      }
    }
    .file-card-new__big {
      width: 40vw;
      height: 300px;
      .file-card-new__info {
        > span {
          font-size: 16px;
          text-align: center;
        }
      }
    }

    .file-card-new__info {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      > span:first-child {
        margin-bottom: 6px;
      }

      > span:last-child {
        font-style: normal;
        font-weight: normal;
        letter-spacing: 0.02em;
        color: #70889E;
      }
    }


    .input-files {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }

  }
</style>
