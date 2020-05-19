<template>
  <div id="adminka">
    <div class="adm">
      <div class="adm-header">
        <span>{{ _('administration') }}</span>
      </div>
      <div class="adm-table"
           v-if="this.$store.getters.ADMINUSERS && this.$store.getters.ADMINUSERS.data">
        <MC__table
          :data-table="dataTable"
          :number-row="15"
          :settings-actions-table="true"
          :checked-active="true"
          :active-checked-array="dataUsers"
          :title-table="'administration'"
          :settings="[_('delete'),_('change status'), _('write a letter (mail)'), _('write a letter (system)')]"
          @actionsTable="actionsTableParent"
          @changeRow="changeRowParent"
        />
        <div class="adm-table-settings">
          <div class="adm-table-settings__remove-password-all" @click="resetPasswordUsers">
            <span> {{ _('password reset') }}</span>
          </div>
          <div class="adm-table-settings__generation-users" @click="generationUsers">
            <span> {{ _('account generation') }}</span>
          </div>
        </div>
      </div>
      <generation-loader v-if="loaderGeneration"/>
      <MC__formMessage
        v-if="formMessage"
        :position-modal-message="{x:150, y:150}"
        :settings-actions-form="true"
        :recipient="dataUsersMail"
        :description-title="'message'"
        @closeFormMessage="closeFormMessageParrent"
        @toSendMessage="toSendMessageParrent"
      />
    </div>
  </div>
</template>

<script>
  import MC__table from "../../mainComponent/SystemTable/table/MC__table";
  import GenerationLoader from "../../loaders/generation/generation";
  import MC__formMessage from "../../mainComponent/SystemTable/formMessage/formMessage";

  export default {
    name: "admininka",
    components: {MC__formMessage, GenerationLoader, MC__table},
    data() {
      return {
        loaderGeneration: false,
        formMessage: false,
        dataUsers: [], //массив id пользователей ( -ля)
        flagUsers: false, // флаг отвечает за выбираем несколько пользователей или просто кликаем по 1
        typeMessage: null // отправка почты на mail или внутри системы
      }
    },
    computed: {
      dataTable() {
        return this.$store.getters.ADMINUSERS.data
      },
      dataUsersMail() {
        let testArr = [];
        this.dataTable.forEach(el => {
          this.dataUsers.forEach(elId => {
            if (elId === el.id) {
              if (this.typeMessage === 'mail') {
                testArr.push(el.mail)
              } else if (this.typeMessage === 'system') {
                testArr.push(`${el.firstName} ${el.nameUser} ${el.lastName}`)
              }
            }
          })
        })
        return testArr
      },
      idForm() {
        return this.$store.getters.INFOUSER.id
      },
      FIOFrom() {
        return `${this.$store.getters.INFOUSER.firstName} ${this.$store.getters.INFOUSER.nameUser} ${this.$store.getters.INFOUSER.lastName}`
      }

    },
    methods: {
      actionsTableParent(data) {
        if (!this.flagUsers) {
          this.dataUsers = [];
          this.dataUsers.push(data.el.id) // записал id пользователей при событии ( если не выбрал через checked )
        }
        switch (data.action) {
          case this._('delete'):
            let status = confirm(`вы действительно хотите удалить пользователя`);
            if (status) {
              this.$store.dispatch('DELETE__USER', data.el.id);
            }
            break;
          case this._('change status'):
            this.$store.dispatch('CHANGE_STATUS', data.el.id);
            break;
          case this._('write a letter (mail)'):
            this.typeMessage = 'mail';
            this.formMessage = true;
            break;
          case this._('write a letter (system)'):
            this.typeMessage = 'system';
            this.formMessage = true;
            break;
        }
      },
      /**
       * обработка выбора строки
       */
      changeRowParent(data) {
        if (!this.flagUsers) {
          this.dataUsers = []
        }
        if (!data.value) {
          this.dataUsers.splice(this.dataUsers.findIndex(el => el === data.id), 1)
          if (this.dataUsers.length === 0) {
            this.flagUsers = false
          }
        } else {
          this.dataUsers.push(data.id)
          this.flagUsers = true
        }
      },
      resetPasswordUsers() {
        let resetPassAll = confirm(this._('confirm password change for all users'));
        if (resetPassAll) {
          this.$store.dispatch('Reset_pas_user');
          console.log('отправка запроса на редактирование всех паролей')
        }
      },
      /**
       * отправка запроса на генерацию данных, по 50 штук, что бы ничего не сломать :)))) а вообще лень пиать
       */
      generationUsers() {
        this.$store.dispatch('Generation_Users', 50);
        this.loaderGeneration = true;
        setTimeout(() => {
          this.loaderGeneration = false;
          alert('данный функционал не реализован')
        }, 500)
      },

      // методы модалки
      closeFormMessageParrent() {
        this.formMessage = false;
      },
      /**
       * метод отправки письма
       * @param data
       */
      toSendMessageParrent(data) {
        const options = {
          users: this.typeMessage === 'mail' ? this.dataUsersMail : this.dataUsers,
          typeMessage: this.typeMessage,
          info: {
            theme: data.theme,
            description: data.description,
            id_from: this.idForm,
            fio_from: this.FIOFrom
          }
        };
        this.$store.dispatch('Sending_letter', options)
        this.formMessage = false;
      }
    },
    mounted() {
      // this.getDataAdministration()
      this.get_access('administration', 'Add_AdminUser')
    },
  }
</script>

<style lang="less">
  #adminka {
    margin-top: 45px;
    height: auto;
    width: 100%;
    padding-left: 15px;

    .adm {
      width: 100%;
      height: 100%;

      &-header {
        width: 100%;
        height: 50px;

        > span {
          padding: 5px 15px;
          font-size: 36px;
          color: black;
          letter-spacing: 0.02em;
          text-transform: capitalize;
        }
      }

      &-table {
        width: 100%;

        &-settings {
          width: 100%;
          display: flex;

          > div {
            width: 220px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            cursor: pointer;

            > span {
              line-height: 24px;
              letter-spacing: 0.02em;
              color: #FFFFFF;
            }
          }

          &__remove-password-all {
            background: #ff3126;
          }

          &__generation-users {
            margin-left: 15px;
            background: #4c74ff;
          }
        }

      }
    }

  }
</style>
