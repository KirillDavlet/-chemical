<template>
    <div id="reminderInfo">
      <div class="reminder-info__today">
          <span
            v-for="(event, i) in dataEvents.today" :key="i"
            :style="{marginLeft: 15*i+'px'}"
          >
            <i>-</i>
            {{ event.description }}
          </span>
      </div>
      <div class="reminder-info__tomorrow">
        <span
          v-for="(event, i) in dataEvents.tomorrow"
          :style="{marginLeft: 15*i+'px'}"
          :key="i">
          <i>-</i>
            {{ event.description }}
          </span>
      </div>
    </div>
</template>

<script>
    /**
     * компонент отображения событий (по группам, сегодня , завтра , и следующие дни сколькько хочу) :TODO позаботиться о актуальных событиях дома !!!!!!!!!!!!!!!!!!!!!!
     */
    export default {
        name: "reminderInfo",
        props: {
            // объект актиных событий
            dataEvents: {
                type: Object,
                default: () => {
                    return {
                        today: [
                            {description:'доделать компонент по оповещению 1',date:''},
                            {description:'доделать компонент по оповещению 2',date:''},
                            {description:'доделать компонент по оповещению 3',date:''},
                            {description:'доделать компонент по оповещению 4',date:''},
                        ],
                        tomorrow: [
                            {description:'доделать компонент по оповещению 1-1',date:''},
                            {description:'доделать компонент по оповещению 1-2',date:''},
                            {description:'доделать компонент по оповещению 1-3',date:''},
                            {description:'доделать компонент по оповещению 1-4',date:''}
                        ]
                    }
                }
            }
        },
        computed: {

        }
    }
</script>

<style lang="less">
  #reminderInfo {
    width: 100%;
    height: 100%;
    padding: 0 5%;
    display: flex;
    opacity: 0;
    transform: translateX(-50px);
    animation: displayReminderInfo .6s ease-in-out forwards;
    > div {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      position: relative;
      > span {
        margin-bottom: 12px;
        > i {
          margin-right: 5px;
        }
      }
    }
  }

  @keyframes displayReminderInfo {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
