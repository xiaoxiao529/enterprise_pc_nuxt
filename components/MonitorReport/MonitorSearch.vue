<template>
    <div class="monitor-search">
        <!-- 筛选条件 -->

        <el-form :inline="true" :model="widgetInfo" class="demo-form-inline clearfloat monit">
            <!-- <el-form-item>
                
            </el-form-item> -->
            
            <el-col :span="6" class="left">
                <el-col :span="24">
                    <div class="inner">
                        <span><img src="~/assets/img/l-computer.png" alt="" class="head-img"></span>
                        <!-- <span id="sum_num_name">火灾自动报警装置：</span> -->
                        <slot id="sum_num_name" name="sum_num_name">这是拥有命名的slot的默认内容</slot>
                    </div>

                </el-col>
            </el-col>
            <el-col :span="18" class="right" >
                <el-form-item label="楼栋">
                    <el-select ref="floorInfo"  v-model.trim="widgetInfo.floor.buildId" placeholder="楼栋" @change="handleSelect">
                        <el-option v-for="(item) in widgetInfo.listFloor" :key="item.id" :label="item.buildName" :value="item.buildId" @click="handleClick(event)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select  v-model.trim="widgetInfo.deviceType.deviceTypeId" placeholder="设备类型" @change="handleSelect">
                        <el-option v-for="(item) in widgetInfo.listDeviceType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运行状态">
                    <el-select  v-model.trim="widgetInfo.runState.value" placeholder="设备类型" @change="handleSelect">
                        <el-option v-for="(item) in widgetInfo.listRunState" :key="item.id" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <!-- <el-button size="mini" type="primary" @click="sendMsgParent">搜索</el-button> -->

            <!-- <el-form-item label="楼栋">
                <el-input clearable   v-model.trim="formInline.user" placeholder="楼栋"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
                <el-select  v-model.trim="formInline.region" placeholder="设备类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="运行状态">
                <el-select  v-model.trim="formInline.region1" placeholder="设备类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-button size="mini" type="primary">搜索</el-button> -->

            <!-- 搜索 -->
        </el-form>
    </div>
</template>

<script>
export default {
    props: ['widgetInfo'],
    data() {
        return {
            unitId: '',
            // buildId:this.widgetInfo.floor.buildId,
            // deviceTypeId:this.widgetInfo.deviceType.deviceTypeId,
            // deviceTypePid:this.widgetInfo.deviceType.deviceTypePid,
            // runState:this.widgetInfo.runState.value
        }
    },
    methods: {
        handleClick(event) {

        },
        handleSearch() {

        },
        handleSelect() {
            
            // this.widgetInfo.deviceType.deviceTypePid = this.widgetInfo.deviceType.deviceTypeId.substr(0,2)||'02'+'000000'
            
            this.$emit('updateSearchCondition', this.widgetInfo);
        },
        sendMsgParent() {
            this.widgetInfo.deviceType.deviceTypePid = this.widgetInfo.deviceType.deviceTypeId.substr(0, 2) || '02' +
                '000000'
            this.$emit('updateSearchCondition', this.widgetInfo);
        }
    },

}
</script>

<style lang="scss" scoped>
// 搜索组件容器
.monitor-search {
  // 搜索条件表单
    .el-form {
        .left {
            text-align: left;
            .el-col {
                // 设备信息
                .inner {
                    // height: 100%;
                  text-align: left;
                  text-indent: 2em;
                  font-size: 18px;
                  line-height: 28px;
                }
            }
        }
        .right{
          // 搜索条件
          text-align: right;
          line-height: 17px;
          .el-form-item{
              font-size: 17px;
              margin-bottom: 14px;
              
          }
        }
    }
}

// .monit {

//     height: 64px;
//     line-height: 64px;
//     padding: 0 1.7rem;
//     background: #fff;

    .el-radio-button {
        width: 90px;
    }

    .el-form-item--small .el-form-item__content,
    .el-form-item--small .el-form-item__label {
        line-height: 64px;
        max-width: 16rem;
    }

    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
        margin-bottom: 0;
    }

    .form-left {
        float: left;
    }

    .form-right {
        float: right;
    }

    /* 按钮的字号 */
    .el-button {
        font-size: 1.6rem;
    }

    .el-icon-search {
        cursor: pointer;
        color: #409eff;
        font-size: 1.6rem;
        font-weight: bold;
    }

    .clearfloat:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0
    }
// }
</style>
