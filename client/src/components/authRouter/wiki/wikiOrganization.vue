<template>
    <div id="wikiOrganization">
      <div class="wiki">
        <div class="wiki__header">
          <span>Информация по организации</span>
        </div>
        <div class="wiki__body">
          <span>{{ stubData.title }}</span>
        </div>
      </div>
    </div>
</template>

<script>
   import getOrganization from "./api/get/getOrganization";
    export default {
        name: "wikiOrganization",
        data() {
            return {
                stubData: {
                    title: `на этой странице отображается информация по внутренней жизни компании ( предприятия )`
                }
            }
        },
        methods: {
            async getData() {
                const res = await getOrganization.getOrganization(
                    this.$store.getters.INFOUSER.id,
                    this.$store.getters.INFOUSER.userInfo.login,
                    this.$store.getters.INFOUSER.userInfo.pass,
                )
                if (res.status !== 200) console.log('ошибка')
                if (res.data) {
                    this.$store.commit('SET_ALERTARRAY', {
                        message: res.data.message,
                        type: res.data.typeMessage
                    });
                }
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style lang="less">
  #wikiOrganization {
    width: 100%;
    height: auto;
    margin-top: 45px;
    .wiki {
      width: 100%;
      height: 100%;
      &__header {
        width: 100%;
        height: 50px;
        > span {
          padding: 5px 15px;
          font-size: 36px;
          color: black;
          letter-spacing: 0.02em;

        }
      }
      &__body {
        width: 100%;
        height: auto;
        padding: 5px 15px;
        > span {
          font-size: 24px;
        }
      }
    }
  }
</style>
