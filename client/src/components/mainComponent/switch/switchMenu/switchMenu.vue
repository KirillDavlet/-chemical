<template>
    <div id="switchMenu" :style="{transform: translateSidebar,
    background: themeActiveComp ? themeActiveComp.navigationBackground.background : '', color:themeActiveComp ? themeActiveComp.navigationBackground.color : ''}">
      <div class="label-switch-menu">
        <span>{{ _(dataMenu.name) }}</span>
      </div>
      <switch-menu-message
        v-if="dataMenu.name === 'message'"
      />
      <calendar
        v-if="dataMenu.name === 'calendar'"
      />
    </div>
</template>

<script>
    import SwitchMenuMessage from "./switchMEnuMessage/switchMenuMessage";
    import Calendar from "./switchMenuCalendar/calendar/calendar";
    /**
     * Компонент боковое меню
     * Выдвигаеться в зависимости от нажатия кнопки
     *
     * @param props :
     *               - dataMEnu                                    - данные по переключателю
     *               - flag                                        - флаг ( boolean ) открыт/закрыт
     *               - dataActions                                 - данные дял отображения
     */
    export default {
        name: "switchMenu",
        components: {Calendar, SwitchMenuMessage},
        props:{
            dataMenu: {
                type: Object,
                default: ()=> {}
            },
            flag: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            translateSidebar() {
                return this.$store.getters.SWITCHERMENU.find(el=> el.name === this.dataMenu.name).sidebar ? 'translateX(0)' : 'translateX(320px)'

            }
        },
    }
</script>

<style lang="less">
#switchMenu {
  position: absolute;
  right: 0;
  top: 0;
  width: 320px;
  height: calc(100vh - 45px);
  min-height: 100%;
  background: #FFFFFF;
  margin-top: 45px;
  transition: .2s ease-in-out;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }
  &::-webkit-scrollbar-thumb:hover {
    -webkit-box-shadow: inset 0 0 6px rgba(84, 148, 251, 0.73);
    border-radius: 10px;
  }
  > span {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
  }
  .label-switch-menu {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 500;
      font-size: 40px;
      line-height: 42px;
      letter-spacing: 0.1em;
    }
  }
}

</style>
