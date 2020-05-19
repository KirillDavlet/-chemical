<template>
  <div class="list">
    <div class="list-title list-dropDown" @click="activeFlag()">
      <span class="list-dropDown">{{ label }}</span>
      <svg class="list-dropDown" :style="{transform: flagList ? 'rotate(180deg)' : ''}" width="24" height="24" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10L12 15L17 10H7Z" fill="#979797"/>
      </svg>
    </div>
    <div class="list-body list-dropDown" v-if="flagList">
      <div class="list-body__search list-dropDown"
           v-if="search">
        <div class="title-search list-dropDown">
          <span class="list-dropDown">Поиск</span>
        </div>
        <div class="search-form list-dropDown">
          <input type="text" v-model="searchList" class="list-dropDown">
          <svg class="list-dropDown" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.9649 11.2559H12.7549L17.7449 16.2559L16.2549 17.7459L11.2549 12.7559V11.9659L10.9849 11.6859C9.84488 12.6659 8.36488 13.2559 6.75488 13.2559C3.16488 13.2559 0.254883 10.3459 0.254883 6.75586C0.254883 3.16586 3.16488 0.255859 6.75488 0.255859C10.3449 0.255859 13.2549 3.16586 13.2549 6.75586C13.2549 8.36586 12.6649 9.84586 11.6849 10.9859L11.9649 11.2559ZM2.25488 6.75586C2.25488 9.24586 4.26488 11.2559 6.75488 11.2559C9.24488 11.2559 11.2549 9.24586 11.2549 6.75586C11.2549 4.26586 9.24488 2.25586 6.75488 2.25586C4.26488 2.25586 2.25488 4.26586 2.25488 6.75586Z"
                  fill="#70889E"/>
          </svg>
        </div>
      </div>
      <div class="list-body__empty list-dropDown" v-if="searchData.length === 0 || Object.keys(searchData).length === 0">
        <span>по вашему запросу ничего не найдено</span>
      </div>
      <div class="list-body__el list-dropDown"
           v-else
           v-for="(elObject, i ) in searchData"
           :key="i">
        <div class="list-body__el-arr list-dropDown" v-if="Array.isArray(dataList)" @click="choiceEl(elObject)">
          <div class="list-body__el-arr-check el-checked list-dropDown" v-if="listMulti">
            <svg v-if="choiceElementList.includes(elObject)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.2188L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.78125 12L9 16.2188Z" fill="red"/>
            </svg>
          </div>
          <div class="list-body__el-arr-info list-dropDown">
            <span>{{ nameField!=='' || elObject[nameField] !== undefined ? elObject[nameField] : elObject }}</span>
          </div>
        </div>
        <div class="list-body__el-obj list-dropDown" v-if="!Array.isArray(dataList) && typeof dataList === 'object'">
          <div class="list-body__el-obj-title list-dropDown">
            <span class="list-dropDown">{{ i }}</span>
          </div>
          <div class="list-body__el-obj-body list-dropDown">
            <div class="list-body__el-obj-body-el list-dropDown"
                 v-for="(el, i) in elObject"
                 :key="i" @click="choiceEl(el)">
              <div class="list-body__el-obj-body-el-check el-checked list-dropDown" v-if="listMulti">
                <svg class="list-dropDown" v-if="choiceElementList.includes(el)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.2188L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.78125 12L9 16.2188Z" fill="red"/>
                </svg>
              </div>
              <div class="list-body__el-obj-body-el-info list-dropDown">
                <span class="list-dropDown">{{ el }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-body__save list-dropDown list-dropDown" v-if="listMulti" @click="saveParent()">
        <span class="list-dropDown">Добавить</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "list",
        props: {
            // какой тип списка
            listMulti: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: 'выберите из списка'
            },
            dataList: {
                type: [Object, Array],
                default: () => {
                }
            },
            // поле отвечает, нужен ли поиск в компоненте
            search: {
                type: Boolean,
                default: false
            },
            // имя поля, по которому нужно выводит информацию в списке ( если сложный объект )
            nameField: {
                type: String,
                default: '',
            },
            // массив активных ( работает, если передаеться listMulty = true )
            activeListMulti: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            /**
             * метод по отдаче рабочего массива или объекта в зависимотси от поиска, если нужно
             * @returns {default.props.dataList|{default, type}|*}
             */
            searchData() {
                if (this.searchList !== '') {
                    if (Array.isArray(this.dataList)) {
                        return this.dataList.filter(el => {
                            if(this.nameField !== '' && el[this.nameField] !== undefined) {
                              return   String(el[this.nameField]).toLowerCase().includes(this.searchList.toLowerCase())
                            }
                            else {
                            return   String(el).toLowerCase().includes(this.searchList.toLowerCase())
                            }
                        });
                    } else if (!Array.isArray(this.dataList) && typeof this.dataList === 'object') {
                        let newObj = {};
                        for (let i in this.dataList) {
                            let nameList = [];
                            nameList = this.dataList[i].filter(el => String(el).toLowerCase().includes(this.searchList.toLowerCase()));
                            nameList.length > 0 ? newObj[i] = nameList : ''
                        }
                        return newObj
                    }
                } else {
                    return this.dataList
                }

            },
        },
        data() {
            return {
                flagList: false,
                searchList: '', // строка поиска, только по результатам
                choiceElementList: []
            }
        },
        watch: {
          flagList(data) {
              if(data) {
                  document.addEventListener('click', this.closeList, false)
              } else if(!data) {
                  document.removeEventListener('click', this.closeList, false)
              }
          }
        },
        methods: {
            // переключение скрыть / показать список
            activeFlag() {
                this.flagList = !this.flagList
            },
            /*
            сохранение данных из списка ( отправка родителю )
             */
            saveParent() {
                this.flagList = false;
                this.$emit('choice', this.choiceElementList);
                this.choiceElementList = [];
                this.searchList = ''
            },
            /**
             * выбор элемента ( если 1 , тогда отправка родителю )
             * @param title
             */
            choiceEl(title) {
                // выбор 1го
                if (!this.listMulti) {
                    this.choiceElementList = [];
                    this.choiceElementList.push(title);
                    this.saveParent()
                } else {
                    if (this.choiceElementList.includes(title)) {
                        this.choiceElementList.forEach((el, i) => el === title ? this.choiceElementList.splice(i, 1) : '');
                    } else {
                        this.choiceElementList.push(title)
                    }
                }
            },

            /**
             * метод закрытия выпдвющего меню
             * при клике на любую область
             * вешаетсья на документ
             */
            closeList(event) {
                if(!event.target.classList.contains('list-dropDown')) {
                    this.flagList = false
                }
            }

        },
        mounted() {
            if(this.listMulti && this.activeListMulti.length > 0) {
                this.choiceElementList = this.activeListMulti
            }
        },
        beforeUpdate() {
            if(this.listMulti && this.activeListMulti.length > 0) {
                this.choiceElementList = this.activeListMulti
            }
        },
    }
</script>

<style lang="less">
  .list {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    position: relative;

    &-title {
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      cursor: pointer;

      > svg {
        position: absolute;
        right: 15px;
        transition: .2s ease-in-out;
      }

      > span {
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.02em;
        color: #1E1E1E;
      }
    }

    &-body {
      width: 100%;
      height: auto;
      min-height: 35px;
      position: absolute;
      top: 40px;
      background: #FFFFFF;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      z-index: 1000;
      max-height: 300px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: .5em;
        height: .5em;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(146, 147, 147, 0.9);
      }

      &__empty {
        width: 100%;
        height: auto;
        padding: 12px 7px;
        box-sizing: border-box;

        > span {
          font-weight: normal;
          font-size: 14px;
          line-height: 21px;
          letter-spacing: 0.02em;
          color: #70889E;
        }
      }

      &__search {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 10px;

        > .title-search {
          width: 100%;
          height: 20px;
          margin-bottom: 5px;

          > span {
            font-weight: 500;
            font-size: .8em;
            line-height: 24px;
            letter-spacing: 0.02em;
            color: #70889E;
          }
        }

        > .search-form {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;

          > svg {
            position: absolute;
            right: 10px;
          }

          > input {
            box-sizing: border-box;
            width: 100%;
            height: 48px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border: none;
            background: #FFFFFF;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
            outline: none;
            padding: 0 25px 0 7px;
            border-radius: 4px;

            &:hover, &:active, &:focus {
              outline: none;
              border: none;
            }
          }
        }


      }

      &__el {
        width: 100%;
        display: flex;
        margin-bottom: 5px;
        min-height: 32px;
        cursor: pointer;

        > div {
          width: 100%;
        }

        &-arr {
          padding: 0 7px;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          &-info {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          > .el-checked {
            width: 20px;
            height: 20px;
            border: 1px solid gray;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }


          &:hover {
            background: lightblue;
          }

          > span {
            text-align: start;
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            letter-spacing: 0.15px;
            color: #1E1E1E;
          }
        }

        &-obj {
          display: flex;
          height: 100%;
          flex-direction: column;

          &-title {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;

            > span {
              color: #3E4E6C;
              font-size: .8em;
              padding-left: 14px;
              text-transform: uppercase;
            }

            &::after {
              content: '';
              width: 100%;
              height: 1px;
              background: #3e4e6c1f;
              position: absolute;
              bottom: 0;
            }
          }

          &-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;

            > div {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              padding: 0 7px;
              box-sizing: border-box;

              &:hover {
                background: rgba(62, 78, 108, 0.06);
              }

              &-info {
                > span {
                  font-weight: normal;
                  font-size: 12px;
                  line-height: 18px;
                  letter-spacing: 0.15px;
                  color: #1E1E1E;
                }
              }
              > .el-checked {
                width: 20px;
                height: 20px;
                border: 1px solid gray;
                margin-right: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
              }
            }
          }
        }


      }
    }
  }
</style>
