<template>
  <div>
    <!-- 筛选条件  外层加个 filterAll 布局采用 el-row el-col 分为左中右 三个模块  -->

    <el-form :inline="true" :model="formInline" class="demo-form-inline filterAll">
      <el-row>
        <!-- 分左中右三块 -->
        <el-col :span="2">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </el-col>
        <el-col :span="19"> 
          <!-- justify="end" 对齐方式 start, center, end, space-between, space-around -->
          <el-row type="flex" justify="end">
            <!-- 中间条件筛选区域对齐自行调整 span 所占宽度 根据需要调整 -->

            <!--text-2 text-3 text-4 是label的字数宽度 项目需要 只写到text-4  -->
            <el-col class="text-2" :span="4">
              <label>楼栋: </label>
              <el-input clearable   v-model.trim="formInline.user" placeholder="楼栋"></el-input>
            </el-col>
            <el-col :span="4" class="text-2">
              <label>楼栋: </label>
              <el-input clearable   v-model.trim="formInline.user" placeholder="楼栋"></el-input>
            </el-col>
            <el-col :span="8" class="text-4">
              <label>楼楼楼楼: </label>
              <el-select  v-model.trim="formInline.region" placeholder="设备类型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="text-3">
              <label>楼栋啊: </label>
              <el-input clearable   v-model.trim="formInline.user" placeholder="楼栋"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
            <el-input clearable  placeholder="请输入内容输入"  v-model.trim="formInline.keyword">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </el-col>

      </el-row>
     
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: '',
          region1: '',
          keyword: ''
        },
      }
    }
  }

</script>
<style lang="scss" scoped>
  .filterAll {
    clear: both;
    height: 78px;
    line-height: 78px;
    padding: 0 1.7rem;
    background: #fff;
    .text-2 {
      display:inline-block;
      label {
        width: 40px;
        text-align: right;

        display: inline-block;
        padding-right: 10px;
        box-sizing: border-box;
      }

      .el-input {
        width: calc(100% - 60px);
      }

      .el-select {
        width: calc(100% - 60px);

        .el-input {
          width: calc(100%);
        }
      }
    }
    .text-3 {
      display:inline-block;
      label {
        width: 55px;
        text-align: right;

        display: inline-block;
        padding-right: 10px;
        box-sizing: border-box;
      }

      .el-input {
        width: calc(100% - 75px);
      }

      .el-select {
        width: calc(100% - 75px);

        .el-input {
          width: calc(100%);
        }
      }
    }
    .text-4 {
      display:inline-block;
      label {
        width: 70px;
        text-align: right;

        display: inline-block;
        padding-right: 10px;
        box-sizing: border-box;
      }

      .el-input {
        width: calc(100% - 90px);
      }

      .el-select {
        width: calc(100% - 90px);

        .el-input {
          width: calc(100%);
        }
      }
    }
    .el-row {
      padding: 0;
    }
    .el-radio-button {
      width: 90px;
    }
    .el-form-item--small .el-form-item__content,
    .el-form-item--small .el-form-item__label {
      line-height: 78px; //64px;
      max-width: 16rem;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
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
  }

  @media screen and (max-width: 1680px) {
    .filterAll {
      height: 74px;
      line-height: 74px;

      .el-form-item--small .el-form-item__content,
      .el-form-item--small .el-form-item__label {
        line-height: 74px;
      }
    }

  }

  @media screen and (max-width: 1440px) {
    .filterAll {
      height: 64px;
      line-height: 64px;

      .el-form-item--small .el-form-item__content,
      .el-form-item--small .el-form-item__label {
        line-height: 64px;
      }
    }

  }

</style>
