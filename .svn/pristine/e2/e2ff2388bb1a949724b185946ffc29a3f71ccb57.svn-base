<template>
  <div>
    <el-row type="flex"   justify="center">
      <el-col :span="24">
        <div class="content">
          <Title />
          <div class="static row-bg">
            <div class="relationship_container">
              <el-row style="height: 40px; border-left: 2px solid #6a90ec;background-color: #eef3fe;">
                <span style="float: left; padding: 8px ; font-size: 14px;line-height: 20px">维保关系</span>
              </el-row>
              <el-row style=" border: 1px solid #e2e4e8; margin: 32px 25px">
                 <div>
                <el-scrollbar style="height:50%" >
                <el-table :data="tableData" stripe v-loading="isLoading" >
                <el-table-column ref="myTable"  :show-overflow-tooltip=true  prop="buildName"
                                 label="名称" align="center">
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true align="center" prop="serviceUnitName" label="维保公司">
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true align="center" label="维保人员">
                <template slot-scope="scope">
                <!-- <span v-for="(item, index) in scope.row.username" :key="index" style="color: #43A2FF">{{item.username}}</span>-->
                <span style="color: #43A2FF"> {{userName}}</span>
                </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip=true align="center" prop="reationDate" label="服务生效时间">
                </el-table-column>
                </el-table>
                </el-scrollbar>
                 </div>
              </el-row>
            </div>
            <div class="pact_container">
              <el-row style="height: 40px; border-left: 2px solid #6a90ec;background-color: #eef3fe;">
                <span style="float: left; padding: 8px ; font-size: 14px;line-height: 20px">维保合同</span>
                <template>
                  <el-button @click="dialogFormVisible" type="text" style="float: right; padding: 12px 15px ; font-size: 15px;color:#00a75a ;cursor: pointer;">+添加</el-button>
                  <Add :addVis="addVis" :fullInfo="fullInfo" v-on:isShow="isShow" v-on:addList="addList" />
                </template>
              </el-row>
              <el-row style=" border: 1px solid #e2e4e8; margin: 32px 25px">
                <div>
                  <el-scrollbar style="height:50%">
                  <el-table :data="serviceData"  v-loading="isLoading" stripe >
                    <el-table-column fixed prop="name" label="名称" align="center" :show-overflow-tooltip=true>
                    </el-table-column>
                    <el-table-column align="center" prop="remark" label="备注" :show-overflow-tooltip=true>
                    </el-table-column>
                    <el-table-column align="center" prop="size" label="大小" :show-overflow-tooltip=true>
                    </el-table-column>
                    <el-table-column align="center" prop="reationDate1" label="操作" :show-overflow-tooltip=true>
                      <template slot-scope="scope">
                        <el-tooltip content="下载" placement="bottom">
                          <el-button type="text" icon="el-icon-download" style="font-size: 2.3rem" @click="downloadAttach(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="bottom">
                          <el-button type="text" icon="el-icon-delete" style="font-size: 2.3rem" @click="deleteAttach(scope.row)"></el-button>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                  </el-scrollbar>
                </div>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '../../config/http'
  import Title from '../../components/Title.vue'
  import Add from "../../components/MessManage/Add.vue"
  import {
    Message,
    MessageBox
  } from 'element-ui';

  export default {
    components: {
        Title,
      Add
    },
    data() {
      return {
        isLoading: false,
        addVis: false,
        userName:'',
        fullInfo: {
          pageName: "维保关系",
          tit: '添加合同',
          addUrl: api.forent_url.special_base_url + "/relation/uploadFile",
          downloadUrl: api.forent_url.base_url + "/planManage/download?id=",
          deleteUrl: api.forent_url.special_base_url + "/planManage/del"
        },
        tableData: [],
       // unitId: 'AHHF_QHHFY_99999997',
        subOrgCode: '',
        file: '(binary)',
        name: '',
        remark: '',
        serviceUnitName: '',
        personalList: [],
        serviceData: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '80px',
        fileList: [
            {
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        widgetInfo: {
          pageSize: 6,
          pageNo: 1,
        }
      }
    },
    created(){
      this.getRelationId();
    },
    mounted() {
      //this.getRelationId();
      setTimeout(()=>{
        this.queryService();
        this.getData();
      },200)
    },
    methods: {
      /**
       * 获取组织机构 详细信息
       * @param orgCode
       */
      async getRelationId() {
        let that = this;
        api.post(api.forent_url.base_url + '/system/getEmsOrg', {
          orgCode: api.getGlobalVal('userObj').orgCode
        }).then(res => {
          var code = res["code"];
          if (code == "success") {
            that.subOrgCode = (res["data"] && res["data"].extendstr7 ? res["data"].extendstr7 : '');

          } else {
            Message.error(res["message"]);
          }
        })
      },
      queryService() {
        this.isLoading = true;
        const that = this;
        api.get(api.forent_url.floor_url + '.1' + '/maintenance-service/proprietor/getUsersByUnitId?' +
            'unitId=' + api.getGlobalVal('userObj').orgCode
        ).then(res => {
          if (res.code === 'success') {
            that.personalList = res.data;
            api.post(api.forent_url.moblie_url + '/relation/getRelationInfo', {
              unitId: api.getGlobalVal('userObj').orgCode,
              subOrgCode: that.subOrgCode
            }).then(res => {
              if (res.code === 'success' && res.data.data.maintenanceInfo !== '' && res.data.data.maintenanceInfo.length >0) {
                that.isLoading = false;
                that.tableData = res.data.data.maintenanceInfo;
                /* console.log('this.tableData', this.tableData);*/
                that.tableData = that.tableData.map(x => ({
                  buildName: x.buildName,
                  serviceUnitName: x.serviceUnitName,
                  reationDate: x.reationDate,
                  username: that.personalList && that.personalList.find(i => i.name === x.serviceUnitName).value
                }));
                // console.log('this.tableData', this.tableData);
                that.tableData.forEach(item=>{
                  let obj = [];
                  item.username.forEach(ele=>{
                    obj.push( ele.username)
                  });
                  //console.log(obj,"obj")
                  that.userName = obj.join(', ')
                  //console.log(that.userName,"that.userName")
                });
              }else {
                this.isLoading = false;
                this.tableData = [];
                //this.widgetInfo.list = res.data.rows;
                this.widgetInfo.total = 0;
                //console.log('没有数值。。。。。')
              }
            }).catch(err => {
              that.isLoading = false;
              console.log(err)
            });
          }
        }).catch(err => {
          console.log(err)
        });
      },

      isShow(val) {
        this.addVis = val;
      },
      dialogFormVisible() {
        this.addVis = true; //显示弹框
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      addList(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.getData();
      },

      getData() {
        this.isLoading = true;
        api.post(api.forent_url.base_url + '/relation/getContractInfo', {
          unitId: api.getGlobalVal('userObj').orgCode,
        },5000).then(res => {
          this.isLoading = false;
          if (res && res.code === 'success') {
            this.serviceData = res.data;
          }
        }).catch(err => {
          this.isLoading = false;
          setTimeout(() => {
            Message.error("加载超时,请重新加载!")
          }, 5000)
          console.log(err)
        })
      },
      downloadAttach(val) {
        window.location.href = api.forent_url.base_url + "/relation/downloadAttach?url=" + val.id + ' ' + val.attachUrl
      },
      deleteAttach(val) {
        let that = this;
        this.$confirm('确定要删除选择的数据吗？', '通知', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(async()=>{
          await  api.post(api.forent_url.base_url + "/relation/deleteAttach", {
            id: val.id
          }).then(res => {
            if (res.code === 'success') {
              Message.success("删除成功");
              that.widgetInfo.pageNo = 1;
              that.getData();
              // console.log(1111111111111)
            } else {
              Message.error("删除失败");
            }
          })
        });
        /*MessageBox.confirm('确定要删除此合同信息吗？', '提示', {
          callback: function (action) {
            if (action === 'confirm') {
              api.post(api.forent_url.base_url + "/relation/deleteAttach", {
                id: val.id
              }).then(res => {
                if (res.code === 'success') {
                  Message.success("删除成功");
                  that.widgetInfo.pageNo = 1;
                  that.getData();
                 // console.log(1111111111111)
                } else {
                  Message.error("删除失败");
                }
              })
            }

          }
        })*/

      }
    }
  }

</script>

<style lang="scss" scoped>
 @import "~/assets/css/table.scss";
 .static {
 height: 100%;
 width:100%;
 background:#fff;
 border:1px solid #e2e4e8;
 }
 .row-bg {
 background: #fff;
 .relationship_container {
 width: 95%;
 border: 1px solid #e2e4e8;
 margin: 3% auto;
 }

 .pact_container {
 width: 95%;
 border: 1px solid #e2e4e8;
 margin: 2% auto;

 table {
 border-collapse: separate

 }
 }
 }
</style>
<style>
.el-tooltip__popper.is-dark{
   max-width: 300px;
}
</style>
