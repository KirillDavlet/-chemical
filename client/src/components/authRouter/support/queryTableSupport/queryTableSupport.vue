<template>
  <div id="queryTableSupport">
    <div class="query-table-support__title">
      <span>Техническая поддержка</span>
    </div>
    <div class="body-support">
      <MC__table
        v-if="supportMessage.length > 0"
        :data-table="supportMessage"
        :name-table="dataDB"
        :title-table="'support'"
        :number-row="10"
        :settings="['просмотреть','удалить','ответить','изменить статус']"
        :title-checked="['resolved issues','all questions']"
      />
      <span v-else>Извините, но на данный момент нет обращений</span>
    </div>
  </div>
</template>

<script>
    import getDataSupport from "../apiSupport/getDataSupport/getDataSupport";
    import MC__table from "../../../mainComponent/SystemTable/table/MC__table";

    export default {
        name: "queryTableSupport",
        components: {MC__table},
        data() {
            return {
                supportMessage: [],
                dataDB: {}
            }
        },
        methods: {
            /**
             * функция запроса на дерево хранилища (данных по хранилищу )
             */
            async getData() {
                const res = await getDataSupport.getDataSupport(
                    this.$store.getters.INFOUSER.id,
                    this.$store.getters.INFOUSER.userInfo.login,
                    this.$store.getters.INFOUSER.userInfo.pass,
                );
                if (res.status !== 200) console.log('ошибка')
                if (res.data) {
                    this.$store.commit('SET_ALERTARRAY', {
                        message: res.data.message,
                        type: res.data.typeMessage
                    });
                    this.supportMessage = res.data.dataMessage;
                    this.dataDB = res.data.dataDB

                }
            },
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style lang="less">
  #queryTableSupport {
    width: 100%;
    height: auto;
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-family: Roboto, sans-serif;

    .query-table-support__title {
      width: 100%;
      height: auto;
      padding: 7px 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > span {
        font-style: normal;
        font-weight: 300;
        font-size: 34px;
        line-height: 32px;
        letter-spacing: 0.02em;
        color: #2A2A2A;
      }
    }

    .body-support {
      padding: 7px 15px;
      width: 100%;
      height: auto;
    }

  }


</style>
