<template>
    <div class="user">
        <el-dialog title="上传头像" :visible.sync="dialogFormVisible">
            <section class="place-container">
                <main class="left">
                    <p class="left_title_select">选择头像 :</p>
                    <el-upload
                            class="avatar-uploader"
                            :action="POSTurl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            style="display: inline" title="点击修改头像">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </main>
                <main class="right">
                    <div class="right-wrap">
                        <p class="right_view">头像预览 :</p>
                        <div class="left-upload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus"></i>
                        </div>
                    </div>

                </main>
            </section>
            <!--按钮-->
            <article class="save">
                <el-button @click="save" type="primary">保存</el-button>
            </article>
        </el-dialog>
    </div>
</template>

<script>
  import api from '~/config/http';
  import axios from 'axios'

  export default {
    name: "uploadPlace",
    props: {
      userPic: {
        type: String,
      },
      userId: {
        type: [String, Number]
      }
    },
    data() {
      return {
        imageUrl: '',
        dialogFormVisible: false,
        oFile: '',
        POSTurl: ''
      };
    },
    mounted() {

    },
    created() {
      this.POSTurl = api.apiConfig.remoteTarget + '/api/v1/fire-society/user/uploadUserImg';
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // this.oFile = file.file;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        this.oFile = file;
        return isJPG && isLt2M;
      },
      //打开dialog方法
      opendialog(bool) {
        this.dialogFormVisible = bool;
      },
      save() {
        if (!this.oFile) {
          this.$message.error('还没有选择头像');
          return;
        }
        /*
        * 给后台传头像数据
        * */
        let fd = new FormData();
        fd.append('imageFile', this.oFile);
        fd.append('userId', this.userId);
        axios({
          method: 'post',
          url: api.apiConfig.remoteTarget + '/api/v1/fire-society/user/uploadUserImg',
          data: fd,
        }).then(
          (res) => {
            console.log(res);
            if (res.data.code == 'success') {
              this.$emit('userPlaceUrl', this.imageUrl);
              this.$message({
                message: '恭喜你，上传头像成功',
                type: 'success'
              });
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.message);
            }
          }
        ).catch(
          (res) => {
            return res
          }
        )
      }

    },

  }
</script>

<style scoped lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 40px;
        color: #acacad;
        width: 160px;
        height: 154px;
        line-height: 154px;
        text-align: center;
        border: 2px solid #eee;
    }

    .avatar {
        display: block;
    }

    .place-container {
        display: flex;
        height: 312px;
        padding: 0 60px;
        color: #303133;
        main {
            flex: 1;
            .left_title_select {
                font-size: 18px;

            }
            .left-upload {
                width: 200px;
                height: 200px;
                line-height: 200px;
                border: 2px solid #eee;
                text-align: center;
                font-size: 60px;
                font-weight: 800;
                color: #acacad;
                img {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }
            }
        }
        .right {
            border-left: 3px solid #eee;
            .right-wrap {
                padding-left: 60px;
                .right_view {
                    font-size: 20px;
                }
            }

        }
    }

    .save {
        text-align: center;
        padding-top: 20px;
        button {
            padding-left: 40px;
            padding-right: 40px;
        }

    }
</style>

