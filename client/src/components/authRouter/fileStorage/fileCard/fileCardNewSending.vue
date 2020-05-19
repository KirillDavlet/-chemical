<template>
  <div
    id="fileCardNewSending">
    <div class="file-card-new-sending">
      <div class="file-card-new-sending__icon">
        <FS__iconNewFile/>
      </div>
      <div class="file-card-new-sending__name">
        <span>{{ dataCard.name.split('.')[0] }}</span>
      </div>
      <div class="file-card-new-sending__save">
        <cm__button-standard
          :statusLoading="flagLoaderButton"
          :textButton="`save`"
          @eventClick="saveNewFile"
          style="width: 50px; font-size: 10px"
        />
      </div>
    </div>
  </div>
</template>

<script>
    /**
     * КОМПОНЕНТ КАРТОЧКИ НОВОГО ФАЙЛА, НЕ СОХРАНЕННОГО
     *
     * @param props:
     *              - dataCard               - информация по файлу
     *              - url                    - адрес куда сохраняем
     *
     */
    import FS__iconNewFile from "../iconFile/FS__icon-newFile";
    import addFiles from "../apiFS/addFiles/addFiles";
    import Cm__buttonStandard from "../../../button/cm__button-standard";
    import form from "../../../form/form";

    export default {
        name: "fileCardNewSending",
        components: {Cm__buttonStandard, FS__iconNewFile},
        props: ['dataCard', 'url'],
        data() {
            return {
                flagLoaderButton: false,
                result: '',
            }
        },
        methods: {
            /**
             * метод сохранения файла на сервере
             * @returns {Promise<void>}
             */
            async saveNewFile() {
                let dataFile = new FormData();
                dataFile.append('name', this.dataCard.name);
                dataFile.append('file', this.dataCard);
                dataFile.append('url', this.url);
                const res = await addFiles.addFiles(dataFile, '12');
                this.flagLoaderButton = true;
                let alert = {}; // объект для вывода ссобщения о выполнении запроса
                if (res) {
                    if (!res.status) {}
                    else {
                        if (res.data) {
                            this.result = res.data.message;
                            //:TODO НОВОЕ
                            // отправка родителю только что добавленный файл, что бы убрать этот и добавить в массив файлов ( без перезагрузки)
                            if(res.data.file) {
                                this.$emit('newFileInServer', res.data.file)
                                this.flagLoaderButton = false;
                            }

                        } else {
                            this.flagLoaderButton = false;
                        }
                        this.flagLoaderButton = false;
                        alert.message = res.data.message
                        alert.type = res.data.typeMessage
                        this.$store.commit('SET_ALERTARRAY',alert)
                    }
                }
            }
        }
    };
</script>

<style lang="less">
  #fileCardNewSending {
    cursor: pointer;
    width: 100px;
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
    border: 2px dashed blue;

    .file-card-new-sending {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &__name {
        > span {
          font-size: 13px;
        }
      }
    }
  }
</style>
