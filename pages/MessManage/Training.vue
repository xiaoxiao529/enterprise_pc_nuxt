<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <Title />

          <!-- 筛选条件 -->
          <Search :widgetInfo="widgetInfo" v-on:updateSearchCondition="updateSearchCondition" v-on:updateAddDia="updateAddDia">
          </Search>
          <!-- 表格  -->
          <div class="notab">
            <Table :widgetInfo="widgetInfo" :loading="loading" :fullInfo="fullInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
            <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
          </div>
        </div>
      </el-col>
    </el-row>
    <Add :addVis="addVis" v-on:isShow="updateAddDia" v-on:addList="sonHandleCurrentChange" :fullInfo="fullInfo" />

  </div>
</template>

<script>
  import api from '~/config/http';
  import Title from "~/components/Title";
  import Search from "~/components/MessManage/Search";
  import Table from "~/components/MessManage/Table";
  import Pagination from "~/components/Pagination";
  import Add from "~/components/MessManage/Add";
  import axios from 'axios';
    import {
    Message
  } from 'element-ui';
  export default {
    components: {
      Title,
      Search,
      Table,
      Add,
      Pagination
    },

    data() {
      return {
        // 列表数据
        userObj: api.getGlobalVal("userObj"),
        loading: true,
        addVis: false,
        fullInfo: {
          pageName: "培训演练",
          tit: '新增培训演练',
          addUrl: api.forent_url.special_base_url + "/training/uploadFile",
          downloadUrl: api.forent_url.base_url + "/training/download?id=",
          deleteUrl: api.forent_url.special_base_url + "/training/del"
        },
        widgetInfo: {
          tHeaders: [{
            prop: "trainName",
            label: "名称",
            align: "left",
            'showOverflowTooltip': true,
            'minWidth': '14%'
          }, {
            prop: "tainAttachTypeCode",
            label: "类型",
            align: "left",
            'showOverflowTooltip': true,
            'minWidth': '14%'
          }, {
            prop: "creator",
            label: "上传人",
            align: "left",
            'showOverflowTooltip': true,
            'minWidth': '14%'
          }, {
            prop: "uploadTime",
            label: "上传时间",
            align: "left",
            'showOverflowTooltip': true,
            'minWidth': '14%'
          }, {
            prop: "remark",
            label: "说明",
            align: "left",
            'showOverflowTooltip': true,
            'minWidth': '15%'
          }, {
            prop: "",
            label: "操作",
            align: "center",
            'showOverflowTooltip': true,
            'minWidth': '15%'
          }],
          list: [],
          pageSize: 1,
          pageNo: 1,
          total:null
        }
      }
    },

    methods: {
      updateSearchCondition(widgetInfo) {
        this.getData(widgetInfo.keyWords);
      },
      updateAddDia(val) {
        this.addVis = val;
      },
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
        this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
        this.getData();
      },
      getData(safetyAttachName) {
        this.loading = true;
        api.post(api.forent_url.base_url + "/training/query", {
          orgId: this.userObj.orgCode,
          attachmentTypeCode: "PXYL",
          pageSize: this.widgetInfo.pageSize,
          pageNo: this.widgetInfo.pageNo,
          trainName: safetyAttachName
        }).then(res => {
          if (res.message == "ok") {
            this.widgetInfo.list = res.data.rows;
            this.widgetInfo.total = res.data.total;
            this.loading = false;
          } else {
            setTimeout(() => {
              Message.error("加载超时,请重新加载!");
              this.loading = false;
            }, 5000);
          }
        })
      }
    },
    mounted() {}
  }

</script>

<style scoped>
  @import "~/assets/css/table.scss";

</style>
