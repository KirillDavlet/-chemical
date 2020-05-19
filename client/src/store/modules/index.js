const message             = require('./message');
const noAuthorization     = require('./noAuthorization');
const infoUser            = require('./infoUser');
const loader              = require('./loader');
const navMenu             = require('./navMenu');
const menuInfoUser        = require('./menuInfoUser');
const dropdownMenu        = require('./dropdownMenu');
const activeTheme         = require('./activeTheme');
const tommorowEvents      = require('./tommorowEvents');
const administrationUsers = require('./administrationUsers');



const options = {
  state:{},
  getters:{},
  mutations: {},
  actions: {}
}


const optionsModule = {
  message,
  noAuthorization,
  infoUser,
  loader,
  navMenu,
  menuInfoUser,
  dropdownMenu,
  activeTheme,
  tommorowEvents,
  administrationUsers

};

for(let item in optionsModule) {
  for(let set in optionsModule[item]) {
    for(let data in optionsModule[item][set]) {
      options[set][data] = optionsModule[item][set][data]
    }
  }
}

module.exports = options

