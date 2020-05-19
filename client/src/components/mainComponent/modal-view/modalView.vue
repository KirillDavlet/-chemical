<template>
  <div class="modal-view">
    <div class="modal-view__settings" @mouseenter="flagActions = true" @mouseleave="flagActions = false">
      <div class="actions-icon" v-if="!flagActions">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.51562 14.4844C10.2031 15.1719 11.0312 15.5156 12 15.5156C12.9688 15.5156 13.7969 15.1719 14.4844 14.4844C15.1719 13.7969 15.5156 12.9688 15.5156 12C15.5156 11.0312 15.1719 10.2031 14.4844 9.51562C13.7969 8.82812 12.9688 8.48438 12 8.48438C11.0312 8.48438 10.2031 8.82812 9.51562 9.51562C8.82812 10.2031 8.48438 11.0312 8.48438 12C8.48438 12.9688 8.82812 13.7969 9.51562 14.4844ZM19.4531 12.9844L21.5625 14.625C21.7812 14.7812 21.8125 15 21.6562 15.2812L19.6406 18.75C19.5156 18.9688 19.3125 19.0312 19.0312 18.9375L16.5469 17.9531C15.8906 18.4219 15.3281 18.75 14.8594 18.9375L14.4844 21.5625C14.4219 21.8438 14.2656 21.9844 14.0156 21.9844H9.98438C9.73438 21.9844 9.57812 21.8438 9.51562 21.5625L9.14062 18.9375C8.54688 18.6875 7.98438 18.3594 7.45312 17.9531L4.96875 18.9375C4.6875 19.0312 4.48438 18.9688 4.35938 18.75L2.34375 15.2812C2.1875 15 2.21875 14.7812 2.4375 14.625L4.54688 12.9844C4.51562 12.7656 4.5 12.4375 4.5 12C4.5 11.5625 4.51562 11.2344 4.54688 11.0156L2.4375 9.375C2.21875 9.21875 2.1875 9 2.34375 8.71875L4.35938 5.25C4.48438 5.03125 4.6875 4.96875 4.96875 5.0625L7.45312 6.04688C8.10938 5.57812 8.67188 5.25 9.14062 5.0625L9.51562 2.4375C9.57812 2.15625 9.73438 2.01562 9.98438 2.01562H14.0156C14.2656 2.01562 14.4219 2.15625 14.4844 2.4375L14.8594 5.0625C15.4531 5.3125 16.0156 5.64062 16.5469 6.04688L19.0312 5.0625C19.3125 4.96875 19.5156 5.03125 19.6406 5.25L21.6562 8.71875C21.8125 9 21.7812 9.21875 21.5625 9.375L19.4531 11.0156C19.4844 11.2344 19.5 11.5625 19.5 12C19.5 12.4375 19.4844 12.7656 19.4531 12.9844Z"
            :fill="styleActions"/>
        </svg>
      </div>
      <div v-if="flagActions" class="modal-view__settings-close actions-icons" @click="closeModalView">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.9844 6.42188L13.4062 12L18.9844 17.5781L17.5781 18.9844L12 13.4062L6.42188 18.9844L5.01562 17.5781L10.5938 12L5.01562 6.42188L6.42188 5.01562L12 10.5938L17.5781 5.01562L18.9844 6.42188Z"
            :fill="styleActions"/>
        </svg>
      </div>
      <div v-if="flagActions" class="modal-view__settings-size actions-icons" @click="sizeModalView">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.0156 15V18H17.0156L12 23.0156L6.98438 18H9.98438V15H14.0156ZM23.0156 12L18 17.0156V14.0156H15V9.98438H18V6.98438L23.0156 12ZM9 9.98438V14.0156H6V17.0156L0.984375 12L6 6.98438V9.98438H9ZM9.98438 9V6H6.98438L12 0.984375L17.0156 6H14.0156V9H9.98438Z"
            :fill="styleActions"/>
        </svg>
      </div>
      <a :href="downloadImageUrl" :download="downloadImageUrl" v-if="flagActions"
         class="modal-view__settings-download actions-icons">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.01562 18H18.9844V20.0156H5.01562V18ZM18.9844 9L12 15.9844L5.01562 9H9V3H15V9H18.9844Z"
                :fill="styleActions"/>
        </svg>
      </a>
    </div>
    <div class="modal-view__title" v-if="actionFile && actionFile.title">
      <span>{{ actionFile.title }}</span>
    </div>
    <div class="modal-view__actions" v-if="flagDisplayNavigation">
      <div class="modal-view__actions-next"></div>
      <div class="modal-view__actions-back"></div>
    </div>
    <div class="modal-view__container" :style="styleBlockContainer">
      <div class="modal-view__container-loader">
        <open-file-loader v-if="flagDownloaderFile"/>
      </div>
      <div class="modal-view__container-block" v-if="actionFile && typeFile && urlImage">
        <img :src="urlImage" alt="" v-if="typeFile === 'image'">
        <!--        Думаю открывать все осталбные файлы можно и в новой вкладкее браузера ибо не придумывать велосипед -->
      </div>
    </div>
    <div class="modal-view__navigation" v-if="files.length > 1">
      <div class="modal-view__navigation-next" @click="navigationFiles('next')">
        <arrow fill="#FFFFFF"/>
      </div>
      <div class="modal-view__navigation-back" @click="navigationFiles('back')">
        <arrow fill="#FFFFFF"/>
      </div>
    </div>
  </div>
</template>

<script>
    import typeDefinition from './configFile/typeDefinition'

    import OpenFileLoader from "../../loaders/openFile/openFileLoader";

    const server = require('./../../../config/client/client').server;
    import Axios from 'axios'
    import Arrow from "../../icon/arrow";

    export default {
        /**
         * компонент общий контайнер для просмотра файлов
         */
        name: "modalView",
        components: {Arrow, OpenFileLoader},
        props: {
            // информация по сестринчким элементам и данные по навигации на данной сложенности
            files: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                flagActions: false,
                flagBigSize: false, // флаг отечает за размер просмотра контента
                flagDisplayNavigation: false, // флаг отвечает за отображение блока переключения между файлоами
                flagDownloaderFile: false, // флаг отвечает за загрузку файла
                dataFileInServer: null, // файл с сервера
                activeFileCount: this.files.activeFile || 0 // актиынй файл
            }
        },
        computed: {
            // размер блока просморта
            styleBlockContainer() {
                return this.flagBigSize ? {width: '100%', height: '100%'} : {width: '80%', height: '80%'}
            },
            styleActions() {
                return this.flagBigSize ? '#ffffff' : '#666666';
            },
            urlImage() {
                return server + this.actionFile.fullAddress.replace('./static/', 'public/')
            },
            typeFile() {
                return typeDefinition(this.actionFile.type)
            },
            downloadImageUrl() {
                return `${server}${this.actionFile.fullAddress.replace('./static/', 'public/')}`
            },
            // возврат активного файла
            actionFile() {
               return this.files.files[this.activeFileCount]
            },

        },
        methods: {
            // закрытие модалки просмотра
            closeModalView() {
                this.$emit('closeModalView')
            },
            sizeModalView() {
                this.flagBigSize = !this.flagBigSize
            },
            async downloadFile() {
                await Axios.get(`${server}download?url=${this.actionFile.fullAddress.replace('./static/', 'public/')}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            },
            // загрузка файла
            async openFile() {
                this.flagDownloaderFile = true;
                await Axios.get(`${server}${this.actionFile.fullAddress.replace('./static/', '')}`)
                    .then(res => {
                        this.dataFileInServer = res.data; // запись данных с сервера при открытии файла
                    })
                    .catch(err => console.log(err))
                    .finally(() => this.flagDownloaderFile = false)
            },
            async openFilePdf() {
                this.flagDownloaderFile = true;
                await Axios.get(`${server}open/?url=${this.actionFile.fullAddress.replace('./static/', '')}`)
                    .then(res => {
                        this.dataFileInServer = res.data; // запись данных с сервера при открытии файла
                    })
                    .catch(err => console.log(err))
                    .finally(() => this.flagDownloaderFile = false)
            },
            /**
             * метод слежения за клавишами
             */
            eventKey(e) {
                if (e.key.toLowerCase() === 'escape'.toLowerCase()) {
                    this.closeModalView()
                }
                else if(e.key.toLowerCase() === 'ArrowRight'.toLowerCase()) this.navigationFiles('next');
                else if(e.key.toLowerCase() === 'ArrowLeft'.toLowerCase()) this.navigationFiles('back');
            },

            // ПЕРЕКЛЮЧЕНИЕ файлов
            /**
             * метод перехода между файлами
             * @param type - тип перехода (впередБ назад )
             */
            navigationFiles(type) {
                if (type === 'next') {
                    this.activeFileCount < this.files.files.length - 1 ? this.activeFileCount++ : this.activeFileCount = 0
                } else if (type === 'back') {
                    this.activeFileCount === 0 ? this.activeFileCount = this.files.files.length - 1 : this.activeFileCount--
                }
            }
        },
        mounted() {
            document.addEventListener('keydown', this.eventKey, false);
            if (this.actionFile.type === '.pdf') this.openFilePdf();
            else this.openFile()
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.eventKey, false);
        }
    }
</script>

<style lang="less">
  .modal-view {
    width: 100%;
    height: calc(100% - 45px);
    position: absolute;
    top: 45px;
    left: 0;
    background: rgba(128, 128, 128, 0.09);
    animation: openModalView .3s ease-in-out forwards;
    display: flex;
    justify-content: center;
    align-items: center;

    &__title {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 1200;
    }

    &__settings {
      height: 40px;
      position: absolute;
      right: 15px;
      top: 15px;
      padding: 0 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;

      .actions-icons {
        cursor: pointer;
      }

      .actions-icons:not(:last-child) {
        margin-right: 7px;
      }

      > div {
        opacity: 0;
        transform: translateX(-50px);
        animation: activeSettings .2s ease-in-out forwards;
      }

      &-size, &-close {
        transition: .2s ease-in-out;

        &:hover {
          > svg {
            transform: scale(1.1);
          }
        }
      }

    }

    &__actions {
      position: absolute;
      width: 100%;
      height: 100%;
      top: calc((100% - 50px) / 2);
      display: flex;
      justify-content: space-between;

      > div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    &__container {
      width: 80%;
      height: 80%;
      background: rgba(30, 30, 30, 0.46);
      transition: .3s ease-in-out;

      &-loader {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &-block {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        > img {
          height: 100%;
        }
      }
    }

    &__navigation {
      > div {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: calc(50% - 20px);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }

      &-next {
        right: 2em;
      }

      &-back {
        left: 2em;
        transform: rotate(180deg);
      }
    }

    @keyframes openModalView {
      0% {
        opacity: 0.3;
        transform: scale(.1);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes activeSettings {
      0% {
        opacity: 0;
        transform: translateX(-50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
</style>
