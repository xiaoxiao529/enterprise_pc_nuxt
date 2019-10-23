<template>
  <div class="refuse-user">
    <el-dialog title="拒绝用户" :visible="show" width="30%" @close="handleClose">
      <el-row>
        <el-col>
          <el-input clearable  type="textarea"  v-model.trim="form"></el-input>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "~/config/http";
export default {
  name: "refuse-user",
  props: {
    show: {
      default: true,
      require: true
    },
    userObj: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      ACCEPT_URL: "/user/acceptOrRefuse",

      myShow: this.show,
      form: ""
    };
  },
  mounted() {
    
    
    
  },
  methods: {
    handleClose() {
      this.form = "";
      this.$emit("userPageListener", "RefuseUser", false);
    },
    handleSubmit() {
      
      api.post(api.forent_url.base_url + this.ACCEPT_URL, {
        currentUserId: api.getGlobalVal("userObj").id,
        userId: this.userObj.id,
        content: this.form,
        flag: "0"
      }).then(res=>{
          if(res.code=="success"){
              
              
              this.$message({
                  type:'success',
                  message:res.message
              })
          }
          
      }).catch(err=>{
          
          this.$message({
                  type:'warn',
                  message:'操作失败'
              })

      })
      this.form = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.refuse-user {
}
</style>