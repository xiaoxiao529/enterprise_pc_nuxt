<template>
    <el-dialog class="edit-role" title="编辑角色" :visible="show" :ref="refName" width="20%" @close="close">
        <el-form :model="form" ref="editForm" label-width="120px" :rules="rules">
            <el-form-item label="角色名称" prop="roleName" required>
                <el-input clearable   v-model.trim="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="序号" prop="roleId" required>
                <el-input clearable   v-model.trim="form.roleId"></el-input>
            </el-form-item>

        </el-form>
        <span slot="footer">

          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

</template>

<script>
export default {
    name: 'edit-role',
    props: {
        show: {
            default: true,
            type: Boolean,
        },
        refName: {
            default: 'editRoleDialog',
        },
        rules:Object,
    },
    data() {
        return {
            form: {
                roleName: '',
                roleId: '',
            }
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
.edit-role {}
</style>
