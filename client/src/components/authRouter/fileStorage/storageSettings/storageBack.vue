<template>
  <div
    title="вернуться назад"
    id="storageBack"
    @click="backStorage">
    <arrow
      style="transform: rotate(180deg); cursor: pointer; margin: 0 5px"
    />
    <!--      <span>назад</span>-->
  </div>
</template>

<script>
    import Arrow from "../../../icon/arrow";
    export default {
        name: "storageBack",
        components: {Arrow},
        methods: {
            backStorage() {
                this.$emit('back', true)
            }
        }
    }
</script>

<style scoped>

</style>
