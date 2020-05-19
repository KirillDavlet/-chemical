<template>
  <div id="fileCard"
    :title="FS_data.title"
    @mousedown.left="singleClickDataParent"
    @mouseup.left="positionMouseEnd"
    @mousedown.right="openModalRightKeyMouse"
    @dblclick="openFileCard"
    :data-type="FS_data.type"
    :ref="`key-${keyCard}`"
  >
    <div class="file-card__icon">
      <FS__iconAudio v-if="FS_data.type.toLowerCase() === 'audio'"/>
      <FS__iconFolder v-if="FS_data.type.toLowerCase() === 'folder'"/>
      <FS__iconImage v-if="FS_data.type.toLowerCase() === '.jpg' || FS_data.type.toLowerCase() === '.png' || FS_data.type.toLowerCase() === '.jpeg'"/>
      <FS__iconTable v-if="FS_data.type.toLowerCase() === 'table'"/>
      <FS__iconText v-if="FS_data.type.toLowerCase() === '.txt'"/>
      <FS__iconVideo v-if="FS_data.type.toLowerCase() === 'video'"/>
    </div>
    <div class="file-card__title">
      <span>{{ FS_data.title }}</span>
    </div>
  </div>
</template>

<script>
    /**
     * КОМПОНЕНТ КАРТОЧКИ ФАЙЛА ФАЙЛОВОГО ХРАНИЛИЩА
     * @param props:
     *              - FS_data             - данные по файлу ( папке )
     *              - keyCard             - ключ для каждогой карточки ( на данный момент из родителя летит индекс массива )
     *
     * @param data:
     *              - dataCard            - информация по карте
     */
    import FS__iconAudio from "../iconFile/FS__icon-audio";
    import FS__iconFolder from "../iconFile/FS__icon-folder";
    import FS__iconImage from "../iconFile/FS__icon-image";
    import FS__iconTable from "../iconFile/FS__icon-tableFile";
    import FS__iconText from "../iconFile/FS__icon-textFile";
    import FS__iconVideo from "../iconFile/FS__icon-video";

    //modules api in server
    import openFile from "../apiFS/openFile/openFile";

    export default {
        name: "fileCard",
        components: {FS__iconAudio, FS__iconFolder, FS__iconImage, FS__iconTable, FS__iconText, FS__iconVideo},
        comments: {},
        props: {
            FS_data: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            keyCard: {
                type: Number,
                default: null
            }
        },
        computed: {
            position() {
            }
        },
        data() {
            return {
                dataCard: null,
                dataqweqwe: null
            }
        },
        methods: {
            /**
             * функция отрабатывает по двойному клику
             * Для открытия файла
             * @return activeFolder - отправка родителю в какую папку хотим зайти
             *
             */
            openFileCard() {
                if (this.$el.dataset.type === 'folder') {
                    this.$emit('activeFolder', this.FS_data.title)
                } else {
                    console.log('окрываем файл')
                    this.$emit('fileOpen', this.FS_data.fullAddress)
                    // this.getOpenFile(this.FS_data.fullAddress)
                }
            },
            /**
             * метод открытия файла
             */
            async getOpenFile(url) {
                const res = await openFile.getOpenFile('1', url)
                if(res) {
                    if(res.data) {
                        this.$emit('openFile')
                        // console.log(res.data) :TODO дописать как отдавать клиенту файлы
                    }
                }
            },
            /**
             * метод выделения файла ( отправляеться родителю ) при нажатии на кнопку ( down )
             * для какой либо работы :TODO додумать функционал и нужен ли он
             */
            singleClickDataParent(e) {
                this.$emit('activeFiles', {el: this.$el, key: this.keyCard})
            },
            // прекращение отслеживания координат мыши
            positionMouseEnd() {
                console.log('отпустили кнопку');
            },
            /**
             * метод открытия дополнительно меню при клике на правую клавишу
             * отправляем родителю данные по карте
             */
            openModalRightKeyMouse($event) {
                //запрещаю вызов стандартного контекстного меню
                this.$emit('rightMouseCard', {
                    el: this.$el,
                    key: this.keyCard,
                    position: {
                        x: $event.pageX,
                        y: $event.pageY
                    },
                    infoFile: this.FS_data
                });
                this.$el.oncontextmenu = function () {
                    return false
                }
            },

        },
        mounted() {
            //определение данных по карте
            this.dataCard = this.FS_data
        }
    }
</script>

<style lang="less">
  #fileCard {
    cursor: pointer;
    width: 80px;
    min-height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 5px;
    padding: 5px;
    border-radius: 4px;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;

    > div {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .file-card__title {
      margin-top: 5px;

      span {
        font-size: 10px;
        text-align: center;
      }
    }
  }

</style>
