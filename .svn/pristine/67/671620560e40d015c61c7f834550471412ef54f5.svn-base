/**
 * 用户模块
 */
import Cookie from 'js-cookie'
import api from '~/config/http';

const UserInfo = {
  namespaced : true,
  state : {//state
    userInfo: {}
  },
  mutations : {//mutations
    LOGIN(state, value) {
      Cookie.set('userInfo', {
        avatar: value.avatar,
        // create_time: value.create_time,
        mobile: value.mobile,
        user_id: value.user_id,
        username: value.username
      });
      state.userInfo = value;
    },
    OUT_LOGIN(state) {
      Cookie.remove('userInfo');
      state.userInfo = {};
    },
    USER_INFO_UPDATA(state, value) {
      state.userInfo = Object.assign(state.userInfo, value);
      Cookie.set('userInfo', state.userInfo);
    }
  },
  actions : {//actions
    login({
      commit
    }, value) {
      commit(LOGIN, value);
    },
    outLogin({
      commit
    }) {
      commit(OUT_LOGIN);
    },
    update({
      commit
    }, value) {
      commit(USER_INFO_UPDATA, value);
    }
  },
  getters : {//getters
    userInfo(state) {
      if (typeof window !== "undefined" && JSON.stringify(state.userInfo) === '{}' && Cookie.get('userInfo')) {
        state.userInfo = JSON.parse(api.getGlobalVal('userObj'));
      }
      return state.userInfo;
    }
  }


}




export default UserInfo
