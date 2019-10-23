<template>
    <el-dialog class="auth-config" title="添加角色组" :visible="show" :ref="refName" width="30%" @close="close">
        <span slot="footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

</template>

<script>
export default {
    name: 'auth-config',
    props: {
        show: {
            default: true,
            type: Boolean,
        },
        refName: {
            default: 'addRoleDialog',
        }
    },
    data() {
        return {

        }
    },
    methods: {
        submit() {
            this.$emit("userPageListener", "AddRole", false);

        },
        close() {
            this.$emit("userPageListener", "AddRole", false);
        }
    }
}
</script>

<style lang="scss" scoped>
.auth-config {}
</style>
