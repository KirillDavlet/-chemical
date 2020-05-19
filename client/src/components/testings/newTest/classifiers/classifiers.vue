<template>
  <div class="classifiers">
    <div class="classifiers-body">
      <div class="classifiers-body-group">
        <div class="classifiers-body-group__search">
          <search @search="searchParent"/>
        </div>
        <classifiers-group
          :data-classifiers="classifiers"
        />
      </div>
      <div class="classifiers-body-settings"></div>
    </div>
  </div>
</template>

<script>
    import ClassifiersGroup from "./group/classifiersGroup";
    import Search from "../../../search/search";

    export default {
        name: "classifiers",
        components: {Search, ClassifiersGroup},
        computed: {
            get_classifiers() {
                return this.$store.getters.get_classifiers
            },
            // возврат классификаторов с применением сортиповки по группам
            classifiers() {
                let classifiersGroupSort = {};
                if (this.searchClassifiers === '') {
                    for (let classifier in this.get_classifiers) {
                        if (classifiersGroupSort[classifier] === undefined) {
                            classifiersGroupSort[classifier] = [];
                        }
                        classifiersGroupSort[classifier] = this.get_classifiers[classifier].slice()
                    }
                }
                else {
                    for (let classifier in this.get_classifiers) {
                        if (classifiersGroupSort[classifier] === undefined &&
                            (classifier.includes(this.searchClassifiers) || this.get_classifiers[classifier].find(el => el.name.includes(this.searchClassifiers)) !== undefined)) {
                            classifiersGroupSort[classifier] = [];
                            this.get_classifiers[classifier].forEach(el => {
                                el.name.includes(this.searchClassifiers) ? classifiersGroupSort[classifier].push(el) : ''
                            })
                        }
                        else {
                            if (classifier.includes(this.searchClassifiers) || this.get_classifiers[classifier].find(el => el.name.includes(this.searchClassifiers)) !== undefined) {
                                this.get_classifiers[classifier].forEach(el => {
                                    el.name.includes(this.searchClassifiers) ? classifiersGroupSort[classifier].push(el) : ''
                                })
                            }
                        }
                    }
                }
                return classifiersGroupSort
            },
        },
        data() {
            return {
                searchClassifiers: ''
            }
        },
      methods: {
        /**
         * обработка ввода символов ( поиск )
         * @param data
         */
        searchParent(data) {
          this.searchClassifiers = data.search;
        }
      }
    }
</script>

<style lang="less">
  .classifiers {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-header {
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 15px;

      > span {
        font-size: 12px;
        color: #1e1e1e;
        font-weight: 500;
      }
    }

    &-body {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: nowrap;

      > div {
        width: 50%;
        height: 100%;
      }

    }
  }
</style>
