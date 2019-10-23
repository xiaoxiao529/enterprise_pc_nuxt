/**
 * app模块
 */
import Cookie from 'js-cookie'

//i18n
import Locale from '~/locales'

const AppInfo = {
    namespaced: true,
    state: { //state
        sidebar: {
            opened: !+Cookie.get('sidebarStatus'),
            withoutAnimation: false
        },
        device: 'pc',
        //language: Cookie.get('language') || 'en',
        //i18n
        locales: Locale(),
        locale: Locale()[0],
        size: Cookie.get('size') || 'medium'
    },
    mutations: { //mutations
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookie.set('sidebarStatus', 1)
            } else {
                Cookie.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookie.set('sidebarStatus', 1)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },

        SET_SIZE: (state, size) => {
            state.size = size
            Cookie.set('size', size)
        }
    },
    actions: { //actions
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        closeSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        toggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        },
        /*setLang({ commit }, locale) {
          commit('SET_LANG', locale)
        },*/
        /*setLanguage({ commit }, language) {
          commit('SET_LANGUAGE', language)
        },*/
        setSize({ commit }, size) {
            commit('SET_SIZE', size)
        }
    },
    getters: { //getters

    }
}

export default AppInfo