<template>
    <div id="readAnswerMessage">
        <span>{{ dataForm }}</span>
    </div>
</template>

<script>
    export default {
        name: "readAnswerMessage",
        props: {
            dataForm: {
                type: Object,
                default: ()=> {}
            }
        }
    }
</script>

<style lang="less">
#readAnswerMessage {
  width: 600px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 0 4px 0 0;
  background: #70889E;
  position: absolute;
  height: 300px;
}
</style>
