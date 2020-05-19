<template>
  <div id="switchToogle"
       :data-type="nameSwitcher"
       @click="actionsSwitch">
    <icon-alerts
      :fill="'inherit'"
      v-if="nameSwitcher === 'alerts'"/>
    <icon-calendar
      :fill="'inherit'"
      v-if="nameSwitcher === 'calendar'"/>
    <icon-message
      :fill="'inherit'"
      v-if="nameSwitcher === 'message'"
    />
  </div>
</template>

<script>
    import IconAlerts from "./iconSwitch/iconAlerts";
    import IconCalendar from "./iconSwitch/iconCalendar";
    import IconMessage from "./iconSwitch/iconMessage";

    import apiMessage from "./api/apiMessage";

    export default {
        name: "switchToogle",
        components: {IconMessage, IconCalendar, IconAlerts},
        props: {
            nameSwitcher: {type: String, default: ''},
            dataSwitcher: {
                type: [Array, Object, null],
                default: null
            }
        },
        data() {
            return {
                allMessage: []
            }
        },
        methods: {
            /**
             * метод открытия бокового меню
             */
            actionsSwitch() {
                this.$store.commit('SET_MENUINFOUSER',false);
                let numberMenu = null;
                this.$store.getters.SWITCHERMENU.find((el, i)=> {
                    if(el.name === this.$el.dataset.type) numberMenu = i
                })
                this.$store.commit('SET_SWITCHMENUACTIVE', numberMenu)
            },
        },
    }
</script>

<style lang="less">
  #switchToogle {
    > div {
      > svg {
        fill: #FFFFFF;
      }
    }

    &:hover {
      > div {
        > svg {
          fill: #FF4565;
        }
      }
    }
  }
</style>
