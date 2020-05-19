<template>
  <div id="cm__header">
    <div class="logo"></div>
    <div class="navigation">
      <div
        v-if="typeof dataHeader === 'object'"
        v-for="item in dataHeader"
        :data-type="item.ref"
        @click="notAuthorized"
      >
        <span >{{ item.title }}</span>
      </div>
      <div
        v-if="typeof dataHeader === 'array'"
        v-for="item in dataHeader">
        <a :href="item.link"><span>{{ item.name }}</span></a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            dataHeader: Object || Array
        },
        name: "cm__header",
        methods: {
            notAuthorized(e) {
                this.$emit('typeAuth',e.currentTarget.dataset.type)
            }
        },
        mounted() {

        }
    }
</script>

<style lang="less">
  #cm__header {
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #2574CF;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
    position: relative;
    z-index: 99;

    .logo {
      width: 20%;
    }

    .navigation {
      min-width: 50%;
      display: flex;
      justify-content: end;
      margin-right: 5%;

      > div {
        margin: 0 15px;
        cursor: pointer;
        > span {
          color: #FFFFFF;
        }
      }
    }
  }
</style>
