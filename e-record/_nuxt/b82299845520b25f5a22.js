(window.webpackJsonp=window.webpackJsonp||[]).push([[75,76],{1384:function(t,e,n){var content=n(1763);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("2bee5066",content,!0,{sourceMap:!1})},1416:function(t,e,n){"use strict";n.r(e);var o=n(39),r=(n(223),n(78)),c={data:function(){return{names:"",aa:"",parice:20,numbers:[1,2,3,4,5]}},props:{ages:{type:Number,default:5}},methods:Object(o.a)({childClick:function(){this.$emit("childByValue",this.aa)}},Object(r.d)(["add","redius"]),Object(r.b)(["addCount","rediusCount"])),computed:Object(o.a)({},Object(r.e)(["count"]),Object(r.c)(["count"]),{evenNumbers:function(){return this.numbers.filter(function(t){return t%2==0})}}),filters:{money:function(t){return"￥"+t}}},l=n(31),component=Object(l.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v("我是子集组件")]),t._v("\n    "+t._s(t.ages)+"\n    "),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.aa,expression:"aa",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.aa},on:{input:function(e){e.target.composing||(t.aa=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),n("input",{attrs:{type:"button",value:"点击传值"},on:{click:t.childClick}}),t._v(" "),n("hr"),t._v("\n    "+t._s(t.$store.state.count)+" - "+t._s(t.count)+"\n\n    "),n("button",{on:{click:function(e){return t.$store.commit("redius")}}},[t._v("-")]),t._v(" "),n("input",{attrs:{type:"text"},domProps:{value:t.$store.state.count}}),t._v(" "),n("button",{on:{click:function(e){return t.$store.commit("add",10)}}},[t._v("+")]),t._v(" "),n("br"),t._v(" "),n("button",{on:{click:t.redius}},[t._v("-")]),t._v(" "),n("input",{attrs:{type:"text"},domProps:{value:t.count}}),t._v(" "),n("button",{on:{click:function(e){return t.$store.commit("add",10)}}},[t._v("+")]),t._v(" "),n("br"),t._v(" action "),n("br"),t._v(" "),n("button",{on:{click:t.rediusCount}},[t._v("-")]),t._v(" "),n("input",{attrs:{type:"text"},domProps:{value:t.count}}),t._v(" "),n("button",{on:{click:t.addCount}},[t._v("+")]),t._v(" "),t._t("p1",[t._v("\n        只有父级不传值的时候才会显示\n    ")]),t._v(" "),t._t("p2",[t._v("\n        只有父级不传值的时候才会显示2\n    ")],{text:"我是子集数据----------"}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.age,expression:"age",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.age},on:{input:function(e){e.target.composing||(t.age=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),n("p",[t._v("\n        "+t._s(t._f("money")(t.parice))+"\n    ")]),t._v(" "),n("ul",t._l(t.evenNumbers,function(e,o){return n("li",{key:o},[t._v(t._s(e))])}),0)],2)},[],!1,null,null,null);e.default=component.exports},1762:function(t,e,n){"use strict";var o=n(1384);n.n(o).a},1763:function(t,e,n){(t.exports=n(16)(!1)).push([t.i,"div[data-v-15e36a78]{border:1px solid #ccc;background:#f1f1f1;margin:20px;padding:20px}",""])},1809:function(t,e,n){"use strict";n.r(e);n(50);var o={components:{Son:n(1416).default},data:function(){return{name:""}},methods:{childByValue:function(t){this.name=t}}},r=(n(1762),n(31)),component=Object(r.a)(o,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("p",[this._v("组件父级")]),this._v("\n    "+this._s(this.name)+"\n    "),e("Son",{attrs:{ages:12},on:{childByValue:this.childByValue}},[e("p",{attrs:{slot:"p1"},slot:"p1"},[this._v("我是父级传过来显示在插槽的")]),this._v(" "),e("p",{attrs:{slot:"p2","slot-socpe":"ddd"},slot:"p2"})])],1)},[],!1,null,"15e36a78",null);e.default=component.exports}}]);