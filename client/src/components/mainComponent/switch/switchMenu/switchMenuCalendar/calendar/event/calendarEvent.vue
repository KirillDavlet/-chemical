<template>
  <div id="calendarEvent">

    <div class="calendar-event__description">
      <span :style="{textDecoration: dataEvent.status === 1 ? 'line-through' : ''}">{{ dataEvent.description }}</span>
    </div>
    <div class="calendar-event__settings">
      <cm-toolbar
        :size="16"
        :toolbar="textToolbar">
        <checked-radio
          :checked="dataEvent.reminder  === 1 ? true : false"
          @activeFlag="activeFlagParent"
        />
      </cm-toolbar>
      <cm-toolbar
        :size="16"
        :toolbar="textDone">
        <checked-radio
          :checked="dataEvent.status  === 1 ? true : false"
          @activeFlag="doneEventsUser"
          :color="['#1fe23d','#989898']"
        />
      </cm-toolbar>
      <cm-toolbar
        :size="16"
        :toolbar="_('delete')">
        <div class="delete-event" @click="deleteEventsUser"><span>-</span></div>
      </cm-toolbar>
    </div>
  </div>
</template>

<script>
    import CmToolbar from "../../../../../toolbar/toolbar";
    import CheckedRadio from "../../../../../checkedRadio/checkedRadio";

    export default {
        name: "calendarEvent",
        components: {CheckedRadio, CmToolbar},
        props: {
            // вся информация по событию
            dataEvent: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                activeReminder: false,
                activeStatus: false
            }
        },
        computed: {
           textToolbar() {
               return this.dataEvent.reminder === 1 ? this._('turn off reminder') : this._('enable reminder')
           },
            textDone() {
                return this.dataEvent.status === 1 ? this._('performed') : this._('not')+' '+this._('performed')
            }
        },
        methods: {
            /**
             * обработка активация/деактивация
             * отправка родителю параметра
             */
            activeFlagParent(data) {
                this.$emit('activeReminder', {reminder:data, idEvent: this.dataEvent.id})
            },
            /**
             * метод отправки запроса на удаления ( родителю )
             */
            deleteEventsUser() {
                this.$emit('deleteEvents', this.dataEvent.id)
            },
            /**
             * метод изменения выполнено/невыполнено событие
             * :TODO пока не пропишу проверки н запрет изменения предыдущих событий
             */
            doneEventsUser(data) {
              this.$emit('doneEvents', {status: data, idEvent: this.dataEvent.id})
            }
        },
        mounted() {
            this.activeReminder = this.dataEvent.reminder;
            this.activeStatus = this.dataEvent.status;
        },
    }
</script>

<style lang="less">
  #calendarEvent {
    width: 100%;
    height: auto;
    min-height: 35px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgba(198, 198, 201, 0.61);
    margin: 8px 0;
    color: inherit;

    .calendar-event__description {
      width: 70%;
      > span {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.02em;
      }
    }

    .calendar-event__settings {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .delete-event {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #ff3d5a;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          font-size: 22px;
          margin-top: -4px;
        }
      }

    }
  }
</style>
