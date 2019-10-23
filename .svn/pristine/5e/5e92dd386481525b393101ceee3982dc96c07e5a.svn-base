<template>
  <div class="dutyRoom_main">
    <!-- 搜索框 -->
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline filterAll" style="padding-top:0;height:40px;line-height:40px;">
        <el-row>
          <el-col :span="6" class="text-2">
            <label>姓名</label>
            <el-input placeholder="姓名" v-model.trim="form.names" clearable></el-input>
          </el-col>
          <el-col :span="14" justify="left">
            <el-row>
              <el-col :span="12" class="text-4">
                <label>所属机构</label>
                <el-cascader placeholder="所属机构" v-model.trim="optionsLists" :options="options" :props="mechanism" @change="onChange" expand-trigger="hover" :show-all-levels="false" clearable filterable change-on-select></el-cascader>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">
                <el-button type="primary" @click="ExportAll">全部导出</el-button>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-button type="primary" @click="query">查询</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="notab">
      <!-- 表格 -->
      <el-table v-loading="isLoading" :data="tableData" stripe>
        <el-table-column align="left" min-width="15%" :show-overflow-tooltip="true" pageSize="pageSize" prop="name" label="姓名">
          <template slot-scope="scope">
            <span v-if="scope.row.name === ''" style="color:rgba(0,0,0,0)">.</span>
            <span v-else-if="scope.row.name !== ''">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="15%" :show-overflow-tooltip="true" prop="orgName" label="所属机构">
          <template slot-scope="scope">
            <span v-if="scope.row.orgName === ''" style="color:rgba(0,0,0,0)">.</span>
            <span v-else-if="scope.row.orgName !== ''">{{scope.row.orgName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="35%" :show-overflow-tooltip="true" prop="roleName" label="角色名称">
          <template slot-scope="scope">
            <span v-if="scope.row.roleName === ''" style="color:rgba(0,0,0,0)">.</span>
            <span v-else-if="scope.row.roleName !== ''">{{scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="35%" :show-overflow-tooltip="true" prop="privName" label="权限名称">
          <template slot-scope="scope">
            <span v-if="scope.row.privName === ''" style="color:rgba(0,0,0,0)">.</span>
            <span v-else-if="scope.row.privName !== ''">{{scope.row.privName}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器-->
      <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
    </div>
  </div>
</template>
<script>
import api from "~/config/http.js";
import Table from "~/components/MessManage/Table";
import Pagination from "~/components/Pagination";
import common from "~/utils/common";
export default {
  components: {
    Table,
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
      form: {
        names: '',
        // options: ''
      },
      casSelected: '',
      // arraySelected: [],
      isLoading: false,
      // 绑定层级下拉框
      optionsLists: [],
      // 层级下拉框中的数据
      options: [],
      // 层级下拉框中的配置
      mechanism: {
        value: 'orgCode',
        label: 'orgName',
        children: 'children'
      }
    }
  },
  methods: {
    // 分页
    sonHandleCurrentChange(widgetInfo) {
      this.widgetInfo.pageSize = (widgetInfo.pageSize ? parseInt(widgetInfo.pageSize) : this.widgetInfo.pageSize);
      this.widgetInfo.pageNo = (widgetInfo.pageNo ? parseInt(widgetInfo.pageNo) : this.widgetInfo.pageNo);
      this.loadData();
    },
    //  加载页面 
    async loadData() {
      this.isLoading = true;
      await api.post(api.forent_url.url + '/userAudit/list.mvc', {
        pageSize: this.widgetInfo.pageSize,
        pageNo: this.widgetInfo.pageNo,
        fileName: '',
        name: this.form.names,
        orgCode: this.casSelected
      }).then(res => {
        if (res.code === "success") {
          // console.log(res)
          this.isLoading = false;
          this.tableData = res.data.rows;
          this.widgetInfo.total = res.data.total == null ? 0 : res.data.total;
          this.widgetInfo.pageSize = res.data.pageSize;
          this.widgetInfo.pageNo = res.data.pageNo;
        }
      })
    },
    //  加载级联选择权选项
    async dropDownPption() {
      await api.post(api.forent_url.url + '/org/allorg.mvc')
        .then(res => {
          if (res.code === "success") {
            // debugger;
            // console.log('res===========', res)
            this.options = common.formatJSONTreeData(res.data, "children", "orgCode", "parentCode")
            // console.log('options', this.options)
          }
        })
    },
    onChange(value) {
      // debugger;
      // console.log('value==============', value)
      this.casSelected = value.join(',')
      // this.arraySelected = value
      // console.log('!!!!!!!!!!!!!!!!!!!!!!',this.casSelected)
    },
    // 查询按钮
    query() {
      this.widgetInfo.pageNo = 1;
      this.loadData();
    },
    // 导出按钮
    ExportAll() {
      // console.log('$$$$$$$$', this.casSelected)
      const fileName = encodeURI(encodeURI("用户审计.xlsx"));
      const templateName = encodeURI(encodeURI("useraudit.xlsx"));
      window.location.href = api.forent_url.url + "/userAudit/downLoadExcel.mvc?fileName=" + fileName + "&templateName=" + templateName + "&name=" + this.form.names + "&orgCode=" + this.casSelected;
    }
  },
  mounted() {
    this.dropDownPption();
    // console.log('===========================',api.getGlobalVal('userObj'))
  }
} 
</script>
<style lang="scss" scoped>
.dutyRoom_main {
  background: #fff;
  margin-top: 11px;
}
@import "~/assets/css/table.scss";
.notab {
  height: calc(100vh - 55px - 40px - 36px);
  // border: none;
}
.notab > div[data-v-76f42c04]:first-child {
  height: calc(100vh - 55px - 40px - 88px);
}
.el-cascader {
  display: inline;
}
.el-cascader--small {
  line-height: 20px;
}
.notab {
  border-top: none;
}
</style>
<style>
.el-tooltip__popper.is-dark {
  max-width: 300px;
}
</style>

