<template>
  <div id="unauthorized">
    <div
      v-if="activeRegister"
      class="unauthorized-user">
      <register
        v-if="registerAuth.register"
        @registerUser="registerData"
      />
      <authorization
        v-if="registerAuth.auth"
      />
    </div>
  </div>
</template>

<script>
    import Slider from "../slider/slider";
    import Register from "./register/register";
    import Authorization from "./authorization/authorization";
    import Layout from "../layout/layout";
    import Cm__selectionTestCard from "../testings/test-selection/cm__selection-test-card";

    export default {
        props: {
            dataInfo: Object,
            typeAuth: Object,
            cardTestings: Array
        },
        name: "unauthorized",
        components: {Cm__selectionTestCard, Layout, Authorization, Register, Slider},
        data() {
            return {
                registerAuth: {},
                cardTestingsData: []
            }
        },
        computed: {
            activeRegister() {
                for (let i in this.registerAuth) {
                    if (this.registerAuth[i]) return true
                }
            },
            cardTestingsCom() {
                return this.cardTestingsData
            }
        },
        methods: {
            /**
             * метод отправки влайга главному компоненту, для перехода на главную страницу
             * @param data
             */
            registerData(data) {
                this.$emit('registerUser',data)
            },
        },
        mounted() {
            this.cardTestingsData = this.cardTestings;
            this.registerAuth = this.typeAuth;
        },
        beforeUpdate() {
        }
    }
</script>

<style lang="less">
  #unauthorized {
    width: 100%;
    height: 100%;

    .unauthorized-info {
      width: 90%;
      margin: 0 5%;
      height: 100%;
    }
    .unauthorized-user {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
