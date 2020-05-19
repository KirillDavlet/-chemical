<template>
  <div id="columnUser" :data-iduser="this.dataUser.id">
    <div class="column-user__delete" @click="deleteUSer"><span>-</span></div>
    <div class="column-user__FIO"><span>{{ FIO }}</span></div>
    <div class="column-user__login"><span>{{ dataUser.login }}</span></div>
    <div class="column-user__mail"><span>{{ dataUser.mail }}</span></div>
    <div class="column-user__phone"><span>{{ dataUser.phone }}</span></div>
    <div class="column-user__status" @click="statusUser"><span>{{ statusRow }}</span>
    </div>
    <div class="column-user__position"><span>{{ dataUser.positionUser }}</span></div>
    <div class="column-user__role" data-type="роль" @click.stop="openDropDownMenu"><span>{{ dataUser.role }}</span></div>
  </div>
</template>

<script>
    import getUserStatus from '../../../services/router/administration/status'

    export default {
        name: "column-user",
        components: {},
        props: {
            dataUser: {
                type: Object,
                default: function () {
                    return {
                        mail: 'почта',
                        status: 1,
                        id: 82,
                        login: 'admin',
                        nameUser: 'Кирилл',
                        firstName: 'Давлетшин',
                        lastName: 'Анасович',
                        phone: '12345678901',
                        positionUser: 'admin',
                        role: 'администратор'
                    }
                }
            },
            roles: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },
        data() {
            return {
                id: null,
                status: null,
                name: null,
                lastName: null,
                firstName: null,
                phone: null,
                mail: null,
                login: null,
                role: null,
                position: null
            }
        },
        computed: {
            FIO() {
                return `${this.dataUser.firstName} ${this.dataUser.nameUser} ${this.dataUser.lastName}`
            },
          statusRow() {
              console.log('qweqwe')
              return this.dataUser.status == null ? 'не активный' : 'активный'
          }
        },
        methods: {
            /**
             * метод изменения статуса пользователя
             */
            async statusUser() {
                const body = {
                    id: this.$el.dataset.iduser,
                    status: this.status
                }
                const res = await getUserStatus.userStatus(body)
                  .then(res=> {
                    if(res && res.data) {
                      this.$emit('statusUser', {id: +this.$el.dataset.iduser, status: res.data.statusUser})
                    }
                  })
                  .catch(err=> console.log(err))

            },
            /**
             * метод изменения ролей
             * при клике записывем все в хранилище и работаем уже с данными из store
             */
            openDropDownMenu(e) {
                this.$store.commit('SET_DROPDOWNMENU', {
                    top: this.$el.offsetTop, //положение сверху
                    left: this.$el.offsetWidth - 250, //положение слева
                    data: this.roles.map(el => {
                        return {name: el.role, id: el.id}
                    }), //массив объектов во всеми данными по доченим ссылкам
                    // title: this.$el.dataset.name, //название блока ссылок
                    title: e.currentTarget.dataset.type, //название блока ссылок
                    type: 'text',
                    set: 'role',// название метода для хранилища, что бы вызвать какую лиюо раюоту :TODO
                    idUser: this.$el.dataset.iduser, //id пользователя
                });
            },
            deleteUSer() {
                this.$store.dispatch('DELETE__USER', this.$el.dataset.iduser)
            }
        },
        mounted() {
            this.id = this.dataUser.id;
            this.status = this.dataUser.status;
            this.name = this.dataUser.nameUser;
            this.lastName = this.dataUser.lastName;
            this.firstName = this.dataUser.firstName;
            this.phone = this.dataUser.phone;
            this.mail = this.dataUser.mail;
            this.login = this.dataUser.login;
            this.role = this.dataUser.role;
            this.position = this.dataUser.positionUser
        },
    }
</script>

<style lang="less">
  #columnUser {
    width: auto;
    min-width: 1500px;
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    cursor: pointer;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .column-user__FIO {
      width: 25%;
      min-width: 300px;
    }

    .column-user__login {
      width: 20%;
      min-width: 250px;
    }

    .column-user__mail {
      width: 20%;
      min-width: 250px;
    }

    .column-user__phone {
      width: 10%;
      min-width: 150px;
    }

    .column-user__status {
      width: 5%;
      min-width: 150px;
    }

    .column-user__position {
      width: 10%;
      min-width: 200px;
    }

    .column-user__role {
      width: 10%;
      min-width: 200px;
    }

    &:hover {
      background: #ebfff2;
    }
  }
</style>
