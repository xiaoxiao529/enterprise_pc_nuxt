<template>
  <div>
    <el-container>
      <el-main style="margin-right: 1%">
        <el-row class="header" :gutter="10">
          <el-col :span="5" class="title">
            <span>缓存列表</span>
          </el-col>
        </el-row>
        <!--列表-->
        <el-row class="body">
          <div class="userNotab">
            <el-table ref="table" :data="tableData" style="width: 100%;" height="100%"  v-loading="isLoading" >
                <el-table-column label="缓存名称" prop="key" show-overflow-tooltip align="center" min-width="10%"></el-table-column>
                <el-table-column label="操作"    prop="addUserName" show-overflow-tooltip  align="center"  min-width="10%">
                  <template slot-scope="scope">
                    <el-tooltip content="删除" placement="bottom">
                      <el-button type="text" icon="el-icon-delete" style="font-size: 16px" @click="handleDelete(scope.row)"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
            </el-table>
            <!-- FIXME: 样式修复 2018年12月14日     -->
            <Pagination class="userPage" :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
          </div>
        </el-row>
      </el-main >
      <el-aside width="30vw" >
        <div class="closeBox" >
          <el-row>
            <el-col class="title" :span="24">
              <el-col :span="10">缓存内容</el-col>
              <el-col :span="12">
                <el-input  v-model.trim="keywords" placeholder="请输入任务编号" @change="InputPlan" clearable>
             <!--  <i slot="suffix" class="el-input__icon el-icon-search" style="color:#409eff" @click="handleSearch"></i>-->
                  <el-button @click="handleSearch" slot="append" icon="el-icon-search"   style="color:#409eff"></el-button>
                </el-input>
              </el-col>
            </el-col>
          </el-row>
           <div id="cacheContent"></div>
        </div>
      </el-aside>

    </el-container>

  </div>
</template>

<script>
  import api from "~/config/http";
  import Mock from "mockjs";
  // import qs from "qs";
  import ModifyUser from "~/components/SystemManagement/UserManagement/ModifyUser";
  import ModifyRoleUser from "~/components/SystemManagement/UserManagement/ModifyRoleUser";
  import AddUser from "~/components/SystemManagement/UserManagement/AddUser";
  import RefuseUser from "~/components/SystemManagement/UserManagement/RefuseUser";
  import Pagination from "~/components/Pagination"
  import "~/assets/css/style.css";
  import "~/assets/css/ggicon.css";
  import {
    Message,
    MessageBox
  } from 'element-ui';



  export default {
    components: {
      Pagination
    },
    data(){
      return{
        isLoading:true,
        keywords:'',
        tableData:[],
        widgetInfo: {
          pageSize: 6,
          pageNo: 1,
          list: [],
          total:0,
          fileName:'',
          key:''
        },
      }
    },
    mounted(){
      this.getTableData();
    },
    methods: {
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
      },
      getTableData(){
        this.isLoading = true;
        // http://112.27.198.15:9832/enterprise-pc/cache/list.mvc
        api.post(api.forent_url.url + '/cache/list.mvc',{
          pageNo: this.widgetInfo.pageNo,
          pageSize: this.widgetInfo.pageSize,
          key: this.keywords
        }).then(res=>{
          if(res.code === 'success'){
            this.isLoading = false;
            this.tableData = res.data.rows;
            this.widgetInfo.total = res.data.total;
            this.widgetInfo.pageSize = res.data.pageSize;
            this.widgetInfo.pageNo = res.data.pageNo;
          }else {
            this.isLoading = false;
            this.tableData = [];
            //this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = 0;
            //console.log('没有数值。。。。。')
          }
        }).catch(err=>{
          console.log(err)
          this.isLoading = false;
        })
      },
      InputPlan(val) {
        this.keywords = val;
        this.widgetInfo.pageNo = 1;
        this. getTableData();
      },
      handleSearch() {
        this.widgetInfo.pageNo = 1;
        this. getTableData();
      },
      handleDelete (val) {
        let that = this;
        this.$confirm('确定要删除选择的数据吗？', '通知', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(()=>{
          api.post(api.forent_url.url + "/cache/deleteCache.mvc", {
            key: val.key
          })
              .then(res => {
                //console.log("没有进入删除。。。")
                if (res.success === true) {
                  Message.success("删除成功");
                  that.widgetInfo.pageNo = 1;
                  that.getTableData();
                  //console.log("删除。。。。")
                } else {
                  Message.error("删除失败");
                }
              })
              .catch(err=>{
                console.log(err)
              })
        });
      }
  }
  }

</script>

<style lang="scss" scoped>
  @import "~/assets/css/table.scss";

  [v-cloak] {
    display: none;
  }

  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background: rgba(32, 160, 255, 0.5) !important;
  }

  // .l-icon {
  //     i {
  //         font-size: 2rem;
  //         color: #2892e2;
  //     }
  // }

  .l-icons {
    font-size: 2rem;
    cursor: pointer;
    color: #2892e2;
  }

  .el-container {
    height: calc(100vh - 75px);
    overflow:hidden;
    /* 左侧侧栏 */
    .el-aside {
      background-color: #fff;
      color: #333;
      border: 1px solid #bfcbd9;
      margin: 10px 0 0 0;
      height: calc(100% - 13px);

      /* tree容器 */
      .closeBox {
        width: 100%;
        height: 100%;

        /* 标题 */
        .title {
          border-bottom: 1px solid #bfcbd9;
          margin: 0;
          /*line-height: 30px;*/
          padding: 5px;
          font-size: 16px;
          font-weight: bold;
          color: #2892e2;
          text-align: left;
          text-indent: 1em;
        }
        #cacheContent{
          border: 2px solid rgb(119, 119, 119);
          height: 88%;
          overflow-y: auto;
          margin: 3%;
        }

        /* 右键菜单 */
        //组织机构操作
        .orgBox {
          position: absolute;
          font-size: 12px;
          color: grey;
          border: 1px solid #ccc;
          text-align: center;
          padding: 0;
          width: 90px;
          background: #fff;
          z-index: 2;

          // left:56px;
          li {
            line-height: 23px;
            padding: 5px 0px;
            width: 100%;
            cursor: pointer;

            a {
              width: 100%;
              display: inline-block;
              color: grey;
            }

            :hover {
              background: #eee;
            }
          }
        }
      }
    }

    .el-main {
      position: relative;
      background-color: #fff;
      color: #333;
      border: 1px solid #bfcbd9;
      margin: 10px 0 0 0;
      padding: 0;
      height: calc(100% - 13px);

      .header {
        padding: 5px;
        border-bottom: 1px solid #bfcbd9;

        .title {
          // border-bottom: 1px solid #bfcbd9;
          margin: 0;
          line-height: 30px;
          padding: 0 10px 0 10px;
          font-size: 16px;
          font-weight: bold;
          color: #2892e2;
          text-align: left;
          // text-indent: 1em;
        }

        .right {
          text-align: right;

        }

        .left {
          text-align: left;
        }
      }

      .body {
        .userNotab {
          border:none;
          .el-pagination {

            // text-align: right;
            height: 100%;
          }
        }
        .userPage{

        }

      }

      .is-ableClick {
        cursor: pointer;
      }

      .table-row {
        height: 46px;
      }

    }

    .left {
      // float: left;
      text-align: left;
    }
  }

  // .r,
  // .el-button-group {
  //     line-height: 40px;
  // }

  // .r {
  //     overflow: hidden;

  //     // span {
  //     //     float: left;
  //     // }

  //     // .el-radio-group {
  //     //     float: right;
  //     //     line-height: 40px;
  //     // }

  //     // .addBtn {
  //     //     float: right;
  //     //     margin: 6px 0 0 10px;
  //     // }

  //     // .addBtn {
  //     //     float: right;
  //     // }
  // }

  // .zTree .el-tree-node__content {
  //     background-color: red !important;
  // }

  // .el-button--mini,
  // .el-button--small {
  //     padding: 5px;
  //     margin: 2px;
  // }
</style>
