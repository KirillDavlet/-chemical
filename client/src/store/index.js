import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios'
/// модули хранилища
import activeTheme                  from './modules/activeTheme'
import administrationUser           from './modules/administrationUsers'
import dropdownMenu                 from './modules/dropdownMenu'
import infoUser                     from './modules/infoUser'
import loader                       from './modules/loader'
import menuInfoUser                 from './modules/menuInfoUser'
import message                      from './modules/message';
import navMenu                      from './modules/navMenu';
import noAuthorization              from './modules/noAuthorization';
import tommorowEvents               from './modules/tommorowEvents';
import lang                         from './modules/lang'
import currentPageData              from './modules/currentPageData'
import search                       from './modules/search'
import filterActive                 from './modules/filters'
import testings                     from './modules/testings'
import widgets                      from './modules/widgets'
import home                         from './modules/home'


Vue.use(Vuex);



export const store = new Vuex.Store({
  state:{},
  getters: {},
  commit:{},
  actions:{},

  modules: {
    activeTheme,
    administrationUser,
    dropdownMenu,
    infoUser,
    loader,
    menuInfoUser,
    message,
    navMenu,
    noAuthorization,
    tommorowEvents,
    lang,
    currentPageData,
    search,
    filterActive,
    testings,
    widgets,
    home
  }
});
