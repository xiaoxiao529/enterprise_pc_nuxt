import api from '~/config/http';
/**
 *  楼层设备条件查询  表单初始化
 * @param id
 * @private
 */
var _form_init = function(id) {
    var options = {
        containerId: id,
        formId: "queryForm",
        data: {
            fromObj: [{
                number: 5,
                rowClass: 'floor-header',
                children: [{
                    label: '楼栋：',
                    containerId: "floor-build-select",
                    classes: "gs-el-col-left"
                }, {
                    label: '设施系统：',
                    containerId: "floor-type1-select",
                    classes: "gs-el-col-left"
                }, {
                    label: '设施：',
                    containerId: "floor-type2-select",
                    classes: "gs-el-col-left"
                }, {
                    label: '设施状态：',
                    containerId: "floor-status-select",
                    classes: "gs-el-col-left gs-el-col-small"
                }, {
                    containerId: "monitor-floor-btn",
                    classes: "gs-el-col-left",
                    template: '<button type="button" id="floorQueryBtn" class="gs-el-button gs-el-button--primary gg-floor-btn">查询</button>'
                }]
            }]
        }
    };
    ZS.MONITOR.floorForm = GS.gs_form.create(options);
    if ($('#queryForm').width() > 942) {
        $('.gs-el-col-small').show();
    } else {
        $('.gs-el-col-small').hide();
    }
    window.onresize = function() {
        if ($('#queryForm').width() > 942) {
            $('.gs-el-col-small').show();
        } else {
            $('.gs-el-col-small').hide();
        }
    }
};

/**
 *  区域（选择建筑下拉框）
 * @param id
 * @private
 */
var _createBuildSelect = function(id) {
    var opts = [];
    if (ZS.MONITOR.buildData) {
        for (var key in ZS.MONITOR.buildData) {
            var temp = {};
            temp.value = ZS.MONITOR.buildData[key].buildId;
            temp.label = ZS.MONITOR.buildData[key].buildName;
            opts.push(temp);
        }
    }
    var options = {
        containerId: id,
        data: {
            name: 'buildId',
            placeholder: '',
            width: '60%',
            options: opts,
            value: ZS.MONITOR.currentBuild
        },
        methods: {

        }
    };
    ZS.MONITOR.buildSelect = GS.gs_select.create(options);
};

/**
 *  创建设备类型下拉框
 * @private
 */
var _createDeviceTypeSelect = function() {
    ZS.MONITOR.deviceQueryType = '';
    api.post("/remoteApi/tool/deviceInfo/getDeviceInfoList").then(data => {
        var data = data['data'] || [];
        ZS.MONITOR.deviceType = _toTreeData(data);

        // 设备大类
        var opts1 = [{
            value: '00000000',
            label: '全部'
        }];
        if (ZS.MONITOR.deviceType[0] != undefined) {
            var type1Arr = ZS.MONITOR.deviceType[0].children;
            for (var key in type1Arr) {
                var temp = {};
                temp.value = type1Arr[key].id;
                temp.label = type1Arr[key].name;
                opts1.push(temp);
            }
        }
        var options1 = {
            containerId: 'floor-type1-select',
            data: {
                name: 'device-type1',
                placeholder: '',
                width: '70%',
                options: opts1,
                value: '00000000'
            },
            methods: {
                click: function(val) {
                    var optsTemp = [{
                        value: '00000000',
                        label: '全部'
                    }];
                    if (ZS.MONITOR.deviceType[0] != undefined) {
                        var type1Arr = ZS.MONITOR.deviceType[0].children;
                        for (var key in type1Arr) {
                            if (type1Arr[key].id == val) {
                                var typeStr = ''; //设备类型查询
                                var type2Arr = type1Arr[key].children;
                                for (var key2 in type2Arr) {
                                    var temp = {};
                                    temp.value = type2Arr[key2].id;
                                    temp.label = type2Arr[key2].name;
                                    optsTemp.push(temp);
                                    typeStr = typeStr + ',' + temp.value;
                                }
                                if (typeStr.length > 0) {
                                    ZS.MONITOR.deviceQueryType = typeStr.substr(1);
                                }
                            }
                        }
                    }
                    ZS.MONITOR.deviceType2Select.options = optsTemp;
                    ZS.MONITOR.deviceType2Select.value = '00000000';
                    if (val == '00000000') {
                        ZS.MONITOR.deviceQueryType = '';
                    }
                }
            }
        };
        ZS.MONITOR.deviceType1Select = GS.gs_select.create(options1);

        // 设备小类
        var opts2 = [{
            value: '00000000',
            label: '全部'
        }];
        var options2 = {
            containerId: 'floor-type2-select',
            data: {
                name: 'device-type2',
                placeholder: '',
                width: '60%',
                options: opts2,
                value: '00000000'
            },
            methods: {
                click: function(val) {
                    if (val == '00000000') {
                        var typeStr = '';
                        for (var key in this.options) {
                            if (this.options[key].value != '00000000') {
                                typeStr = typeStr + ',' + this.options[key].value;
                            }
                        }
                        if (typeStr.length > 0) {
                            ZS.MONITOR.deviceQueryType = typeStr.substr(1);
                        }
                    } else {
                        ZS.MONITOR.deviceQueryType = val;
                    }
                }
            }
        };
        ZS.MONITOR.deviceType2Select = GS.gs_select.create(options2);
    })
};

/**
 *  将设备类型原始数据转为树形结构
 * @param data
 * @returns {Array}
 * @private
 */
var _toTreeData = function(data) {
    var pos = {};
    var tree = [];
    var i = 0;
    while (data.length != 0) {
        if (data[i].parentid == -1) {
            tree.push({
                id: data[i].id,
                name: data[i].name,
                children: []
            });
            pos[data[i].id] = [tree.length - 1];
            data.splice(i, 1);
            i--;
        } else {
            var posArr = pos[data[i].parentid];
            if (posArr != undefined) {

                var obj = tree[posArr[0]];
                for (var j = 1; j < posArr.length; j++) {
                    obj = obj.children[posArr[j]];
                }

                obj.children.push({
                    id: data[i].id,
                    name: data[i].name,
                    children: []
                });
                pos[data[i].id] = posArr.concat([obj.children.length - 1]);
                data.splice(i, 1);
                i--;
            }
        }
        i++;
        if (i > data.length - 1) {
            i = 0;
        }
    }
    return tree;
};

/**
 *  创建设备状态下拉框
 * @private
 */
var _createDeviceStatusSelect = function() {
    var options = {
        containerId: 'floor-status-select',
        data: {
            name: 'device_status',
            placeholder: '',
            width: '60%',
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '0',
                label: '正常'
            }, {
                value: '1',
                label: '报警'
            }, {
                value: '2',
                label: '故障'
            }],
            value: ''
        },
        methods: {

        }
    };
    ZS.MONITOR.deviceStatusSelect = GS.gs_select.create(options);
};

/**
 * 根据建筑id获取建筑楼层列表
 * @param enterpriseId 企业id
 * @param buildId 建筑id
 * @param callback
 * @private
 */
var _getFloorListByBuildId = function(enterpriseId, buildId, callback) {
    API.POST('/remoteApi/tool/floor/getFloorInfoByUnitIdAndBuildId', {
        unitId: "CKJGQ_20180312",
        buildId: "CKJGQ_20180312_001"
    }).then(data => {
        var data = data['data'] || [];
        console.log(data)
        callback(data);
    })
};

/**
 * 根据楼层id获取设备列表
 * @param floorId 楼层id
 * @param buildId 建筑id
 * @param callback
 * @private
 */
var _getEquipmentListByFloorId = function(floorId, buildId, callback) {
    var enterpriseId = JSON.parse(getGlobalVal('userObj')).orgCode; //当前监测企业id
    var deviceTypeId = ZS.MONITOR.deviceQueryType || '';
    var runState = ZS.MONITOR.deviceStatusSelect.value || '';
    var params = {
        unitId: ZS.MONITOR.enterpriseId,
        floorId: floorId,
        buildId: buildId,
        deviceTypeIds: deviceTypeId,
        runState: runState
    }
    api.post('/remoteApi/tool/monitor/getDeviceListByCondition', params).then(data => {
        var data = data['data'] || [];
        callback(data);
    })

};



export default {
    form_init: _form_init,
    createBuildSelect: _createBuildSelect,
    createDeviceTypeSelect: _createDeviceTypeSelect,
    createDeviceStatusSelect: _createDeviceStatusSelect,
    getFloorListByBuildId: _getFloorListByBuildId,
    getEquipmentListByFloorId: _getEquipmentListByFloorId
};