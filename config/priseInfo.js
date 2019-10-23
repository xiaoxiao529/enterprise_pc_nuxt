//PLA自定义
let ZS = {};
ZS.priseInfo = {};
// 单位类别
ZS.priseInfo.unitClassList = {
    '01': '商场、宾馆、公共娱乐场所等公共聚集场所',
    '02': '交通枢纽、新闻单位、邮电、通信枢纽等重要场所',
    '03': '党政首脑机关',
    '04': '重要的科研单位、院校、医院',
    '05': '高层公共建筑',
    '06': '图书馆、博物馆、展览馆、档案馆等重要的文物古建筑',
    '07': '地下公共建筑',
    '08': '大型仓库、堆场',
    '09': '发电场（站）、地区供电系统变电站',
    '10': '易燃易爆物品',
    '11': '大型工程及施工现场',
    '12': '其他重要场所和工业企业',
    '99': '其他'
};
// 所属行业
ZS.priseInfo.unitIndustryList = {
    '01': '农、林、牧、渔业',
    '02': '采矿业',
    '03': '制造业',
    '04': '住宿和餐饮业',
    '05': '电力、燃气及水的生产和供应',
    '06': '建筑业',
    '07': '交通运输、仓储和邮政',
    '08': '信息传输、计算机服务和软件业',
    '09': '批发和零售',
    '10': '科学研究、技术服务和地质勘查',
    '11': '水利、环境和公共设施管理',
    '12': '居民服务和其他服务',
    '13': '教育',
    '14': '卫生、社会保障和社会福利',
    '15': '文化、体育和娱乐业',
    '16': '公共管理和社会组织',
    '17': '国际组织金融业',
    '18': '房地产业',
    '19': '租赁和商务服务'
};
// 风险类别
ZS.priseInfo.riskClassList = {
    '1': '火灾高危',
    '2': '一级重点',
    '3': '二级重点',
    '4': '三级重点',
    '9': '非重点'
};
// 经济所有制
ZS.priseInfo.unitPropertyList = {
    '01': '国有企业',
    '02': '集体企业',
    '03': '民营企业',
    '04': '个体工商户',
    '05': '中外合资企业',
    '06': '外商独资企业',
    '07': '股份制企业',
    '08': '事业单位',
    '09': '国家机关',
    '99': '其他'
};
export default {
    ZS : ZS
}