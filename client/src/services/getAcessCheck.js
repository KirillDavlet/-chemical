/**
 * ДАННЫЙ МОДУЛЬ ПРОВЕРЯЕТ ЗАПРАВШИВАЕТ ПРАВА НА ДОСТУП ПО РОЛИ ПОЛЬЗОВАТЕЛЯ
 * ПРМЕР - getAcessCheck.getStatus(this.$store.getters.INFOUSER.id, this.$store.getters.INFOUSER.role, 'settings/theme', this.$store, this.$router)
 */
import api from './api'



export default {
  /**
   * функция делающая всю работу, проверка доступа и вывод сообщений
   * @param id - идентификатор пользователя
   * @param role - роль пользователя
   * @param url - адрес куда стучимся
   * @param context - хранилище
   * @param router - роутер
   * @param activeMessage - отображать ли вывод сообщений о результате
   * @returns {Promise<void>}
   */
  async getStatus (login, pass ,id, role, url, context, router, activeMessage = true) {
     const res = await api().get(`/${id}/${url}?role=${role}&login=${login}&pass=${pass}`)
      if(res) {
        if(res.data) {
          if(res.data.status) {
            if(activeMessage) {
              context.commit('SET_ALERTARRAY', {status:res.data.status, message:res.data.message, type:res.data.typeMessage})
              return true
            }
          }
          else{
            router.push(`/${id}/`); //не пускаем пользователя, если у него нет прав
            if(activeMessage) context.commit('SET_ALERTARRAY', {status:res.data.status, message:res.data.message, type:res.data.typeMessage})
            return false
          }
        }
      }
  }
}



// async getData() {
//   const res = await getSettingsTheme.getSettingsTheme(this.$store.getters.INFOUSER.id, this.$store.getters.INFOUSER.role);
//   if(res.data) {
//     if (!res.data.status){
//       this.$router.push(`/${this.$route.params.id}/`); //не пускаем пользователя, если у него нет прав
//       this.$store.commit('SET_ALERTARRAY', {status:res.data.status, message:res.data.message, type:res.data.typeMessage})
//     }
//     else {
//       this.nestingArray.push(res.data.info) //добавил корневую папку хранилища
//       this.$store.commit('SET_ALERTARRAY', {status:res.data.status, message:res.data.message, type:res.data.typeMessage})
//     }
//   }
// }
