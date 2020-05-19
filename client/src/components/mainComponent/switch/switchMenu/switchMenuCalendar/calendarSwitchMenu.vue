<template>
    <div id="calendarSwitchMenu">
      <calendar />
    </div>
</template>

<script>
    import Calendar from "./calendar/calendar";
    export default {
        name: "calendarSwitchMenu",
        components: {Calendar},
        props: {},
        data(){return {}},
        computed: {

        }
    }
</script>

<style lang="less">
#calendarSwitchMenu {
  width: 100%;
  height: 100%;
  max-width: 350px;
}
</style>
