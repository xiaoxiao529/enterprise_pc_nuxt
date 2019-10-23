<template>
    <el-dialog class="role-menu-config" title="添加角色组" :visible="show" :ref="refName" width="30%" @close="close">
        <span slot="footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

</template>

<script>
export default {
    name: 'role-menu-config',
    props: {
        show: {
            default: true,
            type: Boolean,
        },
        refName: {
            default: 'menuConfigDialog',
        }
    },
    data() {
        return {

        }
    },
    methods: {
        submit() {
            this.$emit("userPageListener", "menuConfig", false);

        },
        close() {
            this.$emit("userPageListener", "menuConfig", false);
        }
    }
}
</script>

<style lang="scss" scoped>
.role-menu-config {}
</style>
