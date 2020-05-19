<template>
    <div class="selection-button modal-selection-button modal-selection-button">
        <div class="selection-button__selections modal-selection-button">
          <div class="selection-button__selections-events modal-selection-button" @click="selectEvents()">
            <span class="modal-selection-button">{{ activeSelect }}</span>
            <svg class="modal-selection-button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 10L12 15L17 10H7Z" fill="#44556B"/>
            </svg>
          </div>
          <div class="selection-button__selections-modal modal-selection-button">
            <div class="selection-button__selections-modal-block modal-selection-button"  v-if="selectFlag">
              <div class="modal-selection-button"
                   v-for="(select, i) in selection"
                   :key="i"
                   @click="changeActions(select)">
                <span class="modal-selection-button">{{ select }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="selection-button__button " @click="saveActions()">
          <span>{{ label }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "selectionButton",
        props: {
            selection: {
                type: Array,
                default: () => ['сохранить и остаться']
            },
            selectionStart: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: 'сохранить'
            }
        },
        watch: {
            selectFlag(flag) {
                if (flag) {
                    document.addEventListener('click', this.windowEvent, false)
                } else {
                    document.removeEventListener('click', this.windowEvent, false)
                }
            }
        },
        data() {
            return {
              activeSelect: '' || this.selectionStart === '' ? 'сохранить и продолжить' : this.selectionStart,
              selectFlag: false,

            }
        },
        methods: {
            /**
             * метод по отображению одалки, по выбору события при сохранении
             */
            selectEvents() {
                this.selectFlag = !this.selectFlag
            },
            /**
             * метод выбора события
             */
            changeActions(data){
                this.activeSelect = data;
                this.selectFlag = false
            },
            /**
             * метд сохранения
             */
            saveActions(){
              this.$emit('saveActions', this.activeSelect);

            },

            windowEvent(e) {
                if (!e.target.classList.contains('modal-selection-button')) {
                    this.selectFlag = false;
                }
            }
        }
    }
</script>

<style lang="less">
.selection-button {
  width: auto;
  height: 50px;
  display: flex;
  &__selections {
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #485B70;
    border-radius: 4px;
    position: relative;
    margin-right: 24px;
    &-events {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.02em;
        color: #1E1E1E;
      }
      > svg {
        position: absolute;
        right: 10px;
      }
    }

    &-modal {
      position: absolute;
      top: 60px;
      width: 100%;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
      border-radius: 4px;
      z-index: 100;
      &-block {
        display: flex;
        flex-direction: column;
        background: #FFFFFF;
        > div {
          height: 35px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          &:hover {
            background: rgba(74, 144, 226, 0.1);
            > span {
              color: #2574CF;
            }
          }
          > span {
            padding-left: 12px;
            font-size: 14px;
            color: #1e1e1e;
          }
        }
      }
    }
  }
  &__button {
    width: 127px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 7px;
    background: #FF9800;
    border-radius: 4px;
    > span {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: #FFFFFF;
    }
  }
}
</style>
