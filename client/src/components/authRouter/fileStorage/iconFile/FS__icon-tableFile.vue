<template>
  <div id="fsIcontableFile">
    <svg :width="size" :height="size" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M38 0L63.3333 25.3333V67.1333C63.3333 72.0303 59.3636 76 54.4667 76H8.86667C3.96974 76 0 72.0303 0 67.1333V8.86667C0 3.96974 3.96974 0 8.86667 0H38Z" :fill="fill"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M63.333 25.332H47.3142C42.4172 25.332 37.9997 20.9145 37.9997 16.0175V-0.00130463L63.333 25.332Z" fill="white" fill-opacity="0.4"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M37.9757 31.6999V31.6797H12.6742V33.7881H12.679V37.9308H12.6738V40.0393H12.679V46.4093H12.6738V48.5177H12.679V54.8878H12.679V56.9962H12.679V57.0011H14.7875V56.9962H21.1414V56.9997H23.2498V56.9962H27.4242V56.9997H29.5327V56.9962H35.8717V57.0014H37.9802V56.9962H37.9805V54.8878H37.9802V31.6999H37.9757ZM35.8717 54.8878V48.5177H29.5327V54.8878H35.8717ZM27.4242 54.8878V48.5177H23.2498V54.8878H27.4242ZM21.1414 54.8878V48.5177H14.7875V54.8878H21.1414ZM14.7875 46.4093H21.1414V40.0393H14.7875V46.4093ZM14.7875 37.9308H35.8717V33.7881H14.7875V37.9308ZM35.8717 40.0393H29.5327V46.4093H35.8717V40.0393ZM27.4242 46.4093V40.0393H23.2498V46.4093H27.4242Z" fill="white"/>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "FS__icon-tableFile",
        props: {
            size: {
                type: Number,
                default: 24
            },
            fill: {
                type: String,
                default: '#1ABF74'
            }
        },
    }
</script>

<style scoped>

</style>


