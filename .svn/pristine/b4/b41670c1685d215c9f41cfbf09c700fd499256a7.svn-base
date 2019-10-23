/* 
 * @Author: TanZer.hanyu 
 * @Date: 2019-05-10 15:28:08
 * --- api配置项 ---
 * */
const getTargetHost = (milieu) => {
    switch (milieu) {
        case 'test':
            return 'http://112.27.198.15:9832/api/v1.1/operation-management/';
        case 'dev':
            return 'http://test.gsafetycloud.com/api/v1.1/operation-management/';
        default:
            return milieu;
    }
};

export default {
    // apiHost: "https://api.douban.com/", 
    apiHost: getTargetHost(process.env.milieu),
    api: {
        comingSoon: "v2/movie/coming_soon",
        top250: "v2/movie/top250",
        queryCount: "mainOperationOrgController/queryDistrictCascode"
    },

    // websocket地址
    wsHost: ""
}