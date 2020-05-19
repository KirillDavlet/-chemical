<template>
  <div class="loader-file"
       @drop.stop.prevent="addFile"
       @dragover.prevent="fileAboveElement"
       @dragleave.prevent="fileAboveElementNone"
       :style="styleDrag">
    <div class="loader-files" v-if="loader">

    </div>
  </div>
</template>

<script>
    const server = require('./../../../config/client/client').server
    import Axios from 'axios'
    import LoaderImage from "./typeLoader/loader-image";

    export default {
        name: "loaderFile",
        components: {LoaderImage},
        props: {
            // тип загрузчика
            typeLoader: {
                type: String,
                default: 'image'
            },
            // строка отображения
            placeholder: {
                type: String,
                default: ' перетащите файлы'
            },
            // куда летит запрос на сохранение
            dataFrom: [Array, Object, String]
        },
        computed: {
            styleDrag() {
                if (this.fileAboveElementFlag) {
                    return {
                        border: '1px solid lightgray'
                    }
                }
            }
        },
        watch: {
            // как меняеться массив , отправляю на сервер фотку
            files() {
                this.upload(this.dataFrom)
            }
        },
        data() {
            return {
                fileAboveElementFlag: false, //флаг для отображения когда файл над элементом
                files: [], //массив файлов для добавления
                loader: false // флаг отвечающий за отправку файлов
            }
        },
        methods: {
            addFile(e) {
                let droppedFiles = e.dataTransfer.files;
                if (!droppedFiles) return;
                ([...droppedFiles]).forEach(f => {
                    this.files.push(f);
                });
            },
            fileAboveElement() {
                if (!this.fileAboveElementFlag) {
                    this.fileAboveElementFlag = true
                }
            },
            fileAboveElementNone() {
                if (this.fileAboveElementFlag) {
                    this.fileAboveElementFlag = false
                }
            },
            /**
             * метод отправки файла, файлов на сервер
             * @param url - куда отправляем
             */
            upload(from) {
                // если не пусто
                if (this.files.length > 0) {
                    this.loader = true;
                    let formData = new FormData();
                    // Отправка 1 файла
                    if (this.typeLoader === 'image') {
                        formData.append('image', this.files[this.files.length - 1]);
                        formData.append('from', from)
                    } else {
                    }
                    Axios.post(`${server}files/add`, formData)
                        .then(res => {
                            console.log(res)
                        })
                        .finally()
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => {
                            this.loader = false;
                            this.files = []
                        })
                }

            }
        }
    }
</script>

<style lang="less">
  .loader-file {
    width: 100%;
    min-height: 75px;
    background: rgba(230, 230, 230, 0.5);
    border: 2px dashed #C4C4C4;
    box-sizing: border-box;
    border-radius: 4px;
    transition: .1s linear;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: rgba(230, 230, 230, 0.7);
    }

    .loader-files {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid gray;
      border-bottom: none;
      animation: loaderAnim .3s ease-in-out infinite;
    }

    @keyframes loaderAnim {
      0% {
        transform: rotate(0)
      }
      100% {
        transform: rotate(360deg)
      }
    }
  }
</style>
