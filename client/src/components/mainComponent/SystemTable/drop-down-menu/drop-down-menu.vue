<template>
  <div
    id="dropDownMenu"
    :style="{left:position.x, top:position.y, background: themeActiveComp.workspaceBackground.background}">
    <div
      v-for="action in settings"
      @click="actionsDDM($event, action)"
    >
      <span :style="{color:  themeActiveComp.workspaceBackground.color}">{{ action }}</span>
    </div>
  </div>
</template>

<script>
  /**
   * КОМПОНЕНТ ВЫПАДАЮЩЕГО МЕНЮ
   *
   *
   *     РАБОТА КОМПОНЕНТА
   *
   *
   * @param props:
   *              - positionDDM                                 - координаты выпадающег оменю
   *              - dataDDM                                     - список настроек с конфигурацией что делать
   *              - actions                                     - список что делаем
   *
   */
  export default {
    name: "drop-down-menu",
    props: {
      positionDDM: {
        type: Object, default: () => {
          return {x: 0, y: 0}
        }
      },
      dataDDM: {
        type: Object,
        default: () => {
        }
      },
      settings: {type: Array, default: () => []}
    },
    computed: {
      /**
       * геттер активной темы
       * @returns {default.computed.ACTIVETHEME|(function())}
       * @constructor
       */
      style() {
        // return this.$store.getters.ACTIVETHEME
      },
      position() {
        return {
          x: this.positionDDM.x + 'px',
          y: this.positionDDM.y + 'px',
        }
      },
    },
    methods: {
      actionsDDM(event, action) {
        this.$emit('actionDDM', {
          action: action,
          el: this.dataDDM,
          position: {
            x: event.clientX,
            y: event.clientY,
          }
        })
      }
    }
  }
</script>

<style lang="less">
  #dropDownMenu {
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2), 0 6px 30px rgba(0, 0, 0, 0.12);
    background: #ffffff;
    border-radius: 4px;
    position: absolute;
    z-index: 500;
    min-height: 35px;
    min-width: 100px;
    transition: .2s ease-in-out;

    > div {
      min-height: 45px;
      width: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 2px 5px;
      cursor: pointer;

      > span {
        color: inherit;
        padding: 0 14px;
        text-decoration: none;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
      }
    }

    > div:hover {
      background: #d7deda;
    }
  }
</style>
