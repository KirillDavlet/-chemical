<template>
    <div id="switchButton">
      <cm-toolbar :toolbar="switchData.name">
          <switch-toogle
            :fill="'inherit'"
            :name-switcher="switchData.name"
          />
      </cm-toolbar>
      <switch-menu
        :data-menu="switchData"
      />
    </div>
</template>

<script>
    import CmToolbar from "../toolbar/toolbar";
    import SwitchToogle from "./switchToogle";
    import SwitchMenu from "./switchMenu/switchMenu";

    import apiMessage from "./api/apiMessage";
    /**
     * @param props:
     *              - switch                       - объект с информацией по переклчюателю {name:'',title:'',sidebar:boolean}
     */
    export default {
        name: "switchButton",
        components: {SwitchMenu, SwitchToogle, CmToolbar},
        props: {
            switchData: {
                type:Object,
                default: ()=> {}
            }
        },
        data() {
            return {
                showMenu: false,
                dataMenu: null //Поле с информацией по переключателю
            }
        },
        computed: {
            state() {
                return this.$store.getters.SWITCHERMENU
            }
        },
        watch: {
            dataMenu(data) {
                console.log('обновление данных для блока')
                console.log(data)
            }
        },
        methods: {
            /**
             * метод получения сообщений ( для блока сообщения ) :TODO все ли сообщения нужно принимать?
             * обновление происходит каждую минуту
             */
            async getMessage() {
                const res = await apiMessage.getMessage(this.$store.getters.INFOUSER.id)
                if(res) {
                    if(res.data) {
                        this.$store.commit('SET_MESSAGEUSERALL', res.data.allMessage)
                    }
                } else {
                    console.log('сообщения не получены по каким то причинам ')
                }
                setTimeout(()=> {
                    this.getMessage()
                }, 60000)
            }
        },
        mounted() {
            this.switchData.name === 'message' ? this.getMessage() : false
        },
    }
</script>

<style lang="less">
#switchButton {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 7px;
}
</style>
