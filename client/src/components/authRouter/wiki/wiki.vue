<template>
  <div id="wiki" >
    <div class="wiki">
      <div class="wiki__header">
        <span>WIKI</span>
      </div>
    </div>
  </div>
</template>

<script>
    import getWIKI from "./api/get/getWIKI";

    export default {
        name: "wiki",
        methods: {
            async GET__wiki() {
                this.$store.commit('SET_LOADER', true)
                const res = await getWIKI.getWIKI(this.$store.getters.INFOUSER.id, this.$store.getters.INFOUSER.role);
                if(res) {
                    if(res.data.status) {

                    } else {
                        this.$router.push(`/${this.$store.getters.INFOUSER.id}`) //воврат а главный экран
                    }

                    this.$store.commit('SET_LOADER', false)
                    this.$store.commit('SET_ALERTARRAY', {status:res.data.status, message:res.data.message, type:res.data.typeMessage})
                }
            }
        },
        mounted() {
            this.GET__wiki()
        }
    }
</script>

<style lang="less">
#wiki {
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
  }
}
</style>
