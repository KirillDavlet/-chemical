<template>
    <div class="loader-image" >
      <img :src="imageSrc" alt="">
    </div>
</template>

<script>
    export default {
        name: "loader-image",
        props: ['imageSrc']
    }
</script>

<style lang="less">
.loader-image {

}
</style>
