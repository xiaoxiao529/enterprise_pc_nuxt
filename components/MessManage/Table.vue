<template>
  <div>
    <!-- 设施名称	设施类型	设施地址	运行状态	回路点位	数据时间 -->
      <el-table ref="table" :data="widgetInfo.list" v-loading="loading" stripe height="100%">
        <template v-for="header in widgetInfo.tHeaders">
          <el-table-column v-if="header.label == '操作'" :prop="header.prop" :key="header.prop" :show-overflow-tooltip="header.showOverflowTooltip"
            :min-width="header.minWidth" :label="header.label" :align="header.align">
            <template slot-scope="scope">
              <el-tooltip  content="下载" placement="bottom">
               <el-button @click="downLoad(scope)" class="operation safetyManage-download" type="text" style="font-size: 2.3rem"></el-button>
              </el-tooltip>
               <el-tooltip  content="删除" placement="bottom">
              <el-button @click="deletes(scope)" class="operation safetyManage-throw" type="text" style="font-size: 2.3rem"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column v-if="header.label != '操作'" :prop="header.prop" :key="header.prop" :showOverflowTooltip="header.showOverflowTooltip"
            :min-width="header.minWidth" :label="header.label">
          </el-table-column>
        </template>

      </el-table>
  </div>
</template>

<script>
  import api from '~/config/http';
  import {
    Message,
    MessageBox
  } from 'element-ui'
  export default {
    props: {
      widgetInfo:Object,
      loading:Boolean,
      fullInfo:Object
    },
      
     
    data() {
      return {
        pageSize: this.widgetInfo.pageSize
      }
    },
    methods: {
      downLoad(scope) {
        window.location.href = this.fullInfo.downloadUrl + scope.row.id;
      },
      deletes(scope) {
        let that = this;
        MessageBox.confirm('确定要删除这条信息吗？', '提示', {
          callback: function (action) {
            if (action == 'confirm') {
              api.post(that.fullInfo.deleteUrl, {
                id: scope.row.id
              }).then(res => {
                if (res.code == 'success') {
                  Message.success("删除成功");
                  that.$emit('sonHandleCurrentChange', {
                    pageNo: 1
                  });
                } else {
                  Message.error("删除失败");
                }
              })
            }

          }
        })
      }
    }

  }

</script>


<style lang="scss" scoped>
@import "~/assets/css/table.scss";
    /* 操作的样式 */
    .operation {
      display: inline-block;
      width: 17px;
      height: 17px;
      cursor: pointer;

      margin-left: 0;
      margin-right: 10px;
    }
    .safetyManage-download {
      background: url(../../assets/img/icon-download.png) no-repeat;
      background-size: contain;

    }
    .safetyManage-throw {
      background: url(../../assets/img//icon-throw.png) no-repeat;
      background-size: contain;
    }
 // }

</style>
