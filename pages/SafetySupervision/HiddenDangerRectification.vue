<template>
  <div>
    <!-- 面包屑 -->
    <Title />
    <div class="AlarmCheck_main">
      <!-- 搜索框 -->
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline filterAll">
          <el-row>
            <el-col :span="4" class="text-4">
              <label>隐患状态：</label>
              <el-select v-model.trim="formInline.processState" clearable placeholder="全部" @change="selectProcessState">
                <el-option v-for="item in options1" :key="item.processState" :label="item.HiddenDanger" :value="item.processState">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="17">
              <el-row type="flex" justify="center">
                <el-col :span="5" class="text-3">
                  <label>楼栋：</label>
                  <el-select v-model.trim="formInline.build" clearable placeholder="全部" @change="selectStoriedBuilding">
                    <el-option :label="item.buildName" :value="item.buildId" v-for="item in floors" :key="item.buildId"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4" class="text-3">
                  <label>楼层：</label>
                  <el-select v-model.trim="formInline.floor" clearable placeholder="请选择" @change="selectFloor">
                    <el-option :label="item.floorName" :value="item.floorId" v-for=" item in floorNum" :key="item.floorId"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" class="text-4">
                  <label>是否逾期：</label>
                  <el-select v-model.trim="formInline.isOverdued" clearable placeholder="全部" @change="selectBeOverdue">
                    <el-option v-for="item in options3" :key="item.isOverdued" :label="item.BeOverdue" :value="item.isOverdued">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="10" class="text-4">
                  <label>上报时间：</label>
                  <el-date-picker clearable value-format="yyyy-MM-dd" v-model.trim="dateTime" @change="selectDateTime" range-separator="" type="daterange" :picker-options="pickerOptions" start-placeholder="请选择日期">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3">
              <el-input v-model.trim="searchValue" placeholder="请输入隐患编号" clearable @change="InputPlan">
                <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="notab" id="tab">
        <!-- 表格 -->
        <el-scrollbar>
          <el-table @row-click="hiddenDangerRectification" v-loading="isLoading" :data="tableData" stripe>
            <el-table-column min-width="12%" :show-overflow-tooltip="true" pageSize="pageSize" prop="accidentNo" label="隐患编号">
            </el-table-column>
            <el-table-column min-width="12%" :show-overflow-tooltip="true" prop="build" label="楼栋">
            </el-table-column>
            <el-table-column min-width="7%" :show-overflow-tooltip="true" prop="floor" label="楼层">
            </el-table-column>
            <el-table-column min-width="15%" :show-overflow-tooltip="true" prop="deviceAddress" label="隐患位置">
            </el-table-column>
            <el-table-column min-width="15%" :show-overflow-tooltip="true" prop="receiveTime" label="上报时间">
            </el-table-column>
            <el-table-column min-width="10%" :show-overflow-tooltip="true" prop="reportChannel" label="上报途径">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                  <div>{{scope.row.reportChannel==""?"":scope.row.reportChannel=="0"?"物联网监测":scope.row.reportChannel=="1"?"人工上报":scope.row.reportChannel=="2"?"报警复核":scope.row.reportChannel=="3"?"巡检巡查":""}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="10%" :show-overflow-tooltip="true" prop="processState" :formatter="formatter" label="隐患状态">
            </el-table-column>
            <el-table-column min-width="14%" :show-overflow-tooltip="true" prop="rectificationDate" label="整改截止时间">
              <template slot-scope="scope">
                <span v-if="scope.row.rectificationDate == null"></span>
                <span v-if="scope.row.rectificationDate != null">{{scope.row.rectificationDate.substring(0,10)}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="10%" :show-overflow-tooltip="true" label="是否逾期">
              <template slot-scope="scope">
                <div class="gs-el-button-group--gapSmall">
                  <div>{{scope.row.isOverdued=="0"?"未逾期":scope.row.isOverdued=="1"?"已逾期"+scope.row.overdue+"天":""}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="5%">
              <template slot-scope="scope">
                <span v-if="scope.row.rectificationSuggestion">
                  <el-tooltip content="查看" placement="bottom">
                    <el-button @click="see(scope.row)" type="text" style="font-size: 16px" icon="icon-l-new l-icons ggicon-newtime"></el-button>
                  </el-tooltip>
                </span>
                <span v-else-if="scope.row.processState!='已完成'">
                  <el-tooltip content="修改" placement="bottom">
                    <el-button @click="modify(scope.row)" type="text" style="font-size: 16px" icon="icon-l-new l-icons ggicon-alters"></el-button>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column min-width="8%">
              <template slot-scope="scope">
                <span v-if="scope.row.processState!='已完成'">
                  <el-tooltip content="催促" placement="bottom">
                    <el-button @click="Urge(scope.row)" type="text" style="font-size: 16px" icon="icon-l-new l-icons ggicon-notification">催促</el-button>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <!--分页器-->
        <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
      </div>
    </div>
    <!-- 详情页 -->
    <el-dialog title="隐患整改" :visible.sync="DetailsPage" :close-on-click-modal="false" width="1100px" style="margin: 0 auto; text-align: left;">
      <el-scrollbar>
        <div class="gg-base-info" style="height: 500px;">
          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">隐患基本信息</h3>
            <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th class="color_gray">隐患编号 :</th>
                  <td class="w_420">{{data.accidentNo}}</td>
                  <th class="color_gray">设施类型 :</th>
                  <td class="w_420">{{data.deviceType}}</td>
                </tr>
                <tr>
                  <th class="color_gray">隐患状态 :</th>
                  <td class="w_420">
                    <span v-if="data.processState == '0' && data.managementDemand != '1'">待处理</span>
                    <span v-else-if="data.processState == '1' && data.managementDemand != '1'">整改中</span>
                    <span v-else-if="data.processState != '2' && data.managementDemand == '1'">维保中</span>
                    <span v-else-if="data.processState == '2'">已完成</span>
                  </td>
                  <th class="color_gray">设施编号 :</th>
                  <td class="w_420">{{data.deviceId}}</td>
                </tr>
                <tr>
                  <th class="color_gray">上报时间 :</th>
                  <td class="w_420">{{data.receiveTime}}</td>
                  <th class="color_gray">回路点位 :</th>
                  <td class="w_420">{{data.laLoop}}-{{data.laPoint}}</td>
                </tr>
                <tr>
                  <th class="color_gray">隐患来源 :</th>
                  <td class="w_420">
                    <span v-if="data.reportChannel == ''"> </span>
                    <span v-else-if="data.reportChannel == '0'">物联网监测</span>
                    <span v-else-if="data.reportChannel == '1'">人工上报</span>
                    <span v-else-if="data.reportChannel == '2'">报警复核</span>
                    <span v-else-if="data.reportChannel == '3'">巡检巡查</span>
                  </td>
                  <th class="color_gray">上报人 :</th>
                  <td class="w_420">{{data.reportUser}}</td>
                </tr>
                <tr>
                  <th class="color_gray">隐患位置 :</th>
                  <td class="w_420">{{data.deviceAddress}}</td>
                </tr>
                <tr>
                  <th class="color_gray">隐患内容 :</th>
                  <td class="w_420">{{data.deviceDescription}}</td>
                </tr>
                <tr>
                  <th class="color_gray">整改时限 :</th>
                  <td class="w_420">
                    <span v-if="data.rectificationDate == null">无</span>
                    <span v-else>{{data.rectificationDate}}</span>
                  </td>
                </tr>
                <tr>
                  <th class="color_gray">整改意见 :</th>
                  <td class="w_420">
                    <span v-if="data.rectificationSuggestion == null">无</span>
                    <span v-else>{{data.rectificationSuggestion}}</span>
                  </td>
                </tr>
                <tr>
                  <th class="color_gray">现场图片 :</th>
                  <td v-if="urlList.length === 0">
                  </td>
                  <td v-else-if="urlList.length !== 0">
                    <img :src=item v-for="(item, index) in urlList" :key="index" alt="" class="img" @click="enlarge(item)">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">整改记录</h3>
            <!-- GZ201812114389 -->
            <div v-if="RectificationRecord != null && RectificationRecord.length > 0">
              <table class="gg-table gg-tableFix" style="width: 97%;">
                <tbody>
                  <div v-for="(item, index) in RectificationRecord" :key="index">
                    <el-col :span="1">
                      <div class="border"><span class="num">{{index + 1}}</span></div>
                    </el-col>
                    <el-col :span="23">
                      <div>
                        <tr>
                          <!-- <th>整改时间：</th> -->
                          <td class="black">{{item.alarmAccidentIssue.createTime}}</td>
                          <td style="width: 20px;" class="black"></td>
                          <!-- <th>整改人：</th> -->
                          <td class="black">{{item.alarmAccidentIssue.createUserId}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <th class="black" style="width: 80px;">整改描述：</th>
                          <td class="black">{{item.alarmAccidentIssue.issueDesc}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <!-- <th>附件：</th> -->
                          <td v-if="item.RectificationUrl.length == 0">
                          </td>
                          <td v-else-if="item.RectificationUrl != null && item.RectificationUrl.length > 0">
                            <img :src=item v-for="(item, index) in item.RectificationUrl" :key="index" alt="" class="img" @click="enlarge(item)">
                          </td>
                        </tr>
                      </div>
                    </el-col>
                  </div>
                </tbody>
              </table>
            </div>
            <div v-else class="none">暂无信息</div>
          </div>

          <div class="gg-base-unit">
            <h3 class="gg-base-h3 black">维保记录</h3>
            <!-- GZ201812060213 -->
            <div v-if="MaintenanceRecord != null && MaintenanceRecord.length > 0">
              <table class="gg-table gg-tableFix" style="width: 97%;">
                <tbody>
                  <div v-for="(item, index) in MaintenanceRecord" :key="index">
                    <el-col :span="1">
                      <div class="border"><span class="num">{{index + 1}}</span></div>
                    </el-col>
                    <el-col :span="23">
                      <div>
                        <tr>
                          <!-- <th>整改时间：</th> -->
                          <td class="black">{{item.maintenanceTime}}</td>
                          <td style="width: 20px;"></td>
                          <!-- <th>整改人：</th> -->
                          <td class="black">{{item.maintenanceUserName}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <th class="black" style="width: 80px;">问题定位：</th>
                          <td class="black">{{item.problemFix}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <th class="black" style="width: 80px;">处置描述：</th>
                          <td class="black">{{item.maintenanceDesc}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <th class="black" style="width: 80px;">应急措施：</th>
                          <td class="black">{{item.emergencyHandle}}</td>
                        </tr>
                      </div>
                      <div>
                        <tr>
                          <!-- <th>附件：</th> -->
                          <td v-if="item.MaintenanceUrl.length == 0">
                          </td>
                          <td v-else-if="item.MaintenanceUrl != null && item.MaintenanceUrl.length > 0">
                            <img :src=item v-for="(item, index) in item.MaintenanceUrl" :key="index" alt="" class="img" @click="enlarge(item)">
                          </td>
                        </tr>
                      </div>
                    </el-col>
                  </div>
                </tbody>
              </table>
            </div>
            <div v-else class="none">暂无信息</div>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
    <!-- 显示图片 -->
    <el-dialog title="图片详情" :visible.sync="pictureDetails" :close-on-click-modal="false" style="width: 77%; margin: 0 auto;">
      <el-scrollbar>
        <div style="max-height: 500px;max-width: 500px;">
          <img :src=url style="cursor:pointer;width:100%;height:100%;" alt="">
        </div>
      </el-scrollbar>
    </el-dialog>
    <!-- 查看对话框 -->
    <el-dialog title="整改意见" :visible.sync="ViewDialogBox" :close-on-click-modal="false" style="width: 77%; margin: 0 auto;">
      <table class="gg-table gg-tableFix" cellspacing="0" cellpadding="0" style="height: 273px;">
        <tbody>
          <tr>
            <th style="width: 100px;">整改意见 :</th>
            <td style="text-align:left;">{{RectificationOpinion}}</td>
          </tr>
          <tr>
            <th>截至日期 :</th>
            <td style="text-align:left;">{{UpDate}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog title="整改意见" :visible.sync="Rectification" :close-on-click-modal="false" style="width: 77%; margin: 0 auto;" @close="handleURLDialogClose('form')">
      <el-scrollbar>
        <div style="height: 300px;">
          <el-form :model="form" :rules="rules" ref="form" label-width="80px" style="padding: 0 40px;">
            <el-form-item label="整改意见" prop="RectificationList">
              <el-input clearable type="textarea" placeholder="整改意见" v-model.trim="form.RectificationList"></el-input>
            </el-form-item>
            <el-form-item label="截至日期" prop="UpToDate">
              <el-date-picker :picker-options="pickerOptions1" v-model.trim="form.UpToDate" type="date" placeholder="请选择日期" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button type="primary" style="margin-top: 100px;margin-bottom: 20px; width: 90px;" @click="Preservation('form')">保 存</el-button>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>
<script>
import api from '~/config/http';
import Title from '~/components/Title';
import axios from 'axios';
import Pagination from "~/components/Pagination";
export default {
  components: {
    Title,
    Pagination
  },
  data() {
    return {
      widgetInfo: {
        total: null,
        pageSize: 6,
        pageNo: 1
      },
      tableData: [],
      isLoading: false,
      formInline: {
        typeName: '',
        reportTypeId: '',
        bgtype: '',
        taskNo: '',
        isOverdued: '',
        // 复核结果
        alarmState: '',
        // 是否规范
        isRegular: '',
        // 楼栋
        build: '',
        // 楼层
        floor: '',
        // 搜索类型
        searchType: '',
        unitId: '',
        processState: ''
      },
      data: {
        laPoint: '',
      },
      datas: '',
      num: 0,
      nums: 0,
      base_url: '',
      urlList: [],
      url: '',
      RectificationRecord: [],
      RectificationUrl: [],
      MaintenanceRecord: [],
      MaintenanceUrl: [],
      Rectification_base_url: '',
      Maintenance_base_url: '',
      DetailsPage: false,
      pictureDetails: false,
      ViewDialogBox: false,
      Rectification: false,
      RectificationOpinion: '',
      UpDate: '',
      // 搜索值
      searchValue: '',
      // 楼栋筛选
      floors: [],
      // 楼层
      floorNum: [],
      // 下拉选项
      options1: [
        {
          HiddenDanger: '全部',
          processState: ''
        }, {
          HiddenDanger: '待处理',
          processState: '1'
        }, {
          HiddenDanger: '整改中',
          processState: '2'
        }, {
          HiddenDanger: '维保中',
          processState: '3'
        }, {
          HiddenDanger: '已完成',
          processState: '4'
        }
      ],
      options3: [
        {
          BeOverdue: '全部',
          isOverdued: ''
        }, {
          BeOverdue: '未逾期',
          isOverdued: '0'
        }, {
          BeOverdue: '已逾期',
          isOverdued: '1'
        }
      ],
      form: {
        RectificationList: '',
        UpToDate: '',
        id: ''
      },
      // 对话框日期选择
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      rules: {
        RectificationList: [
          { required: true, message: '*此处不可为空', trigger: 'blur' }
        ],
        UpToDate: [
          { required: true, message: '*此处不可为空', trigger: 'blur' }
        ]
      },
      dateTime: '',
      // 日期选择器
      pickerOptions: {
        onClick(picker) {
          let end = new Date();
          let start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      },
    };
  },
  methods: {
    handleURLDialogClose(refName) {
      this.$refs[refName].clearValidate();
      this.$refs[refName].resetFields();
    },
    formatter(row, column) {
      if (row.processState != "待处理" && row.processState != "整改中" && row.processState != "维保中" && row.processState != "已完成") {
        if (row.processState == '0' && row.managementDemand != '1') {
          row.processState = "待处理"
        }
        if (row.processState == '1' && row.managementDemand != '1') {
          row.processState = "整改中"
        }
        if (row.processState != '2' && row.managementDemand == '1') {
          row.processState = "维保中"
        }
        if (row.processState == '2') {
          row.processState = "已完成"
        }
      }
      return row.processState
    },
    // 显示隐患整改详情
    async hiddenDangerRectification(row, event, column) {
      // console.log(event.target.nodeName, '@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      if (event.target.nodeName === "DIV") {
        let that = this
        this.DetailsPage = true;
        await api.get(api.forent_url.moblie_url + "/accidentInfo/" + row.id)
          .then(res => {
            // console.log('res==================', res)
            // 图片
            that.data = res.accidentInfo;
            that.RectificationRecord = res.alarmAccidentDetails.reverse();
            that.num = that.RectificationRecord.length;
            that.nums = that.MaintenanceRecord.length;
            that.MaintenanceRecord = res.recordArray;
            that.nums = that.MaintenanceRecord.length;
            // console.log('that.data', that.data)
            // console.log('that.RectificationRecord', that.RectificationRecord)
            if (res.attaches.length === 0) {
              that.urlList = []
            } else {
              that.urlList = []
              res.attaches.forEach(element => {
                that.base_url = api.forent_url.pic_url + '/' + element.attachPath
                // console.log('that.base_url', that.base_url)
                that.urlList.push(that.base_url)
              });
            }
            // console.log('res.attaches', res.attaches)
            // console.log('that.urlList', that.urlList)
            if (that.RectificationRecord != null && that.RectificationRecord.length > 0) {
              that.RectificationRecord.forEach(element => {
                element.RectificationUrl = []
                element.attaches.forEach(ele => {
                  that.Rectification_base_url = api.forent_url.pic_url + '/' + ele.attachPath
                  // console.log('that.Rectification_base_url', that.Rectification_base_url)
                  element.RectificationUrl.push(that.Rectification_base_url)
                });
                // console.log('element.RectificationUrl', element.RectificationUrl)
              });
            }
            if (that.MaintenanceRecord != null && that.MaintenanceRecord.length > 0) {
              that.MaintenanceRecord.forEach(element => {
                element.MaintenanceUrl = []
                element.recordAttach.forEach(ele => {
                  that.Maintenance_base_url = api.forent_url.pic_url + '/' + ele.attachPath
                  // console.log('that.Maintenance_base_url', that.Maintenance_base_url)
                  element.MaintenanceUrl.push(that.Maintenance_base_url)
                });
                // console.log('element.MaintenanceUrl', element.MaintenanceUrl)
              });
            }
          })
      }
    },
    enlarge(b) {
      // console.log(b)
      this.url = b;
      this.pictureDetails = true;
    },
    // 获取楼栋
    async getFloor() {
      await api.get(api.forent_url.e_record_url + "/record/enterpriseBulid", {
        unitId: api.getGlobalVal('userObj').orgCode
      }).then(res => {
        if (res.code === "success") {
          // console.log(res)
          this.floors = res.data;
          // console.log('this.floors', this.floors)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取楼层
    async getFloorNum() {
      await api.post('/remoteApi/tool/floor/getFloorInfoByUnitIdAndBuildId', {
        unitId: api.getGlobalVal('userObj').orgCode,
        buildId: this.formInline.build,
      }).then(res => {
        if (res.code === 'success') {
          this.floorNum = res.data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取统计查询
    async loadData() {
      this.isLoading = true;
      await api.post(api.forent_url.moblie_url + '/accidentInfo/accidents', {
        pageSize: this.widgetInfo.pageSize,
        pageNo: this.widgetInfo.pageNo,
        proprietorId: api.getGlobalVal('userObj').orgCode,
        accidentTimeStart: this.dateTime ? this.dateTime[0] + ' 00:00:00' : '',
        accidentTimeEnd: this.dateTime ? this.dateTime[1] + ' 23:59:59' : '',
        processState: this.formInline.processState,
        isOverdued: this.formInline.isOverdued,
        datepicker: this.dateTime ? new Date(this.dateTime[0] + ' 00:00:00') + ',' + new Date(this.dateTime[1] + ' 00:00:00') : '',
        buildId: this.formInline.build,
        accidentNo: this.searchValue,
        floorId: this.formInline.floor
      }, 5000).then(res => {
        if (res.code === "2001") {
          // console.log(res)
          this.isLoading = false;
          this.tableData = res.data.rows;
          this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
          // console.log('tableData',this.tableData)
        }
      }).catch(err => {
        // console.log(err);
        this.isLoading = false;
        this.$message(
          {            type: 'warning',
            message: "加载超时,请重新加载!"          });
      });
    },
    // 催促
    async Urge(row) {
      this.DetailsPage = false,
        await api.post(api.forent_url.moblie_url + '/accidentInfo/urgeInfo', {
          id: row.id
        }).then(res => {
          const code = res.code
          const message = res.message
          if (code === 'success') {
            // 提示成功
            this.$message.success(message)
          } else {
            this.$message.error(message)
          }
        })
    },
    // 查看
    see(row) {
      this.ViewDialogBox = true;
      this.RectificationOpinion = row.rectificationSuggestion;
      this.UpDate = row.rectificationDate == null ? '' : row.rectificationDate.substring(0, 10);
    },
    // 点击修改按钮，显示对话框
    modify(row) {
      this.Rectification = true;
      this.form.id = row.id
    },
    // 点击保存按钮，关闭对话框
    async Preservation(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          await api.post(api.forent_url.base_url + '/accidentInfo/rectification', {
            id: this.form.id,
            rectificationSuggestion: this.form.RectificationList,
            rectifucationDate: this.form.UpToDate.toString()
          }).then(res => {
            const code = res.code
            const message = res.message
            // 编辑成功    
            if (code === 'success') {
              // 隐藏对话框
              this.Rectification = false;
              // 提示成功
              this.$message.success(message)
              // 重新加载数据
              this.loadData()
              // 清空文本输入框的值
              for (const key in this.form) {
                this.form[key] = ''
              }
            } else {
              this.$message.error(message)
            }
          }).catch(err => {
            console.log(err);
          })
        }
      });
    },
    // 分页
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
      this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
      this.loadData();
    },
    selectReviewResult(val) {
      this.widgetInfo.pageNo = 1;
      this.loadData();
    },
    selectBeOverdue(val) {
      this.formInline.isOverdued = val;
      this.widgetInfo.pageNo = 1;
      this.loadData();
    },
    // 隐患状态
    selectProcessState(val) {
      this.formInline.processState = val;
      this.widgetInfo.pageNo = 1;
      this.loadData();
    },
    // 楼栋
    selectStoriedBuilding(val) {
      this.formInline.buildId = val;
      this.widgetInfo.pageNo = 1;
      this.loadData();
      this.getFloorNum();
    },
    // 楼层
    selectFloor(val) {
      this.formInline.floorId = val;
      this.widgetInfo.pageNo = 1;
      this.loadData();
    },
    InputPlan(val) {
      this.searchValue = val;
      this.widgetInfo.pageNo = 1;
      this.loadData();
    },
    // 上报时间
    selectDateTime(val) {
      // console.log(val)
      this.dateTime = val;
      this.widgetInfo.pageNo = 1;
      this.loadData();
    },
    // 搜索
    handleSearch() {
      this.widgetInfo.pageNo = 1;
      this.loadData()
    }
  },
  mounted() {
    this.getFloor();
    this.getFloorNum();
  },
  watch: {
    pageSize(old, newVal) {
      console.log(old, newVal)
    }
  }
}
</script>
<style lang="scss" scoped>
.AlarmCheck_main {
  background: #fff;
  .row-bg {
    padding: 10px 0;
    padding-top: 15px;
  }
}

@import "~/assets/css/table.scss";
.notab {
  border-top: none;
}

.gg-base-info {
  margin: 20px 25px;
}
.gg-base-unit {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #e2e4e8;
}
.gg-base-h3 {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-left: 4px solid #6a90ec;
  background-color: #eef3fe;
}
.gg-table {
  margin: 15px;
}
.el-dialog .el-dialog__body {
  height: 300px !important;
}
.border {
  width: 20px;
  height: 20px;
  border: 3px solid #d9e3f9;
  background-color: #4777e6;
  border-radius: 20px;
  position: relative;
}
.num {
  position: absolute;
  left: 5px;
  top: -4px;
  color: #fff;
}
.Connecting {
  border-left: 2px solid #edf2fd;
  position: absolute;
  height: 176px;
  top: -178px;
  left: 9px;
}
.color_gray {
  color: #777;
  width: 92px;
}
.black {
  color: #000;
}
.w_420 {
  width: 450px;
  color: #000;
}
.none {
  margin-left: 30px;
  height: 68px;
  line-height: 68px;
  color: #000;
}
.img {
  cursor: pointer;
  width: 100px;
  height: 100px;
}
</style>
<style>
.el-tooltip__popper.is-dark {
  max-width: 300px;
}
#tab .el-table__row {
  cursor: pointer;
}
</style>