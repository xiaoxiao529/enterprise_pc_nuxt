(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{1146:function(t,e,o){var content=o(1152);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("031c9afc",content,!0,{sourceMap:!1})},1148:function(t,e,o){"use strict";var r=o(6),l={data:function(){return{CmenuName:{}}},mounted:function(){this.CmenuName=r.a.getGlobalVal("CmenuName"),console.log("this.CmenuName:",this.CmenuName)}},n=(o(1151),o(31)),component=Object(n.a)(l,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h1",{staticClass:"l-head"},[e("span",[this._v(this._s(this.CmenuName.parName)+" >")]),this._v(" "),e("span",[this._v(this._s(this.CmenuName.name))])])])},[],!1,null,"3d4e79c6",null);e.a=component.exports},1151:function(t,e,o){"use strict";var r=o(1146);o.n(r).a},1152:function(t,e,o){(t.exports=o(16)(!1)).push([t.i,".l-head[data-v-3d4e79c6]{font-weight:400;font-family:Microsoft YaHei;padding:0 0 10px;margin-left:.6rem;text-align:left}.l-head span[data-v-3d4e79c6]{font-size:1.8rem;color:#717171;line-height:3.9rem}@media screen and (max-width:1440px){.l-head span[data-v-3d4e79c6]{line-height:1.7rem}}",""])},1358:function(t,e,o){var content=o(1710);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("73a9a4dc",content,!0,{sourceMap:!1})},1709:function(t,e,o){"use strict";var r=o(1358);o.n(r).a},1710:function(t,e,o){(t.exports=o(16)(!1)).push([t.i,".upload-content[data-v-f065624e]{height:calc(100vh - 173px);width:100%;background:#fff;text-align:left;padding:20px 0;overflow-y:auto}.upload-content .upload-content-from[data-v-f065624e]{width:470px}.upload-content .upload-content-from .el-upload-list[data-v-f065624e]{width:370px}",""])},1831:function(t,e,o){"use strict";o.r(e);var r=o(6),l=o(1148),n=(o(220),o(51),{components:{Title:l.a},data:function(){return{form:{fileList:[],setState:"",priority:"2",remarks:""},dialogFormVisible:!1,oFile:"",uploadData:{operationOrg:this.$route.params.operationOrgId,unitId:this.$route.params.unitId}}},methods:{handleRemove:function(t,e){console.log(t,e)},handlePreview:function(t){console.log(t)},onSubmit:function(){var t=this;""!=this.form.setState?""!=this.form.remarks?r.a.post("/remoteApi/tool/record/uploadInfo",{userId:r.a.getGlobalVal("userObj").id,operationOrg:this.uploadData.operationOrg,unitId:this.uploadData.unitId,priority:this.form.priority,oprFlag:this.form.setState,describe:this.form.remarks,fileUrl:"sss"}).then(function(e){"success"==e.code?t.$router.push({name:"PatrolPlan-addElectronic",params:{operationOrgId:t.operationOrgId,unitId:t.unitId,state:1}}):t.$message.error("保存失败")}):this.$message({type:"warning",message:"备注信息不能为空"}):this.$message({type:"warning",message:"状态类型不能为空"})},handleAvatarSuccess:function(t,e){},handleAvatarError:function(t,e,o){this.$message({message:"上传文件失败失败",type:"error"})},beforeAvatarUpload:function(t){this.oFile=t}}}),c=(o(1709),o(31)),component=Object(c.a)(n,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"upload-wrapper"},[o("div",{staticClass:"l-head"},[o("Title")],1),t._v(" "),o("div",{staticClass:"upload-content"},[o("el-form",{ref:"form",staticClass:"upload-content-from",attrs:{model:t.form,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"上传文件:"}},[o("el-upload",{staticClass:"upload-demo",attrs:{drag:"",multiple:"",action:"/remoteApi/tool/record/uploadfile",accept:"multipart/form-data",data:t.uploadData,"on-preview":t.handlePreview,"on-remove":t.handleRemove,"file-list":t.form.fileList,"on-error":t.handleAvatarError,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload,"auto-upload":!0}},[o("i",{staticClass:"el-icon-upload"}),t._v(" "),o("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),o("em",[t._v("点击上传")])])])],1),t._v(" "),o("el-form-item",{attrs:{label:"状态类型:"}},[o("el-select",{attrs:{placeholder:"请选择状态类型"},model:{value:t.form.setState,callback:function(e){t.$set(t.form,"setState",e)},expression:"form.setState"}},[o("el-option",{attrs:{label:"新建",value:"1"}}),t._v(" "),o("el-option",{attrs:{label:"补充",value:"2"}}),t._v(" "),o("el-option",{attrs:{label:"修改",value:"3"}}),t._v(" "),o("el-option",{attrs:{label:"删除",value:"4"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"优先级:"}},[o("el-select",{attrs:{placeholder:"请选择优先级"},model:{value:t.form.priority,callback:function(e){t.$set(t.form,"priority",e)},expression:"form.priority"}},[o("el-option",{attrs:{label:"普通",value:"2",selected:""}}),t._v(" "),o("el-option",{attrs:{label:"紧急",value:"1"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"备注:"}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.form.remarks,callback:function(e){t.$set(t.form,"remarks",e)},expression:"form.remarks"}})],1),t._v(" "),o("el-form-item",{attrs:{label:""}},[o("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("保存")]),t._v(" "),o("el-button",[t._v("取消")])],1)],1)],1)])},[],!1,null,"f065624e",null);e.default=component.exports}}]);