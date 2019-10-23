<template>
    <div>
        <p>我是子集组件</p>
        {{ ages }}
        <input type="text"  v-model.trim="aa">
        <input type="button" value="点击传值" @click="childClick">
        <hr>
        {{ $store.state.count}} - {{ count }}

        <button @click="$store.commit('redius')">-</button>
        <input type="text" :value="$store.state.count">
        <button @click="$store.commit('add',10)">+</button>
        <br/>
        <button @click="redius">-</button>
        <input type="text" :value="count">
        <button @click="$store.commit('add',10)">+</button>
        <br/> action <br/>
       
        <button @click="rediusCount">-</button>
        <input type="text" :value="count">
        <button @click="addCount">+</button>

        <slot name="p1">
            只有父级不传值的时候才会显示
        </slot>
        <slot name="p2" text="我是子集数据----------">
            只有父级不传值的时候才会显示2
        </slot>

        <input v-model.number="age" type="number">
        <p>
            {{ parice | money}}
        </p>
        <ul>
            <li v-for="(n,index) in evenNumbers" :key="index">{{ n }}</li>
        </ul>
    </div>
</template>
<script>
    import {  mapState, mapMutations, mapGetters, mapActions} from 'vuex';
    export default {
        data(){
            return {
                names:"",
                aa:"",
                parice:20,
                numbers: [ 1, 2, 3, 4, 5 ]
            }
        },
        props:{
            ages:{
                type:Number,
                default:5
            }
        },
        methods:{
            childClick () {
                this.$emit('childByValue', this.aa)
            },
            ...mapMutations(["add","redius"]),//方法简写 ... 属于es6的扩展运算符
            ...mapActions(["addCount","rediusCount"])
        },
       // methods : mapMutations(["add","redius"]),//方法简写

        // computed:{
        //     count (){
        //         return  this.$store.state.count
        //     }
        // }
        //两种转换方式
        computed:{
            ...mapState(["count"]),
            // count(){
            //     return this.$store.getters.count;
            // }
            ...mapGetters(["count"]),
            evenNumbers: function () {
                return this.numbers.filter(function (number) {
                return number % 2 === 0
                })
            }
        },
        filters:{
            money:function (params) {
                return '￥' + params
            }
        }    
    }
</script>

<style></style>