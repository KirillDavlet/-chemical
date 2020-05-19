const Axios = require('axios');
const language = require('./../language/language');
const listLang = require('./../language/listlang');
const configClient = require('./../client/client');

const mixin = {
  data() {
    return {
      // массив градиентов
        gradient: [
          'linear-gradient(270deg, #56CCF2 0%, #7F31F1 136.06%)',
          'linear-gradient(270deg, #E31F28 0%, #843FA0 51.04%, #2574CF 100%',
          'linear-gradient(270deg, #00ACED 0%, #2DA771 100%)',
          'linear-gradient(270deg, #D4FAE4 0%, #2960A0 100%)',
          'linear-gradient(270deg, #E31F28 0%, #843FA0 51.04%, #2574CF 100%)',
        ]
    }
  },
  computed: {
    themeActiveComp() {
      if (this.$store.getters.get_activeThemeSwitcher.selectedTheme && this.$store.getters.get_activeThemeSwitcher.selectedTheme.active) {
        return this.$store.getters.get_activeThemeSwitcher.selectedTheme.mandatory
      } else if(this.$store.getters.get_activeThemeSwitcher.standart && this.$store.getters.get_activeThemeSwitcher.standart.active) {
        return this.$store.getters.get_activeThemeSwitcher.standart.mandatory
      } else {return null}
    },
    // возвращаемое свойство по вариантам языков
    langList() {
      return listLang
    }
  },
  methods: {
    /**
     * функция изменения языка
     * @param text - меняемый текст
     * @param lang - язык (default = rus)
     * @param transfer - файл переводов
     * @returns {*}
     * @private
     */
    _: function(text, lang = this.$store.getters.get_lang, transfer = language) {
      if(lang && transfer[text] && transfer[text][lang]) {
        return transfer[text][lang]
      } else {
        return text // перевода нет
      }
    },
    /**
     * функция проверки доступа к рессурсу
     * @param url - адрес куда стучимся
     * @param stateModule - actions по модулю  ,если необходимо выполнить доп действия
     * @returns {*}
     */
    get_access: function (url, stateModule = null) {
      console.log(this.$store.getters.INFOUSER.userInfo.pass)
      console.log(`${configClient.server}${this.$store.getters.INFOUSER.id}/${url}?login=${this.$store.getters.INFOUSER.userInfo.login}&pass=${String(this.$store.getters.INFOUSER.userInfo.pass)}`)
      Axios.get(`${configClient.server}${this.$store.getters.INFOUSER.id}/${url}?login=${this.$store.getters.INFOUSER.userInfo.login}&pass=${String(this.$store.getters.INFOUSER.userInfo.pass)}`)
        .then(res=> {
          if( res && res.data && res.status === 200) {
            if(!res.data.status) {
              this.$store.commit('SET_ALERTARRAY', {
                status: res.data.status,
                message: res.data.message,
                type: res.data.typeMessage
              });
              this.$router.push(`/${this.$store.getters.INFOUSER.id}`)
            } else {
              if(stateModule) {
                console.log('зашли если есть')
                this.$store.dispatch(`${stateModule}`, res.data)
              }
              this.$store.dispatch('NewCurrentPageData', res.data)
            }
          }
        })
        .catch(err => {
          this.$store.commit('SET_ALERTARRAY', {
            status: res.data.status,
            message: 'Произошла ошибка на сервере',
            type: 'error'
          });
            console.log('err=>', err)
        })
    }
  },
};
module.exports = mixin;
