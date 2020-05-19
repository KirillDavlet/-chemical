<template>
  <div id="newEvent" :style="{color: themeActiveComp ? themeActiveComp.navigationBackground.color : '#1e1e1e'}">
    <div class="new-event">
      <div class="new-event-theme">
        <input
          :style="{border: errorForm ? '1px solid #c70c0c' : '1px solid rgba(211, 211, 211, 0.72)',
          color: themeActiveComp ? themeActiveComp.navigationBackground.color : '#1e1e1e',
          background: themeActiveComp ? themeActiveComp.navigationBackground.background : '#ffffff'}"
          type="text"
          v-model="descriptionEvent"
          :placeholder="_('tasks') + ' - '+ _('events')"
          @keydown.enter="saveNewEvent"
        >
      </div>
      <div class="new-event-reminder">
        <cm-toolbar :toolbar="_('reminder the day before the event')">
          <span>{{ _('enable reminder') }} ? </span>
        </cm-toolbar>
        <checked-radio
          :checked="activeReminder"
          @activeFlag="activeFlagParent"
        />
      </div>
      <div class="new-event-save" @click="saveNewEvent">
        <span>{{ _('save') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
    import Fm__form from "../../../../../../form/form";
    import CmToolbar from "../../../../../toolbar/toolbar";
    import CheckedRadio from "../../../../../checkedRadio/checkedRadio";

    /**
     * Компонент нового события
     */
    export default {
        name: "newEvent",
        components: {CheckedRadio, CmToolbar, Fm__form},
        data() {
            return {
                activeReminder: false, //флаг отвечающий за, автино и напоминание, по default """""false"""""
                descriptionEvent: '', //описание события
                errorForm: false
            }
        },
        methods: {
            /**
             * метод активации/деактивации флага по напоминанию
             * @param data
             */
            activeFlagParent(data) {
                this.activeReminder = data
            },
            /**
             * метод сохранения новго события
             */
            saveNewEvent() {
                if (this.descriptionEvent === '') {
                    this.errorForm = true
                } else {
                    this.errorForm = false;
                    this.$emit('saveNewEvent', {
                        description: this.descriptionEvent,
                        activeReminder: this.activeReminder,
                    })

                }
            }
        }
    }
</script>

<style lang="less">
  #newEvent {
    width: 100%;
    margin-top: 12px;

    .new-event {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-theme {
        width: 100%;

        > input {
          width: 100%;
          height: 30px;
          background: #FFFFFF;
          padding: 5px;
        }

        > span {
        }
      }

      &-reminder {
        display: flex;
        margin-top: 12px;

        > div {
          margin-left: 15px;
        }
      }

      &-save {
        width: auto;
        height: 35px;
        border-radius: 4px;
        background: #ff9800;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 7px;
        margin-top: 12px;
        cursor: pointer;

        > span {
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 0.16px;
        }
      }
    }
  }
</style>
