<template>
  <div class="card-preview">
    <img :id="`img-${iteration}`" alt="предпросмотр">
    <div class="modal-settings-body__img-container-img__settings">
      <div class="modal-settings-body__img-container-img__settings-name">
        <span>{{ el.name }}</span>
      </div>
      <div class="modal-settings-body__img-container-img__settings-delete" @click="deleteImg(i)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.6" cx="8" cy="8" r="8" fill="#51565F"/>
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M11.6 5.2C11.8209 4.97909 11.8209 4.62091 11.6 4.4V4.4C11.3791 4.17909 11.0209 4.17909 10.8 4.4L8 7.2L5.2 4.4C4.97909 4.17909 4.62091 4.17909 4.4 4.4V4.4C4.17909 4.62091 4.17909 4.97909 4.4 5.2L7.2 8L4.4 10.8C4.17909 11.0209 4.17909 11.3791 4.4 11.6V11.6C4.62091 11.8209 4.97909 11.8209 5.2 11.6L8 8.8L10.8 11.6C11.0209 11.8209 11.3791 11.8209 11.6 11.6V11.6C11.8209 11.3791 11.8209 11.0209 11.6 10.8L8.8 8L11.6 5.2Z"
                fill="white"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cardPhotoPreview",
        props: {
            dataPhoto: {
                type: [Object, Array, File],
                default: () => {
                }
            },
            iteration: {
                type: Number,
                default: null
            }
        },
        methods: {
            deleteImg(i) {
                this.$emit('deleteImg', i)
            }
        },
    }
</script>

<style lang="less">

</style>
