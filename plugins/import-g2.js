/*
 *g2.js
*/
/*import Vue from 'vue'
import g2 from './g2' // 引入
Vue.prototype.$g2 = g2 // 引入组件（将g2注册为全局）*/
//import * as fun from'~/plugins/require.js'

import '~/node_modules/ol/dist/ol.css'
import Vue from 'vue'
var gs2 = require('../node_modules/g2-2d');

//console.log(gs2)

//debugger
Vue.prototype.gs2 = gs2 // 引入组件（将gs2注册为全局）
/*Vue.use(gs2)
export default gs2*/
