<template>
    <el-tree :data="data" :props="props" @node-click="handleClick"></el-tree>
</template>

<script>
export default {
  name: 'tree',
  props:{
      data:'',
      props:'',
      refData:'',
  },
  mounted(){
      
      
      if(!this.refData){
          
      }
  },
  data() { 
    return {

    }
  },
  methods:{
      handleClick(data,obj,node){
          this.$emit('handleNodeClick',{data, obj, node})
      }
  }
 }
</script>

<style lang="scss" scoped>
  .tree{

  }
</style>