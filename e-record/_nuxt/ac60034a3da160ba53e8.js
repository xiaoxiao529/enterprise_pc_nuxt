(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{1398:function(e,t,l){var content=l(1791);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(17).default)("c2f9466e",content,!0,{sourceMap:!1})},1790:function(e,t,l){"use strict";var o=l(1398);l.n(o).a},1791:function(e,t,l){(e.exports=l(16)(!1)).push([e.i,".right-main-warpper[data-v-c91ef0b0]{background:#fff}.right-main-warpper .search-bar-wrapper[data-v-c91ef0b0]{padding-top:8px}.right-main-warpper .search-bar-wrapper .el-select[data-v-c91ef0b0]{width:100%}.right-main-warpper .el-button+.el-button[data-v-c91ef0b0]{margin-left:5px}.right-main-warpper[data-v-c91ef0b0] .demo-table-expand{font-size:0}.right-main-warpper[data-v-c91ef0b0] .demo-table-expand.dialog-expand .el-form-item{margin-bottom:8px}.right-main-warpper[data-v-c91ef0b0] .demo-table-expand.dialog-expand .el-form-item label{color:#0d87d4;text-align:left}.right-main-warpper[data-v-c91ef0b0] .demo-table-expand.dialog-expand .el-form-item .el-form-item__content{width:calc(100% - 20px)}.right-main-warpper[data-v-c91ef0b0] .demo-table-expand .el-form-item{margin-right:0;margin-bottom:0;width:25%}.right-main-warpper[data-v-c91ef0b0] .demo-table-expand .el-form-item label{width:110px;text-align:right;padding-left:5px;color:#99a9bf;display:inline-block}.right-main-warpper[data-v-c91ef0b0] .demo-table-expand .el-form-item .el-form-item__content{height:43px;width:calc(100% - 120px)}.right-main-warpper[data-v-c91ef0b0] .demo-table-expand .el-form-item .el-form-item__content .span-show{height:32px;display:inline-block;width:auto;max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.right-main-warpper .row-bg[data-v-c91ef0b0]{padding:15px 0 10px}.right-main-warpper .showHide[data-v-c91ef0b0]{display:none}.notab[data-v-c91ef0b0]{border-top:none}.task-list-content[data-v-c91ef0b0]{background:#fff;padding:5px}.task-list-content .task-list-top[data-v-c91ef0b0]{text-align:right;margin:5px 0;vertical-align:top}.task-list-content .task-list-top .el-button--primary[data-v-c91ef0b0]{vertical-align:top}.task-list-content .height-200[data-v-c91ef0b0]{padding:30px 0}.height-300[data-v-c91ef0b0]{max-height:560px;overflow-y:auto;overflow-x:hidden}[data-v-c91ef0b0] .el-table .el-table__body-wrapper{height:calc(100vh - 360px);overflow-y:auto}",""])},1851:function(e,t,l){"use strict";l.r(t);l(316);var o=l(6),n=l(1148),r=(l(51),l(1147)),d=l(1196),c=l(1197),f=l(1198),h={components:{Title:n.a,Pagination:r.a,Upload:d.a,EditUpload:c.a,OtherUpload:f.a},data:function(){return{menuKey:1000001,operationOrgId:"",unitId:"",selectedOptions:["1"],dialogAddVisible:!1,dialogEditVisible:!1,dialogOtherVisible:!1,formLabelWidth:"120px",plan:{},widgetInfo:{total:null,pageSize:12,pageNo:1},tableData:[],isLoading:!1,orgList:[],orgListValue:"",allUnitList:[],allUnitListVal:"",allUserList:[],allUserListVal:"",priorityList:[{id:"0003",value:"",label:"全部"},{id:"0001",value:"1",label:"紧急"},{id:"0002",value:"2",label:"普通"}],priorityListVal:"",oprFlagList:[{id:"00001",value:"",label:"全部"},{id:"00002",value:"1",label:"新建"},{id:"00003",value:"2",label:"修改"},{id:"00004",value:"3",label:"删除"},{id:"00005",value:"4",label:"补录"}],oprFlagListVal:"",recordStatusList:[{id:"001",value:"",label:"全部"},{id:"002",value:"1",label:"初审中"},{id:"003",value:"2",label:"初审驳回"},{id:"004",value:"3",label:"复审中"},{id:"005",value:"4",label:"复审驳回"},{id:"006",value:"5",label:"建档中"},{id:"007",value:"6",label:"建档驳回"},{id:"008",value:"7",label:"建档审核"}],recordStatusListVal:"",describesVal:"",uploadDataVal:{},editUploadData:{},otherUpload:{},roleName:null,roleId:null,userId:null,loading:!1}},created:function(){},mounted:function(){var e=this;this.$nextTick(function(){e.roleName=localStorage.getItem("roleName"),e.roleId=localStorage.getItem("roleId"),e.userId=localStorage.getItem("userId"),e.getOrgListByUserId()})},watch:{},methods:{changeSubVal:function(){this.allUnitListVal=null},changeUnitVal:function(){var e=this;return this.orgListValue=this.allUnitList.find(function(t){return t.value==e.allUnitListVal}).subCenterCode},getOrgListByUserId:function(){var e=this,t=this;o.a.post("/remoteApi/tool/org/findOrgListByRole",{userId:localStorage.getItem("userId"),roleName:localStorage.getItem("roleName")},5e3).then(function(l){"success"===l.code?l.data&&l.data.length>0&&(t.orgList=[],l.data.map(function(e){t.orgList.push({label:e.orgName,value:e.orgCode})})):e.$message({type:"warning",message:"错误"})}).catch(function(t){e.$message({type:"warning",message:t})})},getAllUnit:function(){var e=this,t=this;t.allUnitList=[],this.loading=!0,o.a.post("/remoteApi/tool/unit/findAllUnit",{subCenterCode:this.orgListValue},5e3).then(function(l){"success"===l.code&&(e.loading=!1,l.data&&l.data.length>0&&(t.allUnitList=[{label:"全部",value:"",subCenterCode:""}],l.data.map(function(e){t.allUnitList.push({label:e.label,value:e.value,subCenterCode:e.subCenterCode})})))}).catch(function(t){e.$message({type:"warning",message:t})})},findDetail:function(e,t){t.limtShow=!0,this._Storage.setObj("fileItem","obj",t),this.$router.push({name:"PatrolPlan-FacilitiesDetail",params:{row:t}}),localStorage.setItem("unitId",t.unitId),localStorage.setItem("uploadData",t.unitId),localStorage.setItem("routerFlag","routerFlagOne")},showButton:function(e,t){return e.indexOf(t)>-1},resetHandel:function(){this.describesVal=null,this.orgListValue=null,this.allUnitListVal=null,this.allUserListVal=null,this.priorityListVal=null,this.oprFlagListVal=null,this.recordStatusListVal=null,this.loadData("search")},saveHandelNewAdd:function(){this.dialogAddVisible=!1,this.loadData("search")},saveHandelEdit:function(){this.dialogEditVisible=!1,this.loadData("search")},showLabel:function(e,t){return t.find(function(t){return t.value==e}).label},loadData:function(e){var t=this;t.isLoading=!0,o.a.post("/remoteApi/tool/recordTrial/findRecordTrialList",{pageSize:t.widgetInfo.pageSize,pageNo:"search"==e?"1":t.widgetInfo.pageNo,subCenterCode:t.orgListValue,unitId:t.allUnitListVal,createdBy:t.allUserListVal,recordStatus:t.recordStatusListVal,describes:t.describesVal,priority:t.priorityListVal,oprFlag:t.oprFlagListVal,roleNames:localStorage.getItem("roleName"),userId:localStorage.getItem("userId")},5e3).then(function(e){"success"===e.code?(t.isLoading=!1,t.tableData=e.data.rows,t.widgetInfo.total=null==e.data.total?0:e.data.total,t.widgetInfo.pageSize=e.data.pageSize,t.widgetInfo.pageNo=e.data.pageNo):(t.isLoading=!1,t.$message({type:"warning",message:e.rspMsg}))}).catch(function(e){t.isLoading=!1,t.$message({type:"warning",message:e})})},submitAddBtn:function(){this.dialogAddVisible=!0,this.uploadDataVal.type="newAdd",this.uploadDataVal.timestamp=(new Date).getTime(),console.log(this.uploadDataVal.timestamp)},handleClose:function(){this.dialogAddVisible=!1,this.$refs.myChild.close()},sonHandleCurrentChange:function(e){this.widgetInfo.pageSize=e.pageSize?parseInt(e.pageSize):this.widgetInfo.pageSize,this.widgetInfo.pageNo=e.pageNo?parseInt(e.pageNo):this.widgetInfo.pageNo,this.loadData("load")},jumpLinkPage:function(e,t){this.$router.push({name:"PatrolPlan-addElectronic",params:{unitId:t.unitId,fileId:t.id,subCenterCode:t.subCenterCode,show:!0}})},handleUpload:function(e,t){console.log(e,t),this.dialogOtherVisible=!0}}},m=(l(1790),l(31)),component=Object(m.a)(h,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("div",{staticClass:"right-main-warpper"},[l("div",{staticClass:"h2-title-wrap"},[l("h2",{staticClass:"tilte-h2"},[e._v("任务列表")]),e._v(" "),l("div",{staticClass:"title-btn-wrap"},["超级管理员"==e.roleName||"提交人员"==e.roleName?[l("el-button",{attrs:{type:"success"},on:{click:e.submitAddBtn}},[l("i",{staticClass:"el-icon-plus"}),e._v("新增\n          ")])]:e._e()],2)]),e._v(" "),l("div",{staticClass:"search-bar-wrapper"},[l("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[l("el-form-item",{attrs:{label:"所属运营中心:"}},[l("el-select",{attrs:{placeholder:"请选择",filterable:""},on:{change:function(t){return e.changeSubVal()},focus:e.getOrgListByUserId},model:{value:e.orgListValue,callback:function(t){e.orgListValue=t},expression:"orgListValue"}},e._l(e.orgList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"企业名称:"}},[l("el-select",{attrs:{placeholder:"请选择",filterable:"",loading:e.loading},on:{focus:e.getAllUnit,change:function(t){return e.changeUnitVal()}},model:{value:e.allUnitListVal,callback:function(t){e.allUnitListVal=t},expression:"allUnitListVal"}},e._l(e.allUnitList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"任务描述:"}},[l("el-input",{model:{value:e.describesVal,callback:function(t){e.describesVal=t},expression:"describesVal"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"上传人:"}},[l("el-input",{model:{value:e.allUserListVal,callback:function(t){e.allUserListVal=t},expression:"allUserListVal"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"优先级:"}},[l("el-select",{attrs:{placeholder:"请选择",filterable:""},model:{value:e.priorityListVal,callback:function(t){e.priorityListVal=t},expression:"priorityListVal"}},e._l(e.priorityList,function(e){return l("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"任务类型:"}},[l("el-select",{attrs:{placeholder:"请选择",filterable:""},model:{value:e.oprFlagListVal,callback:function(t){e.oprFlagListVal=t},expression:"oprFlagListVal"}},e._l(e.oprFlagList,function(e){return l("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"任务状态:"}},[l("el-select",{attrs:{placeholder:"请选择",filterable:""},model:{value:e.recordStatusListVal,callback:function(t){e.recordStatusListVal=t},expression:"recordStatusListVal"}},e._l(e.recordStatusList,function(e){return l("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{staticClass:"t-right",staticStyle:{"text-align":"left"},attrs:{label:" "}},[l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.loadData("search")}}},[e._v("查询")]),e._v(" "),l("el-button",{on:{click:e.resetHandel}},[e._v("重置")])],1)],1)],1),e._v(" "),l("div",{staticClass:"newTable"},[l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],ref:"table",attrs:{data:e.tableData,stripe:""}},[l("el-table-column",{attrs:{align:"left","min-width":"15%","show-overflow-tooltip":!0,prop:"describes",label:"任务描述"}}),e._v(" "),l("el-table-column",{attrs:{align:"left","min-width":"10%","show-overflow-tooltip":!0,pageSize:"pageSize",prop:"unitName",label:"企业名称"}}),e._v(" "),l("el-table-column",{attrs:{align:"left","min-width":"12%","show-overflow-tooltip":!0,prop:"orgName",label:"运营中心名称"}}),e._v(" "),l("el-table-column",{attrs:{align:"left","min-width":"9%","show-overflow-tooltip":!0,prop:"userName",label:"上传人"}}),e._v(" "),l("el-table-column",{attrs:{align:"center","min-width":"9%",prop:"priority",label:"优先级",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-tag",{attrs:{type:1===t.row.priority?"danger":"primary","disable-transitions":""}},[e._v(e._s(1===t.row.priority?"紧急":"普通"))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center","min-width":"10%",prop:"oprFlag",label:"任务类型",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.showLabel(t.row.oprFlag,e.oprFlagList)))]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"left","min-width":"10%",prop:"recordStatus",label:"任务状态",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.showLabel(t.row.recordStatus,e.recordStatusList)))]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center","min-width":"15%",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"text"},on:{click:function(l){return e.findDetail(t.$index,t.row)}}},[e._v("查看详情")])]}}])})],1)],1),e._v(" "),l("Pagination",{attrs:{widgetInfo:e.widgetInfo},on:{sonHandleCurrentChange:e.sonHandleCurrentChange}})],1),e._v(" "),l("el-dialog",{staticClass:"newDigWrap",attrs:{title:"新增",visible:e.dialogAddVisible,"close-on-press-escape":!1,"close-on-click-modal":!1,width:"580px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogAddVisible=t}}},[l("div",{staticClass:"height-300"},[l("Upload",{ref:"myChild",attrs:{uploadDataVal:e.uploadDataVal},on:{saveHandel:e.saveHandelNewAdd}})],1)]),e._v(" "),l("el-dialog",{attrs:{title:"编辑",visible:e.dialogEditVisible},on:{"update:visible":function(t){e.dialogEditVisible=t}}},[l("div",{staticClass:"height-300"},[l("EditUpload",{attrs:{editUploadData:e.editUploadData},on:{saveHandel:e.saveHandelEdit}})],1)])],1)},[],!1,null,"c91ef0b0",null);t.default=component.exports}}]);