<template>
<el-row>
    <el-col :span="24">
        <Title />
        <el-tabs v-model.trim="tabName" type="border-card" @tab-click="handleClick" id="real-time-monitoring-device" height="100%">
            <el-tab-pane v-for="tab in tabs" :label="tab.name" :name="tab.id" :key="tab.id">
                <template v-if="tab.render">
                    <div slot="label" class="tab_lable">{{tab.name}}</div>
                    <MonitorSearch :widgetInfo="widgetInfo" v-on:updateSearchCondition="updateSearchCondition">
                        <span
                id="sum_num_name"
                slot="sum_num_name"
                style="overflow:hidden"
              >{{tab.monitorName}}:{{widgetInfo.totalNum}}</span>
                    </MonitorSearch>
                    <div class="reportNoTab">
                        <el-scrollbar>
                            <el-table :data="list.rows" stripe :row-style="rowStyle" :header-cell-style="headerCellStyle" :cell-style="cellStyle" v-loading="loading">
                                <el-table-column v-for="header in tabHeader" :prop="header.prop" :key="header.prop" :formatter="header.formatter" :show-overflow-tooltip="header.showOverFlowTooltip" :label="header.label"
                                ></el-table-column>
                            </el-table>
                        </el-scrollbar>
                        <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</el-row>
</template>

<script>
import api from "~/config/http";
import Title from "~/components/Title";
import deviceType from "~/assets/page/real-time-monitoring/js/deviceType.json";
import MonitorSearch from "~/components/MonitorReport/MonitorSearch";
import Table from "~/components/MonitorReport/Table1";
import Pagination from "~/components/Pagination";
import axios from "axios";
export default {
    components: {
        Title,
        MonitorSearch,
        Table,
        Pagination
    },
    mounted() {
        this.widgetInfo.floor.unitId = api.getGlobalVal("userObj").orgCode;
        this.widgetInfo.deviceType.deviceTypePid = "02000000";
        this.widgetInfo.floor.buildId = "";
        this.widgetInfo.deviceType.deviceTypeId = "";
        this.widgetInfo.runState.value = "";
        this.initDeviceTypeList(0);
        this.initBuildList();
        this.initHeader("0");
        this.initRunStatusList(0);
        // this.handleSearch();
        this.hasMounted = true;
    },
    data() {
        return {
            tabName: "0",
            TIMEOUT: 5000,
            // tab数据
            tabs: [{
                    name: "火灾自动报警系统",
                    monitorName:"火灾自动报警装置",
                    id: "0",
                    render: true
                },
                {
                    name: "用户信息传输装置",
                    monitorName:"用户信息传输装置",
                    id: "4",
                    render: false
                },
                {
                    name: "电气火灾监测",
                    monitorName:"电气火灾监测",
                    id: "1",
                    render: false
                },
                {
                    name: "消防供水监测",
                    monitorName:"消防供水监测",
                    id: "2",
                    render: false
                },
                {
                    name: "独立式监测设备",
                    monitorName:"独立式监测设备",
                    id: "3",
                    render: false
                },
                {
                    name: "防火门",
                    monitorName:"防火门监测",
                    id: "5",
                    render: false
                }
            ],
            tabHeader: [],
            hasMounted: false,
            // 列表数据
            list: [],
            loading: true,
            widgetInfo: {
                floor: {
                    unitId: "",
                    buildId: "",
                    buildName: ""
                },
                deviceType: {
                    deviceTypeId: "",
                    deviceTypePid: "",
                    label: ""
                },
                runState: {
                    label: "",
                    value: ""
                },
                // floor: '',
                // floor_unitId:'',
                // deviceType: '',
                // deviceTypePid:'',
                // runState: '',
                total: 0,
                pageSize: 1,
                pageNo: 1,
                listFloor: [],
                listDeviceType: [],
                listRunState: [{
                        id: "0",
                        label: "全部",
                        value: ""
                    },
                    {
                        id: "1",
                        label: "正常",
                        value: 0
                    },
                    {
                        id: "2",
                        label: "报警",
                        value: 1
                    },
                    {
                        id: "3",
                        label: "故障",
                        value: 2
                    },
                    {
                        id: "4",
                        label: "其他",
                        value: 3
                    }
                ]
            },
            rowStyle: {
                height: "48px",
                "font-size": "17px"
            },
            cellStyle: {
                "font-size": "16px"
            },
            headerCellStyle: {
                height: "60px",
                "background-color": "#eef5fc",
                "font-size": "1.5rem"
            }
        };
    },
    methods: {
        initDeviceTypeList(type) {
            this.widgetInfo.deviceType.deviceTypeId = "";
            var deviceTypeOpt = [];
            if (type == "0") {
                //火灾自动报警系统 父类id：02000000

                // api.get(api.forent_url.url+'/page/real-time-monitoring-device/js/deviceType.json').then(res => {
                //     //
                //     //
                //     this.widgetInfo.listDeviceType = res;
                //     this.widgetInfo.deviceType.deviceTypeId = res[0].value;
                // })
                this.widgetInfo.listDeviceType = deviceType;
                this.widgetInfo.deviceType.deviceTypeId = deviceType[0].value;
            } else if (type == "1") {
                //电器火灾监测, 父类ID:19000000
                deviceTypeOpt = [{
                    value: "19050000",
                    label: "电气火灾监控装置"
                }];
                this.widgetInfo.listDeviceType = deviceTypeOpt;
            } else if (type == "2") {
                //水压监测: 父类ID 19000000
                deviceTypeOpt = [{
                        value: "19020000,19030000,19080000,19150000,19180000",
                        label: "全部"
                    },
                    {
                        value: "19020000",
                        label: "室内消火栓水压监测装置"
                    },
                    {
                        value: "19030000",
                        label: "室外消火栓水压监测装置"
                    },
                    {
                        value: "19080000",
                        label: "喷淋末端自动试水装置"
                    },
                    {
                        // 19020000,19030000,19080000,19150000,19180000
                        value: "19150000",
                        label: "水位传感器"
                    },

                    {
                        value: "19180000",
                        label: "消防泵启停监测装置"
                    }
                ];
                this.widgetInfo.listDeviceType = deviceTypeOpt;
                // this.widgetInfo.deviceType.deviceTypeId = deviceTypeOpt[0]
            } else if (type == "3") {
                //独立式烟感
                deviceTypeOpt = [{
                    value: "19210000",
                    label: "独立式烟感"
                }];
                this.widgetInfo.listDeviceType = deviceTypeOpt;
            } else if (type == "4") {
                deviceTypeOpt = [{
                    value: "19010000",
                    label: "用户信息传输装置"
                }];
                this.widgetInfo.listDeviceType = deviceTypeOpt;
            } else if (type == "5") {
                deviceTypeOpt = [{
                    value: "19120000",
                    label: "防火门"
                }];
                this.widgetInfo.listDeviceType = deviceTypeOpt;
                this.widgetInfo.deviceType.deviceTypeId = deviceTypeOpt[0].value;
            }
        },
        initHeader(deviceType) {
            if (deviceType === "0" || "") {
                // 火灾自动报警
                var headers = [{
                        prop: "deviceName",
                        label: "设施名称",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceTypeName",
                        label: "设施类型",
                        minWidth: "15",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceAddress",
                        label: "设施地址",
                        minWidth: "25",
                        showOverFlowTooltip: true
                    },

                    // {
                    //     prop: "onlineStateDesc",
                    //     label: "在线状态",
                    //     'minWidth': "10",
                    //     //文字过长时显示tooltip
                    //     formatter:this.formatOnlineState,
                    //     'showOverFlowTooltip': true
                    // },
                    {
                        prop: "runState",
                        label: "运行状态",
                        minWidth: "10",
                        formatter: this.formatRunState,
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "laLoop",
                        label: "回路点位",
                        minWidth: "8",
                        formatter: this.formatLaLoop,
                        showOverFlowTooltip: true
                    },
                    /*{
                                  prop:"laPoint",
                                  label :"点位",
                                  'minWidth': "8",
                                  'showOverFlowTooltip' : true
                              },*/
                    {
                        prop: "updateTime",
                        label: "数据时间",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    }
                ];
                this.tabHeader = this.calcPercentWidth(headers);
                this.widgetInfo.floor.unitId = api.getGlobalVal("userObj").orgCode;
                this.widgetInfo.deviceType.deviceTypePid = "02000000";
                this.widgetInfo.floor.buildId = "";
                this.widgetInfo.deviceType.deviceTypeId = "";
                this.widgetInfo.runState.value = "";
                this.handleSearch();
            } else if (deviceType == "1") {
                // 电气火灾监测
                var headers = [{
                        prop: "deviceName",
                        label: "设施名称",
                        minWidth: "15",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceTypeName",
                        label: "设施类型",
                        minWidth: "15",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceAddress",
                        label: "设施地址",
                        minWidth: "15",
                        showOverFlowTooltip: true
                    },
                    /*{
                                  prop:"current",
                                  label :"电流(A)",
                                  'minWidth': "10",
                                  //文字过长时显示tooltip
                                  'showOverFlowTooltip' : true
                              },
                              {
                                  prop:"voltage",
                                  label :"电压(V)",
                                  'minWidth': "10",
                                  //文字过长时显示tooltip
                                  'showOverFlowTooltip' : true
                              },
                              {
                                  prop:"switchVal",
                                  label :"开关量",
                                  'minWidth': "10",
                                  //文字过长时显示tooltip
                                  'showOverFlowTooltip' : true
                              },*/
                    {
                        prop: "currentMa",
                        label: "剩余电流(A)",
                        minWidth: "10",
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "temA",
                        label: "A相温度/A相电流",
                        minWidth: "10",
                        //文字过长时显示tooltip
                        formatter: this.formatAtempelec,
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "temB",
                        label: "B相温度/B相电流",
                        minWidth: "10",
                        //文字过长时显示tooltip
                        formatter: this.formatBtempelec,
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "temC",
                        label: "C相温度/C相电流",
                        minWidth: "10",
                        //文字过长时显示tooltip
                        formatter: this.formatCtempelec,
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "temD",
                        label: "N相温度",
                        minWidth: "10",
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    /*{
                                  prop:"onlineStateDesc",
                                  label :"在线状态",
                                  'minWidth': "10",
                                  //文字过长时显示tooltip
                                  'showOverFlowTooltip' : true
                              },*/
                    {
                        prop: "runState",
                        label: "运行状态",
                        minWidth: "10",
                        //文字过长时显示tooltip
                        formatter: this.formatRunState,
                        showOverFlowTooltip: true
                    },
                    /* {
                                   prop:"laLoop",
                                   label :"回路",
                                   'minWidth': "5",
                                   'showOverFlowTooltip' : true
                               },
                               {
                                   prop:"laPoint",
                                   label :"点位",
                                   'minWidth': "5",
                                   'showOverFlowTooltip' : true
                               },*/
                    {
                        prop: "updateTime",
                        label: "数据时间",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    }
                ];
                this.tabHeader = this.calcPercentWidth(headers);
                this.widgetInfo.floor.unitId = api.getGlobalVal("userObj").orgCode;
                this.widgetInfo.deviceType.deviceTypePid = "19000000";
                this.widgetInfo.floor.buildId = "";
                this.widgetInfo.deviceType.deviceTypeId = "19050000";
                this.widgetInfo.runState.value = "";
                this.handleSearch();
            } else if (deviceType == "2") {
                // 水压监测
                var headers = [{
                        prop: "deviceName",
                        label: "设施名称",
                        minWidth: "13",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceTypeName",
                        label: "设施类型",
                        minWidth: "17",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceAddress",
                        label: "设施地址",
                        minWidth: "20",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "waterGage",
                        label: "压力值/水位值",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "voltage",
                        label: "电压",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "onlineStateDesc",
                        label: "在线状态",
                        minWidth: "10",
                        //文字过长时显示tooltip
                        formatter: this.formatOnlineState,
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "runState",
                        label: "运行状态",
                        minWidth: "10",
                        //文字过长时显示tooltip
                        formatter: this.formatRunState,
                        showOverFlowTooltip: true
                    },
                    /* {
                                   prop:"laLoop",
                                   label :"回路",
                                   'minWidth': "5",
                                   'showOverFlowTooltip' : true
                               },
                               {
                                   prop:"laPoint",
                                   label :"点位",
                                   'minWidth': "5",
                                   'showOverFlowTooltip' : true
                               },*/
                    {
                        prop: "updateTime",
                        label: "数据时间",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    }
                ];
                this.tabHeader = this.calcPercentWidth(headers);
                this.widgetInfo.floor.unitId = api.getGlobalVal("userObj").orgCode;
                this.widgetInfo.deviceType.deviceTypePid = "19000000";
                this.widgetInfo.floor.buildId = "";
                this.widgetInfo.deviceType.deviceTypeId =
                    "19020000,19030000,19080000,19150000,19180000";
                this.widgetInfo.runState.value = "";
                this.handleSearch();
            } else if (deviceType == "3") {
                // 独立式烟感
                var headers = [{
                        prop: "deviceId",
                        label: "设备ID",
                        minWidth: "13",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceName",
                        label: "设施名称",
                        minWidth: "13",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceTypeName",
                        label: "设施类型",
                        minWidth: "17",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceAddress",
                        label: "安装地址",
                        minWidth: "20",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "remaind",
                        label: "电池电量(%)",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "onlineStateDesc",
                        label: "在线状态",
                        minWidth: "10",
                        formatter: this.formatOnlineState,
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "runState",
                        label: "运行状态",
                        minWidth: "10",
                        formatter: this.formatRunState,
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "updateTime",
                        label: "数据时间",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    }
                ];
                this.tabHeader = this.calcPercentWidth(headers);
                this.widgetInfo.floor.unitId = api.getGlobalVal("userObj").orgCode;
                this.widgetInfo.deviceType.deviceTypePid = "19000000";
                this.widgetInfo.floor.buildId = "";
                this.widgetInfo.deviceType.deviceTypeId = "19210000";
                this.widgetInfo.runState.value = "";
                this.handleSearch();
            } else if (deviceType == "4") {
                // 用户信息传输
                var headers = [{
                        prop: "deviceName",
                        label: "设施名称",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceTypeName",
                        label: "设施类型",
                        minWidth: "15",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceAddress",
                        label: "设施地址",
                        minWidth: "25",
                        showOverFlowTooltip: true
                    },

                    {
                        prop: "onlineStateDesc",
                        label: "在线状态",
                        minWidth: "10",
                        formatter: this.formatOnlineState,
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "runState",
                        label: "运行状态",
                        minWidth: "10",
                        formatter: this.formatRunState,
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "laLoop",
                        label: "回路点位",
                        minWidth: "8",
                        formatter: this.formatLaLoop,
                        showOverFlowTooltip: true
                    },
                    /*{
                                  prop:"laPoint",
                                  label :"点位",
                                  'minWidth': "8",
                                  'showOverFlowTooltip' : true
                              },*/
                    {
                        prop: "updateTime",
                        label: "数据时间",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    }
                ];

                this.tabHeader = this.calcPercentWidth(headers);
                this.widgetInfo.floor.unitId = api.getGlobalVal("userObj").orgCode;
                this.widgetInfo.deviceType.deviceTypePid = "19000000";
                this.widgetInfo.floor.buildId = "";
                this.widgetInfo.deviceType.deviceTypeId = "19010000";
                this.widgetInfo.runState.value = "";
                this.handleSearch(this.widgetInfo, `devicetype:${deviceType}`);
            } else if (deviceType == "5") {
                // 用户信息传输
                var headers = [{
                        prop: "deviceName",
                        label: "设施名称",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceTypeName",
                        label: "设施类型",
                        minWidth: "15",
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "deviceAddress",
                        label: "设施地址",
                        minWidth: "25",
                        showOverFlowTooltip: true
                    },

                    {
                        prop: "onlineStateDesc",
                        label: "在线状态",
                        minWidth: "10",
                        formatter: this.formatOnlineState,
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    {
                        prop: "runState",
                        label: "运行状态",
                        minWidth: "10",
                        formatter: this.formatRunState,
                        //文字过长时显示tooltip
                        showOverFlowTooltip: true
                    },
                    // {
                    //     prop: "laLoop",
                    //     label: "回路点位",
                    //     'minWidth': "8",
                    //     formatter:this.formatLaLoop,
                    //     'showOverFlowTooltip': true,

                    // },
                    /*{
                                  prop:"laPoint",
                                  label :"点位",
                                  'minWidth': "8",
                                  'showOverFlowTooltip' : true
                              },*/
                    {
                        prop: "updateTime",
                        label: "数据时间",
                        minWidth: "10",
                        showOverFlowTooltip: true
                    }
                ];

                this.tabHeader = this.calcPercentWidth(headers);
                this.widgetInfo.floor.unitId = api.getGlobalVal("userObj").orgCode;
                this.widgetInfo.deviceType.deviceTypePid = "19000000";
                this.widgetInfo.floor.buildId = "";
                this.widgetInfo.deviceType.deviceTypeId = "19120000";
                this.widgetInfo.runState.value = "";
                this.handleSearch(this.widgetInfo, `devicetype:${deviceType}`);
            }
        },
        labelHead(h,{column,index}){
            let l = column.label.length
                    let f = 16 //每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
                   column.minWidth = f*l //字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
　　　　　　　　　　　　//然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
                    console.log(`column.minWidth:${column.minWidth}`);
                  return h('div',{class:'table-head',style:{width:'100%'}},[column.label])
        },
        initBuildList() {
            api
                .get(api.forent_url.e_record_url + "/record/enterpriseBulid", {
                    unitId: api.getGlobalVal("userObj").orgCode
                })
                .then(res => {
                    if (res && res.code == "success") {
                        res.data.unshift({
                            buildName: "全部",
                            buildId: "",
                            id: ""
                        });
                        this.widgetInfo.listFloor = res.data;
                        //
                        //
                        this.widgetInfo.floor.buildId = res.data[0].buildId;
                        this.widgetInfo.floor.unitId = res.data[0].unitId;
                        this.widgetInfo.floor.buildName = res.data[0].buildName;
                    }
                });
        },
        updateSearchCondition(widgetInfo) {
            this.handleSearch(this.widgetInfo, "updateSearchCondition");
        },

        handleClick(tab) {
            var deviceType = tab.name;
            // 动态控制每个tabpane的渲染
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].name == tab.label) {
                    this.tabs[i].render = true;
                } else {
                    this.tabs[i].render = false;
                }
            }

            //
            this.initDeviceTypeList(deviceType);
            this.initBuildList();
            this.initHeader(deviceType);
            this.initRunStatusList(deviceType);
            // this.int
        },
        sonHandleCurrentChange(widgetInfo) {
            // 处理分页信息并赋值
            this.widgetInfo.pageSize = widgetInfo.pageSize ?
                parseInt(widgetInfo.pageSize) :
                this.widgetInfo.pageSize;
            this.widgetInfo.pageNo = widgetInfo.pageNo ?
                parseInt(widgetInfo.pageNo) :
                this.widgetInfo.pageNo;

            if (this.hasMounted) {
                this.handleSearch("", "sonHandleCurrentChange");
            }
            //重新加载列表
        },
        handleSearch(data, caller) {
            this.loading = true;
            let params = {
                unitId: this.widgetInfo.floor.unitId || api.getGlobalVal("userObj").orgCode,
                buildId: this.widgetInfo.floor.buildId,
                deviceTypeId: this.widgetInfo.deviceType.deviceTypeId,
                deviceTypePid: this.widgetInfo.deviceType.deviceTypePid,
                runState: this.widgetInfo.runState.value,
                pageSize: this.widgetInfo.pageSize || 10,
                pageNo: this.widgetInfo.pageNo || 1
            };
            api
                .post(
                    api.forent_url.monitor_url + "/monitor/getDevicePageByCondition",
                    params,
                    this.TIMEOUT
                )
                .then(res => {
                    if (res && res.code == "success") {
                        this.loading = false;
                        this.widgetInfo.totalNum = Number.parseInt(res.data.total);
                        this.widgetInfo.total = Number.parseInt(res.data.total) || 0;
                        this.list = res.data;
                    }
                })
                .catch(error => {
                    this.$message({
                        type: "warning",
                        message: "加载超时，请重新加载！"
                    });
                    this.loading = false;
                });
        },
        initRunStatusList(type) {
            if (type == "1") {
                var runOpt = [{
                        value: "",
                        label: "全部"
                    },
                    {
                        value: "0",
                        label: "正常"
                    },
                    {
                        value: "1",
                        label: "报警"
                    },
                    {
                        value: "2",
                        label: "故障"
                    },
                    {
                        value: "98",
                        label: "预警"
                    },
                    {
                        value: "3",
                        label: "其他"
                    }
                ];
            } else if (type == '5') {
                var runOpt = [{
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '0',
                        label: '正常'
                    }, {
                        value: '1',
                        label: '报警'
                    }, {
                        value: '2',
                        label: '故障'
                    }, {
                        value: '96',
                        label: '开启'
                    }, {
                        value: '97',
                        label: '关闭'
                    }
                ];
            } else {
                var runOpt = [{
                        value: "",
                        label: "全部"
                    },
                    {
                        value: "0",
                        label: "正常"
                    },
                    {
                        value: "1",
                        label: "报警"
                    },
                    {
                        value: "2",
                        label: "故障"
                    },
                    {
                        value: "3",
                        label: "其他"
                    }
                ];
            }
            this.widgetInfo.listRunState = runOpt;
        },
        calcPercentWidth(headers) {
            var flag = false;
            var total = 0;
            var totalPercent = 0;
            var width = 0;
            var res = 0;
            for (var i = 0; i < headers.length; i++) {
                total += Number.parseFloat(headers[i].minWidth);
            }
            for (var i = 0; i < headers.length; i++) {
                width = Number.parseFloat(headers[i].minWidth);
                res = Number.parseFloat(width / total).toFixed(4);
                headers[i].percentWidth = res;

                totalPercent += Number.parseFloat(headers[i].percentWidth);
            }

            return headers;
        },
        transformRequestParams(
            unitId,
            buildId,
            deviceTypeId,
            deviceTypePid,
            runState,
            totalNum,
            pageSize,
            pageNo
        ) {
            return {
                unitId: unitId || "",
                deviceTypePid: deviceType.substr(0, 2) + "000000",
                buildId: floor || "",
                deviceTypeId: deviceType || "",
                runState: runState || "",
                pageSize: pageSize || 10
            };
        },
        formatRunState(item) {
            if (item.onlineState == "2" || item.onlineState == "0") {
                return "--";
            } else {
                if (item.runState == "0") {
                    return "正常";
                } else if (item.runState == "1") {
                    return "报警";
                } else if (item.runState == "2") {
                    return "故障";
                } else {
                    return "其他";
                }
            }
            // return (item.runState=='0'||!!item.runState)?'离线':'在线'
        },
        formatOnlineState(item) {
            if (item.onlineState == "1") {
                return "在线";
            } else if (item.onlineState == "0") {
                return "离线";
            } else {
                return "未接入";
            }
            if (item.onlineState == "2" || item.onlineState == "0") {
                return "--";
            } else {
                if (item.runState == "0") {
                    return "正常";
                } else if (item.runState == "1") {
                    return "报警";
                } else if (item.runState == "2") {
                    return "故障";
                } else {
                    return "其他";
                }
            }
        },
        formatLaLoop(item) {
            var laLoopDesc = !!item.laLoop ? item.laLoop : "";
            var laPointDesc = !!item.laPoint ? item.laPoint : "";
            return `${laLoopDesc}-${laPointDesc}`;
        },
        formatAtempelec(item) {
            return `${item.temA}/${item.maA}`;
        },
        formatBtempelec(item) {
            return `${item.temB}/${item.maB}`;
        },
        formatCtempelec(item) {
            return `${item.temC}/${item.maC}`;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/table.scss";

.el-row {
    height: 100%;

    .el-col {
        .el-tab-pane {
            height: 100%;
            background-color: #fff;

            // height: calc(100vh - 175px);
            .el-row {
                height: calc(10vh);
            }
        }

        .el-tabs__header {
            // margin-bottom: -5px;
            // background-color: none;
        }

        .el-tabs--card {
            .el-tabs__header {
                .el-tabs__nav {
                    border-left: none;
                    background-color: #edf0f7;
                }
            }

            /* 选项卡面板内容 */
            // .el-tabs__content {
            //     background-color: #fff;
            //     padding: 0;
            // }
        }

        .el-tabs--border-card {
            box-shadow: none;
            background-color: none;
            border: none;
        }

        .el-tabs__nav {
            line-height: 4rem;
            height: 4rem;
        }

        /* 选项卡面板内容 */
        .el-tabs__content {
            background-color: #fff;
            padding: 0;
        }

        /* 选项卡部分 */
        // .el-tabs__item {
        //     height: 50px;
        //     line-height: 50px;
        //     // box-shadow: 0 -2px 2px #c5cfe8;
        //     box-shadow: 0 -2px 2px #fff;
        // }

        .el-tabs__item.is-top {
            font-size: 1.8rem;
            background: #f0f3fa;
            border-radius: 3px;
            box-shadow: 0 -2px 2px #c5cfe8;
            padding: 0 3rem;
        }

        .el-tabs__item.is-hover {
            background: none;
        }
    }

    .nihao.wohao {
        background-color: red;
    }
}
</style>
<style lang="scss">
// 清空tab主容器内左右padding，使表格宽度100%
div#real-time-monitoring-device.el-tabs {
    .el-tabs__header {
        // box-sizing:border-box;
        background-color: #edf0f7;
        display: inline-block;
        width: 100%;

        .el-tabs__nav-wrap {
            // FIXED:选项卡阴影样式问题修复 2019年2月12日15:26:27
            overflow: inherit;

            .el-tabs__nav-scroll {
                overflow: inherit;
                .el-tabs__nav{
                    // FIXED:选项卡白边问题修复 2019年2月12日15:25:40
                    margin-bottom:-1px;
                }
                .el-tabs__item {
                    float: left;
                    height: 100%;
                    text-align: center;
                    // padding: 0 3rem;
                    background-color: #f0f3fa;
                    border-radius: 3px;
                    box-shadow: 0 -2px 2px #c5cfe8 !important;
                    font-size: 1.5rem;
                    color: #000;
                    cursor: pointer;
                }

                .el-tabs__item.is-active {
                    background-color: #fff;
                    // color: #000;
                    color: #1c7ff3;
                }
            }
        }
    }

    .el-tabs__content {
        padding: {
            left: 0;
            right: 0;
        }
        .el-table .cell {
            line-height: 23px !important;
        }
    }
}
</style>
