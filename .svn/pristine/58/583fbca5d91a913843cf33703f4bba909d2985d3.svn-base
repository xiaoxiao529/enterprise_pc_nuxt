import utils from '~/utils/auth'
 
export default function ({store, route, req, res, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/login';
  var token, path
  //console.log('-----authenticated.js-----start----')
  //在服务端
  if (isServer) {
    let cookies = utils.getcookiesInServer(req)
     //path = req&&req.originalUrl ? req.originalUrl : "/";
    //loginName作为token
    token = cookies.fire_loginName ? cookies.fire_loginName : ''
    
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    //token = utils.getcookiesInClient('token')
    token = utils.getcookiesInClient('loginName')//loginName作为token
    path = route.path;
    
  }
  /* if (path) {
    redirectURL = '/login?ref=' + encodeURIComponent(path)
  } */
  //需要进行权限判断的页面开头
  if (!token) {
       redirect(redirectURL)
  }else{
    //console.log("---authenticated.js---path:"+path)
  }


}
