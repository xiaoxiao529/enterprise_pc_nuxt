
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
export default ({ app, store }) => {
  let data = {}
  let Locale = store.state.AppInfo.locales
  //let Locale = store.state.locales
  //console.log("plugins--i18n.js--store.state:"+JSON.stringify(store.state))
  //console.log("plugins--i18n.js--store.state.AppInfo.locales:"+JSON.stringify(Locale))
  for (let i = 0; i < Locale.length; i++) {
    data[Locale[i]] = require(`~/locales/${Locale[i]}.json`)
  }
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.AppInfo.locale,
    //locale: store.state.locale,
    fallbackLocale: 'cn',
    messages: data
  })
	// 自定义页面跳转方法
  app.i18n.path = (link) => {
    return `/${app.i18n.locale}/${link}`
  }
}