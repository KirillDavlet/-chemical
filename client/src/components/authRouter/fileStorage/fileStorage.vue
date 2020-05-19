<template>
  <div id="fileStorage" @mousedown.right="noneContextMenu">
    <modal-file-storage
      v-if="mocalSettingsCard && activeFiles"
      :position="activeFiles.position"
      :file-link="activeFiles.infoFile.fullAddress"
      @optionModalFS="dataProcessingMFS"
    />
    <FS__loader
      v-if="FSLoader"
    />
    <modal-properties-f-s
      v-if="FSModalProperties"
      :dataFiles="FSModalPropertiesData"
      @closeModalProperties="closeModalPropertiesParent"
      @changeTitleFile="changeTitleFileParent"
    />
    <!--      шапка файлового хранилища-->
    <div class="file-storage__header">
      <span>Файловое хранилище</span>
    </div>
    <!--      блок настроек -->
    <div class="file-storage__settings">
      <storage-back
        :style="{opacity: adressLine.length > 1 ? '1' : '.4'}"
        @back="backStorage"/>
      <storage-settings
        :addressLine="adressLine.join('/')"
      />
    </div>
    <!--      тело файлового хранилища -->
    <div class="file-storage__body"
      @click="freeArea"
      :style="{justifyContent: !lengthArray ? `center` : 'flex-start' }"
    >
      <file-card
        v-if="lengthArray"
        v-for="(item,i) in nestingArray[nestingArray.length - 1]"
        :key="`card-${i}`"
        :keyCard="i"
        :FS_data="item"
        @activeFiles="catchingActiveCard"
        @activeFolder="activeFolderChild"
        @rightMouseCard="rightVouseCard"
        @fileOpen="fileOpenParent"
        :style="{
        background: activeFiles && activeFiles.key === i ? '#F5F5F5' : '',}"
      />
      <!--       Отображение новых файлов -->
      <file-card-new-sending
        v-for="(newFile,i) in newFiles"
        :key="`newCardSending-${i}`"
        :data-card="newFile"
        :url="activeUrl"
        @newFileInServer="newFileInServerParent"
      />

      <!--       КОМПОНЕНТ ЕСЛИ ПАПКА ПУСТАЯ-->
      <file-card-empty v-if="!lengthArray && lengthArrNewFile"/>

      <!--       НОВЫЙ КОМПОНЕНТ ПО ДОБАВЛЕНИЮ ФАЙЛОВ-->
      <file-card-new
        :typeComp="!lengthArray"
        @newFiles="newFilesParrent"
      />
    </div>

    <modal-view
      v-if="flagModalView"
      :files="allFilesNesting"
      @closeModalView="flagModalView = false"
    />

  </div>
</template>

<script>
    import getAcessCheck from "../../../services/getAcessCheck";
    import getFS from "./apiFS/getFS/getFS";
    import deleteFiles from "./apiFS/deleteFileFS/deleteFiles"; //модуль удаления файла
    import addFolder from "./apiFS/addFiles/addFolder" // модуль добавления папки :TODO не дописанный
    import changeFiles from "./apiFS/changeFiles/changeFiles";

    import FileCard from "./fileCard/fileCard";
    import StorageSettings from "./storageSettings/storageSettings";
    import StorageBack from "./storageSettings/storageBack";
    import ModalFileStorage from "./modalFileStorage/modalFileStorage";
    import FS__loader from "./loaderFS/FS__Loader";
    import FileCardEmpty from "./fileCard/fileCardEmpty";
    import ModalPropertiesFS from "./modalFileStorage/modalPropertiesFS";
    import FileCardNew from "./fileCard/fileCardNew";
    import FileCardNewSending from "./fileCard/fileCardNewSending";
    import ModalView from "../../mainComponent/modal-view/modalView";

    /**
     * КОМПОНЕНТ ФАЙЛОВОГО ХРАНИЛИЩА
     * ВЫЗОВ КОМПОНЕНТА :
     *                    -   <file-storage :dataFileStorage="testFile"/>
     *
     * ТЕСТОВЫЙ МАССИВ ДАННЫХ: в пропсах по default
     *
     * @param props:
     *                    - dataFileStorage         - массив по данным хранилища ( карта )
     *
     *
     * @param data:
     *                    - activeFiles             - какая карта активна (для подкрашивания )
     *                    - activeFolder            - название активной папки
     *                    - adressLine              - массив названий ( карта )
     *                    - nestingArray            - массив данных ( карта )
     *                    - mocalSettingsCard       - флаг для отображения модалки
     *                    - testFileStorage         - массив вложенности файла ( адресс )
     *                    - FSLoader                - флаг загрузчика файлового хранилища
     *                    - FSModalProperties       - флаг для отображения модалки свойств файла
     *                    - FSModalPropertiesData   - передаваемые параметры для модалки по свйоствам
     *                    - newFiles                - массив по новым файлам ( Заполняеться при передачи из компонента " fileCardNew " )
     *                    - activeUrl               - активный url ( где сейчас находимся )
     *
     */
    export default {
        name: "fileStorage",
        components: {
            ModalView,
            FileCardNewSending,
            FileCardNew,
            ModalPropertiesFS,
            FileCardEmpty, FS__loader, ModalFileStorage, StorageBack, StorageSettings, FileCard
        },
        props: {
            dataFileStorage: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        computed: {
            /**
             * :TODO НОВЫЙ МЕТОД
             * ПРОВЕРКА НАДЛИНУ РАБОЧЕГО МАССИВА ДЛЯ ОТРИСОВКИ КАРТОЧКИ ( ПУСТОЙ ИЛИ ПОЛНОЙ )
             */
            lengthArray() {
                if (this.nestingArray[this.nestingArray.length - 1] &&
                    this.nestingArray[this.nestingArray.length - 1] !== undefined
                    && this.nestingArray[this.nestingArray.length - 1] !== null) {
                    return this.nestingArray[this.nestingArray.length - 1].length > 0
                }
            },
            /**
             * :TODO новый метод по определению длины массива с новыми файлами
             */
            lengthArrNewFile() {
                if (this.newFiles) return this.newFiles.length > 0
            },
            // информация по всем элементам на данном уровне вложенности и инфа для навигации
            allFilesNesting() {
                let filesEmptyFolder = this.nestingArray[this.nestingArray.length - 1].filter(el => el.type !== 'folder');
                return {
                    files: filesEmptyFolder,
                    length: filesEmptyFolder.length,
                    activeFile: filesEmptyFolder.findIndex(el => el.fullAddress === this.dataOpenFile.fullAddress)
                }
            }
        },
        data() {
            return {
                activeFiles: null,
                activeFolder: '',
                adressLine: ['файловое хранилище'],
                nestingArray: [], //массив вложенности ( при инициализации компонента добавляем 1 элмент)
                mocalSettingsCard: false,
                testFileStorage: [],
                FSLoader: false,
                FSModalProperties: false,
                FSModalPropertiesData: null, //:TODO NEW
                newFiles: [],
                activeUrl: '',
                flagModalView: false, // флаг модального окна просмотров
                dataOpenFile: '' // поля для записи файла который открываем
            }
        },
        watch: {
            //при изменении массива названий, меняю полный адрес
            adressLine(data) {
                this.newFiles = []; // при переходе куда лиюо, убираю добавленные файлы
                if (data.length === 1) {
                    this.activeUrl = '/static'
                } else {
                    this.activeUrl += `/${data[data.length - 1]}`
                }

            },
            nestingArray(data) {
                console.log(data[data.length - 1])
            }
        },
        methods: {
            // отдаем от дочернего данные по файлу который нужно открыть
            fileOpenParent(data) {
                this.dataOpenFile = this.nestingArray[this.nestingArray.length - 1].find(el => el.fullAddress === data); // записал данные по фалйу который открываем
                this.flagModalView = true // открываю модалку
            },
            /**
             * метод отлавливания , какая из карточек активная
             * @param data - активная карта ( по которой кликнули)
             */
            catchingActiveCard(data) {
                this.activeFiles = data;
                this.mocalSettingsCard = false //закрываю модалку
            },
            /**
             * метод клика по рабочей области ( отслеживаю, клик не по файлу )
             */
            freeArea(e) {
                this.mocalSettingsCard = false //закрываю модалку
                e.target.classList.contains('file-storage__body') ? this.activeFiles = null : ''
            },
            /**
             * метод определия в какую папку заходим, ловим от дочернего компонента
             * @param folder - название папки в которую хотим попасть
             */
            activeFolderChild(folder) {
                this.mocalSettingsCard = false //закрываю модалку
                this.adressLine.push(folder) //добавляю новую строку в массив
                this.activeFolder = folder; //записал активную страницу
                //поиск необходимого элемента ( папки )
                this.nestingArray[this.nestingArray.length - 1].forEach(el => {
                    if (el.title.toLowerCase() === this.activeFolder.toLowerCase()) {
                        this.nestingArray.push(el.children)
                    }
                });
                this.activeFiles = null //при заходе в новую папку скидываем стили активного файла
            },
            /**
             * Ловим событие клика правой мыши по элементу
             */
            rightVouseCard(data) {
                this.activeFiles = data;
                this.mocalSettingsCard = true //отображение окна настроек
            },
            /**
             * метод перехода назад
             */
            backStorage() {
                this.mocalSettingsCard = false; //закрываю модалку
                if (this.adressLine.length > 1) {
                    this.adressLine.pop(); // удаляю последнюю строку из массива
                    this.nestingArray.pop();
                    this.activeFiles = null //при возврате. скидываем стили активного файла
                }
            },
            /**
             *
             * МЕТОД ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА (modalPropertiesFS)
             */
            closeModalPropertiesParent() {
                this.FSModalProperties = false
            },

            /**
             * МЕТОД обработки запроса на изменение элемента и закрытие модалки по настройкам файла
             */
            changeTitleFileParent(data) {
                this.nestingArray[this.nestingArray.length - 1].find(el => {
                    if (el.fullAddress === data.fullAddress) {
                        if (el.title !== data.name) {
                            this.setData({
                                nameNew: data.name,
                                nameStart: el.title,
                                url: el.fullAddress
                            })
                        }
                    }
                });

                this.closeModalPropertiesParent()
            },

            /**
             *  Функция запроса на изменение данных по файлу
             */
            async setData(data) {
                let alert = {};
                const res = await changeFiles.changeFiles(data, this.$route.params.id);
                //если ответ пришел и он положительный, тогда меняем данные в компоненте
                if (res && res.data.status) {
                    this.nestingArray[this.nestingArray.length - 1].find(el => {
                        if (el.fullAddress === res.data.fullAddressStart) {
                            el.fullAddress = res.data.fullAddressNew;
                            el.title = res.data.nameNew
                        }
                    });
                    alert.message = res.data.message;
                    alert.type = res.data.typeMessage;
                    this.$store.commit('SET_ALERTARRAY', alert)
                }
            },

            /**
             * функция запроса на дерево хранилища (данных по хранилищу )
             */
            async getData() {
                const res = await getFS.getFS(
                    1,'admin','pass',
                );
                if (res.status !== 200) console.log('ошибка');
                if (res.data) {
                    this.nestingArray.push(res.data.info); //добавил корневую папку хранилища
                    this.$store.commit('SET_ALERTARRAY', {
                        status: res.data.status,
                        message: res.data.message,
                        type: res.data.typeMessage
                    })
                }
            },
            /**
             * функция удаления файлов ( папок ) в файловом хранилище
             * после получения ответа о удалении, удаляю на клиенте этот элемент
             */
            async delFileFS(data) {
                let alert = {};
                const res = await deleteFiles.deleteFile(data, this.$route.params.id);
                if (res.data) {
                    if (res.data.status) {
                        this.nestingArray[this.nestingArray.length - 1].forEach((el, i, arrFileStorage) => {
                            if (el.fullAddress === res.data.address) {
                                arrFileStorage.splice(i, 1)
                            }
                        });
                        this.FSLoader = false //закрываю загрузчик файлового хранилища
                    } else {
                        this.FSLoader = false //закрываю загрузчик файлового хранилища
                    }
                    alert.message = res.data.message;
                    alert.type = res.data.typeMessage;
                    this.$store.commit('SET_ALERTARRAY', alert)
                }
            },
            /**
             * функция отображения свйоств файла
             */
            propertiesFilesFS(data) {
                this.FSModalPropertiesData = data; //:TODO записал данные по файлу
                this.FSLoader = false; //закрываю загрузчик файлового хранилища
                this.FSModalProperties = true; //отображение модального окна по свойствам файла
            },
            /**
             * функция запрета контекстного меню
             */
            noneContextMenu() {
                this.$el.oncontextmenu = function () {
                    return false
                };
                this.FSModalProperties = false;
            },
            /**
             * :TODO ОБНОВЛЕННЫЙ МЕТОД
             * Метод обработки данных полученных с модального окна, по правой клавиши мыши над файлом и скрывания модалки
             * @param data - Object {event - что нужно сделать,fullLink - полная ссылка нахождения файла }
             */
            dataProcessingMFS(data) {
                this.FSLoader = true; //активировали загрузчик файлового хрнилища
                this.mocalSettingsCard = false;
                switch (data.event) {
                    case `delete`:
                        this.delFileFS(data.fullLink);
                        break;
                    case 'properties':
                        this.propertiesFilesFS(this.nestingArray[this.nestingArray.length - 1].find(el => el.fullAddress === data.fullLink)); //:TODO ДОБАВИЛ ПАРАМЕТР ДЛЯ ПРЕДАЧИ В МОДАЛКУ ПО СВОЙСТВАМ ФАЙЛОВ ( ПАПОК )
                        break;
                    default:
                        this.FSLoader = false;
                }

            },


            ////////////////////////////////////////////// :TODO Методы по обработке новых файлов
            /**
             * Метод по записыванию данных по новым файлам
             * @param data
             */
            newFilesParrent(data) {
                this.newFiles = Array.from(data)
            },
            /**
             * МЕТОД ПО РЕЗУЛЬТАТМ ДОБАВЛЕНИЯ НОВГО ФАЙЛА
             * @param data - файл который сохранили на сервере
             */
            newFileInServerParent(data) {
                // вырезание временного файла , после добаления его
                for (let i = 0; i < this.newFiles.length; i++) {
                    if (this.newFiles[i].name === data.title) {
                        this.newFiles.splice(i, 1);
                    }
                }
                this.nestingArray[this.nestingArray.length - 1].push(data); //записал новый добавленный файл в основной массив файлов
            },

        },
        mounted() {
            //инициализация карты каталога
            this.getData();
            //инициализация ссылки при иниц. каталога
            this.activeUrl = `/static`;

        }
    }
</script>

<style lang="less">
  #fileStorage {
    width: 100%;
    height: auto;
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-family: Roboto, sans-serif;

    .file-storage__header {
      width: 100%;
      height: auto;
      padding: 7px 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;

      > span {
        font-style: normal;
        font-weight: 300;
        font-size: 34px;
        line-height: 32px;
        letter-spacing: 0.02em;
        color: #2A2A2A;
      }
    }

    .file-storage__settings {
      display: flex;
      align-items: center;
    }

    .file-storage__body {
      display: flex;
      flex-wrap: wrap;
    }
  }

  //СТИЛИ ДЛЯ ВЫБРАННОГО ФАЙЛА ( ПАПКИ )

  .file-card__active {
    background: #c3c9c6;
  }
</style>
