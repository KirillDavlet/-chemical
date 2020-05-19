<template>
  <div id="fm__form">
    <div class="form">
      <input
        :type="this.type"
        :placeholder="plchr"
        :class="classErr ? 'errorForm' : ''"
        @focus="onFocus"
        @blur="onBlur"
        ref="input"
        v-model="dataForm"
        :style="{borderColor:color}"
      >
      <label ref="label"> {{ title }} </label>
      <div
        v-if="typeForm === 'password' && passActive"
        class="icon-password"
        @click="passDisplay"
      >
        <icon__display
          width="20"
          height="20"
          :fill="'gray'"
        />
      </div>
      <div v-if="typeForm === 'password' && !passActive"
           class="icon-password"
           @click="passDisplay"
      >
        <icon__no-display
          width="20"
          height="20"
          :fill="'gray'"
        />
      </div>
      <div v-if="requiredField" class="required-field">
        <span>*</span>
      </div>
    </div>
  </div>
</template>

<script>
    import Icon__display from "../icon/display";
    import Icon__noDisplay from "../icon/noDisplay";

    export default {
        name: "fm__form",
        components: {Icon__noDisplay, Icon__display},
        props: {
            typeForm: {
                type: String,
                default: 'text'
            },
            placeHolder: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: 'поле формы'
            },
            dataFormParent: {
                type: String,
                default: ''
            },
            classError: {
                type: Boolean,
                default: false
            }, //отвечает за правильность ввода данных
            color: {
                type: String,
                default: 'gray'
            },
            requiredField: {
                type: Boolean,
                default: false //отвечает, обязательное ли поле
            }
        },
        data() {
            return {
                focus: false,
                dataForm: '',
                passActive: true,
                type:'',
                classErr: false
            }
        },
        watch: {
            dataForm(data) {
                this.$emit('infoForm',data)
            },
            classError(data) {
                this.classErr = data
            }
        },
        methods: {
            onFocus() {
                this.focus = true;
                this.$refs.label.classList.add('label-active');
                this.$refs.input.setAttribute('placeholder', '')
            },
            onBlur() {
                this.focus = false
                if (this.dataForm === '') {
                    this.$refs.label.classList.remove('label-active')
                    this.$refs.input.setAttribute('placeholder', this.plchr)
                }
            },
            passDisplay() {
                this.passActive = !this.passActive;
                this.type === 'password' ? this.type = 'text' : this.type = 'password'
            }
        },
        computed: {
            plchr() {
                return this.placeHolder === '' ? this.title : this.placeHolder
            },
        },
        mounted() {
            this.type = this.typeForm;
            this.classErr = this.classError
        },
    }
</script>

<style lang="less">
  #fm__form {
    width: 100%;
    height: 35px;
    margin: 9px 0 0 0;

    .form {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      > label {
        position: absolute;
        left: 0;
        top: 19%;
        opacity: 0;
        font-size: 16px;
        font-family: sans-Serif;
        z-index: 5;
        transition: .3s ease-in-out;
      }

      .label-active {
        top: -30%;
        z-index: 50;
        opacity: 1;
        font-size: 12px;
        color: gray;
      }

      > input {
        width: 100%;
        font-size: 16px;
        font-family: sans-Serif;
        border: none;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        padding: 5px 8px 8px 6px;
        z-index: 10;
        &:focus, &:active {
          border-bottom: 1px solid #3dc0ff;
          outline: none;
        }
      }

      > input::placeholder {
        font-size: 16px;
        font-family: sans-Serif;
        transition: .3s ease-in;
      }

      .icon-password {
        position: absolute;
        right: 0;
        z-index: 200;
        cursor: pointer;
      }

      .required-field {
        position: absolute;
        right: -10px;
        top: 0;
        z-index: 200;
        cursor: pointer;
        color: red;
      }

      input.errorForm {
        border-bottom: 1px solid red !important;
      }

    }
  }


</style>
