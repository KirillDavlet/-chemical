<template>
  <div class="classifiers-group"
  >
    <div class="classifiers-group__overflow"
         v-if="Object.keys(dataClassifiers).length > 0"
         v-for="(group, i) in dataClassifiers"
         :key="i">
      <div class="classifiers-group__overflow-title"
           @click="activeGroupEvent(i)">
        <div class="classifiers-group__overflow-title-icon">
          <svg v-if="activeGroup === i" width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.0156 18V8.01562H3.98438V18H20.0156ZM20.0156 6C20.5469 6 21 6.20312 21.375 6.60938C21.7812 7.01562 21.9844 7.48438 21.9844 8.01562V18C21.9844 18.5312 21.7812 19 21.375 19.4062C21 19.8125 20.5469 20.0156 20.0156 20.0156H3.98438C3.45312 20.0156 2.98438 19.8125 2.57812 19.4062C2.20312 19 2.01562 18.5312 2.01562 18V6C2.01562 5.46875 2.20312 5 2.57812 4.59375C2.98438 4.1875 3.45312 3.98438 3.98438 3.98438H9.98438L12 6H20.0156Z"
              fill="#666666"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.98438 3.98438L12 6H20.0156C20.5469 6 21 6.20312 21.375 6.60938C21.7812 7.01562 21.9844 7.48438 21.9844 8.01562V18C21.9844 18.5312 21.7812 19 21.375 19.4062C21 19.8125 20.5469 20.0156 20.0156 20.0156H3.98438C3.45312 20.0156 2.98438 19.8125 2.57812 19.4062C2.20312 19 2.01562 18.5312 2.01562 18V6C2.01562 5.46875 2.20312 5 2.57812 4.59375C2.98438 4.1875 3.45312 3.98438 3.98438 3.98438H9.98438Z"
              fill="#666666"/>
          </svg>
        </div>
        <div class="classifiers-group__overflow-title-name">
          <div><span>{{ i }}</span></div>
          <div @click="deleteGroupClassifiers(i)"><icon__delete /></div>
        </div>
      </div>
      <transition name="groupElClassifiers">
        <div class="classifiers-group__overflow-body"
             v-if="i === activeGroup">
          <div class="classifiers-group__overflow-body-new button-new">
            <span @click="addNewClassifiers()">создать новый классификатор</span>
          </div>
          <div v-if="newClassifiers.flag">
            <input type="text" v-model="newClassifiers.title">
            <span @click="addNewClassifiersSave()">добавить +++</span>
          </div>
          <div class="classifiers-group__overflow-body__el"
               v-if=" group.length > 0"
               v-for="(elGroup, grI) in group"
               :key="grI"
               :style="{background: elGroup.id === activeElId ? '#8080802b' : ''}"
               @click="activeElIDGroup(elGroup.id)">
            <div>
              <span>{{ elGroup.name}}</span>
            </div>
            <div>
              <span @click="deleteClassifiers(elGroup.id)"><icon__delete /></span>
            </div>
          </div>
          <div v-if=" group.length === 0">
            <span>пока что ничего нет</span>
          </div>
        </div>
      </transition>
    </div>
    <span v-if="Object.keys(dataClassifiers).length === 0">ничего не найдено</span>
    <div class="classifiers-group__add">
      <div class="classifiers-group__add-new button-new">
        <span @click="addNewClassifiersGroup()">создать новую группу классификаторов</span>
      </div>
      <div class="classifiers-group__add-form"
           v-if="newClassifiersGroup.flag">
        <input type="text" v-model="newClassifiersGroup.title">
        <span @click="addNewClassifiersGroupSave()">сохранить</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon__delete from "../../../../icon/iconDelete";
  export default {
    name: "classifiersGroup",
    components: {Icon__delete},
    props: {
      // сортированный объект классификаторов по группам
      dataClassifiers: {
        type: Object,
        default: () => {
        }
      },
    },
    data() {
      return {
        activeGroup: null, // активная группа
        activeElId: null, // активный элемент группы
        newClassifiersGroup: {
          flag: false,//флаг за отображение блока по созданию нового классификатора
          title: '' // название классификатора
        },
        // данные по классфикатору ( уже в группе будет создлаваться )
        newClassifiers: {
          flag: false,
          title: ''
        }
      }
    },
    methods: {
      /**
       * выбор группы
       */
      activeGroupEvent(title) {
        this.activeGroup === title ? this.activeGroup = null : this.activeGroup = title
      },
      /**
       *  выбор активного элемента группы
       * @param id
       */
      activeElIDGroup(id) {
        this.activeElId === id ? this.activeElId = null : this.activeElId = id
      },
      /**
       * метод по созданию новой группы классификаторов
       */
      addNewClassifiersGroup() {
        this.newClassifiersGroup.flag = !this.newClassifiersGroup.flag;
      },
      /**
       * метод по сохранению новой группы классификаторов ( save in server )
       */
      addNewClassifiersGroupSave() {
        this.$store.dispatch('ADD_classifiersGroup', {name: this.newClassifiersGroup.title});
        this.newClassifiersGroup.flag = false;
        this.newClassifiersGroup.title = '';
      },

      /**
       * метод удаления группы классификаторов
       */
      deleteGroupClassifiers(i) {
        let deleteActive = confirm('вы уверены что хотите удать группу классификаторов, при удалении все классификаторы перейдут в блок другое')
        if(deleteActive) {
          this.$store.dispatch('DELETE_сlassifiersGroup', i);
        }
      },

      ///////////////////// работа непосредственно с классифйиктаорами
      /**
       * метод начала создания нового классификатора ( отображение блока )
       */
      addNewClassifiers() {
        this.newClassifiers.flag = !this.newClassifiers.flag
      },
      /**
       * сохранение классификтаора в группе классификаторов ( нга сервере )
       */
      addNewClassifiersSave() {
        let options = {
          group: this.activeGroup,
          title: this.newClassifiers.title
        };
        this.$store.dispatch('ADD_classifiers', options);
        this.newClassifiers.flag = false;
        this.newClassifiers.title = '';
      },
      /**
       * метод удаления классификатора
       */
      deleteClassifiers(id) {
        this.$store.dispatch('DELETE_classifiers', id)
      },
      /**
       * :TODO НЕДОПИСАННЫЙ ПОКА ЧТО
       * метод трансопртировки из 1 группы в другую
       * данный метод будет работать на drag and droppe при перетаскивании на новую группу и при зажатии элемента этой группы
       */
      transferInGroup() {
        let options = {
          classifiers: [].push(this.activeElId),
          groupName: this.activeGroup
        };
        this.$store.dispatch('TRANSFER_classifierInGroup', options)
      },
    },
  }
</script>

<style lang="less">
  .classifiers-group {
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 15px;

    &__overflow {
      width: 100%;
      min-height: 35px;
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;

      &:not(:last-child) {
        margin-bottom: 7px;
      }

      &-title {
        width: 100%;
        min-height: 35px;
        display: flex;
        align-items: center;

        &-icon {
          width: 35px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &-name {
          width: 150px;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-left: 15px;
          > div:first-child {
            width: 85%;
          }
          > div:last-child {
            width: 15%;
          }
        }
      }

      &-body {
        width: 100%;
        height: auto;
        padding-left: 48px;

        &__el {
          min-height: 30px;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          > div:first-child {
            width: 80%;
            max-width: 450px;
          }
          > div:last-child {

          }
        }
      }
    }
    .button-new {
      max-width: 400px;
      padding: 0 7px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid lightgray;
      cursor: pointer;
      > span {

      }
    }

    &__add {
      margin-top: 15px;
      &-form {
        > input {
          height: 35px;
          border-bottom: 1px solid #BEBEBE;
          color: #1e1e1e;
          padding: 0 7px;
          &:hover,&:active,&:focus {
            border-bottom: 1px solid #BEBEBE;
            outline: none;

          }
        }
      }
    }
  }

  .groupElClassifiers-enter-active, .groupElClassifiers-leave-active {
    transition: opacity .5s;
  }

  .groupElClassifiers-enter, .groupElClassifiers-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
