<template>
    <el-dialog class="add-role-group" title="添加角色组" :visible="show" :ref="refName" width="20%" @close="close">
        <el-form :model="form" ref="addform" label-width="120px" :rules="rules">
            <el-form-item label="角色组名称" prop="roleGroupName" required>
                <el-input clearable   v-model.trim="form.roleGroupName"></el-input>
            </el-form-item>
            <el-form-item label="序号" prop="roleGroupId" required>
                <el-input clearable   v-model.trim="form.roleGroupId"></el-input>
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
    name: 'add-role-group',
    props: {
        show: {
            default: true,
            type: Boolean,
        },
        refName: {
            default: 'addRoleDialog',
        },
        rules:Object,
    },
    data() {
        return {
            form: {
                roleGroupName: '',
                roleGroupId: '',
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
.add-role-group {}
</style>
