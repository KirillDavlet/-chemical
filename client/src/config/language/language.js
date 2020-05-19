'use strict';
const lang = require('./listlang');
const transfer = require('./transfer');


let language = {};
for (let tr in transfer) {
  language[tr] = {};
  for (let i = 0; i < lang.length; i++) {
    language[tr][lang[i]] = transfer[tr][i]
  }
}
module.exports = language;
