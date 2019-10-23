<template>
  <div>
    <!-- 筛选条件 -->
  
    <div class="demo-form-inline clearfloat filterAll">
      <el-row>
        <el-col :span="21">
          <el-button type="primary" icon="el-icon-plus" @click="addRows">新增</el-button>
        </el-col>
        <el-col :span="3">
          
          <el-input placeholder="可按名称搜索" v-model.trim="keyWords" clearable @keyup.enter.native="handleSearch(keyWords)" style="outline: none;">
          <el-button @click="handleSearch(keyWords)" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['widgetInfo'],
    data() {
      return {
        unitId: '',
        keyWords: ''
      }
    },
    methods: {
      handleSearch(val) {
        this.$emit('updateSearchCondition', {
          keyWords: val
        });
      },
      addRows() {
        this.$emit('updateAddDia', true);
  
      }
    },
  
  }
</script>

<style lang="scss">
  
</style>
