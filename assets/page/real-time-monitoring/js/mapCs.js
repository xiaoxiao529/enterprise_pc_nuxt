import api from '~/config/http';
var that = this;
    /**
     * 根据企业id获取平面图
     * @param enterpriseId
     * @param callback
     * @private
     */
    var _getMonitorPlan = function(enterpriseId, callback){
        $.ajax({
            url : api.forent_url.e_record_url + "/record/enterprises/1/"+ enterpriseId,
            type :'GET',
            success : function (res) {
                var code = res["code"];
                if(code == "success"){
                    var enterprise = res['data'][0] || {};
                    var url = enterprise.aerialviewImg;
                    if(url != undefined){
                        callback(api.forent_url.pic_url + '/floorImage/' + url);
                    }else{
                        that.$message.error('暂无楼层图！');
                        callback('');
                    }
                }
            }
        });
    };

    /**
     * 根据企业id获取企业建筑信息
     * @param enterpriseId 企业id
     * @param callback
     * @private
     */
    var _getMonitorBuildInfo = function(enterpriseId, callback){
        $.ajax({
            // url: api.forent_url.monitor_url + '/monitor/getUnitTAndA',
            url: api.forent_url.monitor_url + '/monitor/getTAndAByUnitId',
            type: 'POST',
            data: {
                unitId: enterpriseId
            },
            success: function(data){
               
                var data = data['data'] || [];
                callback(data);
            }
        });
    };

    /**
     *  根据企业id获取消控室视频点信息
     * @param enterpriseId
     * @param callback
     * @private
     */
    var _getVideoBuildInfo = function(enterpriseId, callback){
        $.ajax({
            url: api.forent_url.e_record_url + '/deviceInfo/getVideoInfoList',
            type: 'POST',
            data: {
                unitId: enterpriseId
            },
            success: function(data){
                
                var data = data['data'] || [];
                callback(data);
            }
        });
    }

    /**
     *  获取企业报警列表
     * @param enterpriseId
     * @param callback
     * @private
     */
    var _getAlarmList = function(enterpriseId, callback){
        $.ajax({
            url: api.forent_url.base_url + '/alarmInfo/realtimeAlarms',
            type: 'POST',
            data: {
                pageNo:1,
                pageSize:50,
                proprietorId: enterpriseId
            },
            success: function(data){
                console.log(JSON.stringify(data)+'5454454')
                var data = data['data'] || [];
                callback(data);
            }
        });
    }

    export default {
        getMonitorPlan: _getMonitorPlan,
        getMonitorBuildInfo: _getMonitorBuildInfo,
        getVideoBuildInfo: _getVideoBuildInfo,
        getAlarmList: _getAlarmList
    };

