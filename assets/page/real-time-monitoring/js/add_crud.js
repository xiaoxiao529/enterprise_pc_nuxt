import api from '~/config/http';
var that = this;
var getEnterprisePic = function(enterpriseId, callback){
    $.ajax({
        url : api.forent_url.e_record_url + "/record/enterprises/1/"+ enterpriseId,
        type :'GET',
        success : function (res) {
            var code = res["code"];
            if(code == "success"){
                var enterprise = res['data'][0];
                if(enterprise){
                    var url = enterprise.aerialviewImg;
                    callback(api.forent_url.pic_url + '/floorImage/' + url);
                }else{
                    that.$message.error('暂无楼层图！');
                    callback('');
                }
            }
        }
    });
    // callback(api.forent_url.localHostName + '/page/prise-patrol/patrolCrud/img/gg-floor1.jpg');
};

/**
 *  获取企业建筑和楼层信息
 * @param enterpriseId
 * @param callback
 * @private
 */
var getBuildFloorInfo = function(enterpriseId, callback){
    $.ajax({
        url : api.forent_url.e_record_url + "/record/enterpriseBulidInfo",
        type :'GET',
        data: {
            unitId: enterpriseId
        },
        success : function (res) {
            var code = res["code"];
            if(code == "success"){
                if(res['data'] != ''){
                    var data = JSON.parse(res['data']);
                    /*  test  */
/*                        data.builds[0].buildX = 660000;
                    data.builds[0].buildY = 450000;*/
                    callback(data);
                }else{
                    callback();
                }
            }
        }
    });
};

/**
 *  保存计划详情
 * @param data 计划参数
 * @private
 */
var savePlan = function(data){
    var enterpriseId = ZS.PATROLCRUD.enterpriseId;
    var planId = ZS.PATROLCRUD.plan.id;
    $.ajax({
        url : api.forent_url.base_url + "/inspection/plan/saveOrUpdateInspectionDetail/"+enterpriseId+"/"+planId,
        type :'POST',
        data: {
            companyId: enterpriseId,
            planId: planId,
            inspectionDetails: JSON.stringify(data)
        },
        success : function (res) {
            var code = res["code"];
            if(code == "success"){
                GS.$Message.success('保存成功！');
                var type = getGlobalVal('inspectionType');
                if(type == 'A'){ // A:防火巡查
                    $("#page").load('./page/prise-patrol/patrolDuty/main.html');
                }else{ // C:消防设施巡查
                    $("#page").load('./page/prise-patrol/patrolFacility/main.html');
                }
            }else{
                GS.$Message.error('保存失败！');
                ZS.PATROLCRUD.cartVm.isPending = false;
            }
        },
        error : function (err) {
            GS.$Message.error('保存失败！');
            ZS.PATROLCRUD.cartVm.isPending = false;
        }
    });
};

/**
 *  获取计划巡查内容
 * @private
 */
var getPlanInfo = function(callback,planId){
    // var planId = ZS.PATROLCRUD.plan.id;
    $.ajax({
        url : api.forent_url.base_url + "/inspection/plan/getInspectionDetail/"+planId,
        type :'GET',
        success : function (res) {
            var code = res["code"];
            if(code == "success"){
                callback(res['data']);
            }
        }
    });
};

export default{
    getEnterprisePic,
    getBuildFloorInfo,
    savePlan,
    getPlanInfo,
}