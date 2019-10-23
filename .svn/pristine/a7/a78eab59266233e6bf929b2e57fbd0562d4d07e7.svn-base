import api from '~/config/http';
import { Message, MessageBox } from 'element-ui';
var that = this;

    /**
     * 根据企业id获取平面图
     * @param enterpriseId
     * @param callback
     * @private
     */
    var _getMonitorPlan = function(enterpriseId, callback){
        $.ajax({
            //url : api.forent_url.e_record_view_url + "/unit/findUnitByUnitId/?unitId="+ enterpriseId,
            url:'/remoteApi/tool/unit/findUnitByUnitId?unitId='+ enterpriseId,
            type :'GET',
            success : function (res) {
                var code = res["code"];
                if(code == "success"){
                    var enterprise = res['data'];
                    var url = enterprise.aerialviewImg;
                    if(url != undefined){
                        callback(api.forent_url.pic_url + '/floorImage/' + url);
                    }else{
                        Message.error('暂无楼层图！');
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
        /*$.ajax({
            url:'/remoteApi/tool/build/findBuildByUnitId',
            type: 'POST',
            data: {
                unitId: enterpriseId
            },
            success: function(data){
                var data = data['data'] || [];
                callback(data);
            }
        });*/
       $.ajax({
            url:'/remoteApi/tool/build/findBuildBaseInfoByUnitId?unitId='+ enterpriseId,
            type: 'GET',
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
            //url: api.forent_url.e_record_url + '/deviceInfo/getVideoInfoList',
            url:'/remoteApi/tool/video/findVideoByUnitId?unitId='+ enterpriseId,
            type: 'get',
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
       //if(api.getGlobalVal('attribute') == 'linyi'){
            $.ajax({
                url: api.forent_url.monitor_url + '/monitor/getLyMonitorListInfo',
                type: 'get',
                data: {
                    unitId:enterpriseId,
                    runState:1
                },
                success: function(data){
                    callback(data);
                }
            });
        // }else{
        //     $.ajax({
        //         url: api.forent_url.base_url + '/alarmInfo/realtimeAlarms',
        //         type: 'POST',
        //         data: {
        //             pageNo:1,
        //             pageSize:50,
        //             proprietorId: enterpriseId
        //         },
        //         success: function(data){
        //             var data = data['data'] || [];
        //             callback(data);
        //         }
        //     });
        // }    
    }

    export default {
        getMonitorPlan: _getMonitorPlan,
        getMonitorBuildInfo: _getMonitorBuildInfo,
        getVideoBuildInfo: _getVideoBuildInfo,
        getAlarmList: _getAlarmList
    };

