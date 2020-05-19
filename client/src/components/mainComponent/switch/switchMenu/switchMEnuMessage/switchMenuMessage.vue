<template>
  <div id="switchMenuMessage">
    <div class="message-filter">
      <checked
        :active="newMessage"
        :label="'Все сообщения'"
        :label-active="'Новые сообщения'"
        @activeChecked="activeCheckedParrent"
      />
    </div>
    <div class="message-search">
      <search @search="searchData"/>
    </div>
    <div
      v-if="allMessage.length !== 0"
      v-for="(message, i) in allMessage"
      :class="[message.status === 0 ? 'message-all newMessage' : 'message-all', FIO === message.fio_from ? 'message-from-my' : 'message-from']"
      :key="`key-${i}`"
      :data-it-message="i"
    >
      <card-message
        :data-card-message="message"
        :iter-key="i"
        @readMessage="readMessageParent"
      />
    </div>
    <span v-if="newMessage && allMessage.length === 0">У вас нет новых сообщений</span>
  </div>
</template>

<script>
    import ReadAnswerMessage from "../../../readAnswerMessage/readAnswerMessage";
    import Checked from "../../../schecked/checked";
    import Search from "../../../../search/search";
    import CardMessage from "./cardMessage";

    export default {
        name: "switchMenuMessage",
        components: {CardMessage, Search, Checked, ReadAnswerMessage},
        data() {
            return {
                newMessage: true, //флаг отвечает показывать ли все сообщения или только новые true новый, false всек
                showFormMessage: true,
                searchTitle: '' //поле по поиску
            }
        },
        watch: {
            searchTitle(data) {
                console.log(data)
            }
        },
        methods: {
            readMessage(i) {
                let data = this.allMessage[i]
                if (data.status === 0) {
                    console.log('сообщение новое ')
                    this.$store.dispatch('CHANGE__STATUSMESSAGE', data.id)
                }
            },
            /**
             * Метод обработки фильтрования сообщений ( новые, все )
             */
            activeCheckedParrent(data) {
                this.newMessage = data
            },
            searchData(data) {
                this.searchTitle = data.search
            },
            /**
             * обработка ответа на сообщение и убираю класс новый
             * @param data
             */
            readMessageParent(data) {
                this.readMessage(data)
            }
        },
        computed: {
            allMessage() {
                let filterArray = []
                if (this.newMessage) {
                    filterArray = this.$store.getters.MESSAGEUSER.filter(el => el.status === 0)
                } else {
                    filterArray = this.$store.getters.MESSAGEUSER
                }
                //сортировка по дате
                filterArray = filterArray.sort((a,b)=> {
                    return new Date(b.date) - new Date(a.date)
                })
                //по поиску дополнительно
                if (this.searchTitle !== '') {
                    if(this.searchTitle.toLowerCase() === 'меня') this.searchTitle = this.$store.getters.INFOUSER.firstName +' '+ this.$store.getters.INFOUSER.nameUser+' ' +this.$store.getters.INFOUSER.lastName
                    return filterArray.filter(el => {
                        return el.fio_from.includes(this.searchTitle)
                    })
                }
                return filterArray
            },
            labelChecked() {
                return this.newMessage ? 'показать новые сообщения' : 'показать все сообщения'
            },
            /**
             * инициалы пользователя
             * @returns {string}
             * @constructor
             */
            FIO() {
                return this.$store.getters.INFOUSER.firstName +' '+ this.$store.getters.INFOUSER.nameUser+' ' +this.$store.getters.INFOUSER.lastName
            },
        },

    }
</script>

<style lang="less">

  @colorMessageNew: rgba(55, 255, 175, 0.78);
  @colorMessageMy: rgba(212, 251, 237, 0.44);

  #switchMenuMessage {
    color: black;
    overflow: auto;
    height: 100%;
    padding: 0 7px 10px 0;
    position: relative;

    .message-filter {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
    }

    .message-search {
      margin: 5px 0 10px 0;

      > div {
        max-width: 100% !important;
        background: #e8e8e8 !important;
      }
    }

    > .message-all {
      width: 95%;
      min-height: 35px;
      padding: 5px 12px;
      display: flex;
      margin-bottom: 5px;
      flex-direction: column;
      justify-content: center;
      background: #D4E3FB;
      border-radius: 4px;
      position: relative;
      cursor: pointer;

    }

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #93a7a9;
      outline: 1px solid #eef7fe;
    }
  }

  .newMessage {
    background-color:@colorMessageNew !important;
    &:before {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 19px;
      content: 'NEW';
      font-size: 15px;
      border-radius: 0 0 8px 8px;
      background: #39B24A;
      text-align: center;
    }
  }

  .message-from {
    right: -5%;
  }

  .message-from-my {
    background: @colorMessageMy !important;
  }
</style>
