<template>
    <div id="icon__successfulExecution" :style="{width: size+'px', height: size+'px'}">
      <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.6875C17.3503 21.6875 21.6875 17.3503 21.6875 12C21.6875 6.64973 17.3503 2.3125 12 2.3125C6.64973 2.3125 2.3125 6.64973 2.3125 12C2.3125 17.3503 6.64973 21.6875 12 21.6875ZM18.067 9.94195L10.8795 17.1295C10.6354 17.3735 10.2396 17.3735 9.99555 17.1294L5.93305 13.0669C5.68898 12.8229 5.68898 12.4271 5.93305 12.183L6.81691 11.2992C7.06102 11.0551 7.45676 11.0551 7.70082 11.2992L10.4375 14.0359L16.2992 8.17422C16.5433 7.93012 16.939 7.93012 17.1831 8.17422L18.067 9.05809C18.311 9.30215 18.311 9.69789 18.067 9.94195Z" :fill="color.mass"/>
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.6875C17.3503 21.6875 21.6875 17.3503 21.6875 12C21.6875 6.64973 17.3503 2.3125 12 2.3125C6.64973 2.3125 2.3125 6.64973 2.3125 12C2.3125 17.3503 6.64973 21.6875 12 21.6875ZM18.067 9.94195L10.8795 17.1295C10.6354 17.3735 10.2396 17.3735 9.99555 17.1294L5.93305 13.0669C5.68898 12.8229 5.68898 12.4271 5.93305 12.183L6.81691 11.2992C7.06102 11.0551 7.45676 11.0551 7.70082 11.2992L10.4375 14.0359L16.2992 8.17422C16.5433 7.93012 16.939 7.93012 17.1831 8.17422L18.067 9.05809C18.311 9.30215 18.311 9.69789 18.067 9.94195Z" :fill="color.fill"/>
        </mask>
      </svg>

    </div>
</template>

<script>
    export default {
        name: "icon__successful",
        props: {
            small: {
                type: Boolean,
                default: false
            },
            normal: {
                type: Boolean,
                default: false
            },
            big: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                size: null,
                color: {
                    mass:'#37b24d',
                    fill:'#d4fae4'
                }
            }
        },
        methods: {
            initIcon() {
                if (this.big) {
                    this.size = 40
                }
                else if(this.small) {
                    this.size = 16
                }
                else {
                    this.size = 24
                }
            }
        },
        mounted() {
            this.initIcon()
        }
    }
</script>

<style scoped>

</style>
