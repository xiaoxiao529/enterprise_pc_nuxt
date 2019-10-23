<template>
  <span>
      <input class="input-file" type="file" @change="exportData"
           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
      <el-button type="primary"  @click="btnClick">{{title}}</el-button>

  </span>
</template>

<script>
    import XLSX from 'xlsx'

    export default {
        name: "inputExcel",
        props: {
            type: String,
            default: "选择excel文件"
        },
        data(){
            return{
                title:'导入',
                opitions:[]
            }
        },
        methods: {
            btnClick() {
                document.querySelector(".input-file").click();
            },
            exportData(event) {
                if(!event.currentTarget.files.length) {
                    return;
                }
                const that = this;
                // 拿取文件对象
                var f = event.currentTarget.files[0];
                // 用FileReader来读取
                var reader = new FileReader();

                // 重写FileReader上的readAsBinaryString方法
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var wb; // 读取完成的数据
                    var outdata; // 你需要的数据
                    reader.onload = function(e) {
                        // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }

                        // 接下来就是xlsx了，具体可看api
                        wb = XLSX.read(binary, {
                            type: "binary"
                        });
                        //定义sheetList中存放excel表格的sheet表，就是最下方的tab
                        let sheetList = wb.SheetNames;
                        //存放json数组格式的表格数据
                        let resultJson = [];
                        //存放字符串数组格式的表格数据
                        let resultFormulae = [];
                        sheetList.forEach(function(y) {
                            let worksheet = wb.Sheets[y]
                            let json = XLSX.utils.sheet_to_json(wb.Sheets[y])
                            let formulae = XLSX.utils.sheet_to_formulae(wb.Sheets[y])
                            if(json.length > 0){
                                //具体如何处理看项目需求，我的项目其实只有一个sheet，在这里写成循环避免大家误会
                                //数据处理与存放
                                resultJson.push(json)
                                resultFormulae.push(formulae)
                            }

                        });
                        //outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                        // 自定义方法向父组件传递数据
                        that.$emit("getResult", resultJson,sheetList,f);
                    };
                    if(reader.readyState == 2){
                        let fileObj = reader.readAsText(f)
                        console.log(999,fileObj)
                    }
                    reader.readAsArrayBuffer(f);
                };
                reader.readAsBinaryString(f)
            },

        }
    }
</script>

<style scoped>
    .input-file {
        display: none;
    }
</style>
