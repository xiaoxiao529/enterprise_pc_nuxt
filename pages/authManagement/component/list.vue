<template>
    <div>
        <p>组件父级</p>
        {{ name }}
        <Son :ages = "12"  v-on:childByValue="childByValue">
            <p slot="p1">我是父级传过来显示在插槽的</p>
            <p slot-socpe="ddd" slot="p2">
            </p>
        </Son>
    </div>
</template>
<script>

    import Son from '@/pages/authManagement/component/son.vue'
    export default {
        components:{
            Son
        },
        data(){
            return {
                name:""
            }
        },
        methods:{
            childByValue: function (childValue) {
                // childValue就是子组件传过来的值 
                this.name = childValue
            }
        }
    }
</script>

<style scoped>
    div{
        border:1px solid #ccc;
        background:#f1f1f1;
        margin:20px;
        padding: 20px;
    }
</style>