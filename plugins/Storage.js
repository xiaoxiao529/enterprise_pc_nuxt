/*
 * @Author: TanZer.hanyu
 * @Date: 2019-05-09 11:53:15
 */
import Vue from 'vue';
import _Storage from '../utils/Storage';

export default () => {
    // Vue.use(_)
    // Window.$http = Vue.prototype.$http = _http;
    Window._Storage = Vue.prototype._Storage = _Storage;
}