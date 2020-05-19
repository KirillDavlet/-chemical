<template>
  <div id="editColorTheme">
    <div class="edit-theme__title">
      <span>Редактирование темы - <i>{{ dataTheme.nameTheme }}</i></span>
    </div>
    <div class="edit-theme__name">
      <input type="text" v-model="dataThemeEdit.nameTheme">
    </div>
    <div v-for="(item, i) in dataThemeEdit.mandatory ">
      <span>{{ templateText[i] }}</span>
      <input type="color" v-model="item.color">
      <input type="color" v-model="item.background">
      <input type="color" v-if="item.backgroundAll" v-model="item.backgroundAll">
    </div>
    <div class="edit-theme__save"
         :class="{'active-save': differences}">
      <div class="edit-theme__save-button"
           @click="saveTheme"><span>Сохранить</span></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "editColorSheme",
        props: {
            dataTheme: {
                type: Object, default: () => {
                }
            }
        },
        data() {
            return {
                dataThemeEdit: {},
                templateText: {
                    mainBackground: 'основной цвет навигационных элементов',
                    navigationBackground: 'Цвет sidebar\'ов',
                    secondaryBackground: 'Второстпенный цвет',
                    workspaceBackground: 'цвет рабочей области'
                }
            }
        },
        computed: {
            differences() {
                return JSON.stringify(this.dataThemeEdit) === JSON.stringify(this.dataTheme)
            }
        },
        methods: {
            /**
             *  метод изменения темы ( отправка запроса к DB )
             */
            saveTheme() {
                this.$store.dispatch('editTheme', {id:this.dataTheme.id, data: {nameTheme:this.dataThemeEdit.nameTheme, data: this.dataThemeEdit.mandatory } })
                //:TODO остановился на копировании тут ТАК ЖЕ ПОСЛЕ ИЗМЕНЕНИЯ ТЕМЫ, НУЖО ОТПРАВИТЬ ЗАПРОС К БД ДЛЯ ИЗМЕНЕНИЯ УЖЕ СОЗДАННОЙ ТЕНМЫ
                this.$emit('editTheme')
            }
        },
        mounted() {
            this.dataThemeEdit = JSON.parse(JSON.stringify(this.dataTheme))
        }
    }
</script>

<style lang="less">
  #editColorTheme {
    width: 100%;
    height: auto;

    .edit-theme__title {
      display: flex;
      width: 100%;
      margin-top: 15px;
      justify-content: flex-start;
      align-items: center;

      > span {
        font-weight: normal;
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 0.02em;
        color: #696969;
        margin-right: 15px;
      }
    }

    .edit-theme__save {
      width: 160px;
      margin-top: 17px;

      &-button {
        width: auto;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FF9800;
        border-radius: 4px;
        cursor: pointer;

        > span {
          padding: 0 15px;
          color: #ffffff;
        }
      }
    }

    .active-save {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(146, 142, 144, 0.69);
        z-index: 5000;
      }
    }
  }
</style>
