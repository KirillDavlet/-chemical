<template>
  <div id="layout" :class="classLayout">
    <slot></slot>
  </div>
</template>

<script>
    /**
     * Компонент LAYOUT
     * @param big -  boolean занимает 100% ширины , если ничего не передается, тогда стандартное значение
     * @param half - boolean занимает 50% ширины
     * @param third - boolean занимает 33% ширины
     * @param fourth - boolean занимает 25% ширины
     * @param padd - boolean стандарнтый отступ (padding: 5px 12px)
     * slot - вставляемый элемент
     * вызов компонента ПРИМЕР:
     *   <layout padd half>
     *       <slider navigation :data-info="sliderInfo"/>
     *   </layout>
     */
    export default {
        name: "layout",
        props: {
            big: {
                type: Boolean,
                default: false
            },
            half: {
                type: Boolean,
                default: false
            },
            third: {
                type: Boolean,
                default: false
            },
            fourth: {
                type: Boolean,
                default: false
            },
            padd: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                classLayout: '',
            }
        },
        methods: {
            sizeProps() {
                if (this.half) {
                    this.classLayout += ' layout__half'
                } else if (this.third) {
                    this.classLayout += ' layout__third'
                } else if (this.fourth) {
                    this.classLayout += ' layout__fourth'
                } else {
                    this.classLayout += ' layout__big'
                }
            },
            padding() {
                this.padd ? this.classLayout += ' standard-padding' : false
            },
            /**
             * метод инициализирует layout
             */
            initializationLayout() {
                this.padding();
                this.sizeProps();
            }
        },
        mounted() {
            this.initializationLayout()
        }
    }
</script>

<style lang="less">
  #layout {
    display: flex;
    height: auto;
    box-sizing: border-box;
    margin: 15px 0;
  }

  .layout__big {
    width: 100%;
  }

  .layout__half {
    width: 50%;
  }

  .layout__fourth {
    width: 25%;
  }

  .layout__third {
    width: calc(100% / 3);
  }

  .standard-padding {
    padding: 5px 12px;
  }
</style>
