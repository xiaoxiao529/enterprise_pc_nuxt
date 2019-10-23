import api from "~/config/http"
import Cookie from 'js-cookie'
export default {
  //获取服务端cookie
  getcookiesInServer:function (req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    //console.log('service_cookie:' + JSON.stringify(service_cookie))
    return service_cookie;
  },
  //获取客户端cookie
  getcookiesInClient:function (key) {
    return api.getGlobalVal("loginName") ? api.getGlobalVal("loginName") : ''
  }

}