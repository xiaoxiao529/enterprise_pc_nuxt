<template>
  <div>

          <el-table :data="data" style="width: 100%">

            <el-table-column prop="name" label="name"></el-table-column>
            <el-table-column prop="pwdUpdateDate" label="pwdUpdateDate"></el-table-column>
            <el-table-column prop="orgCode" label="orgCode"></el-table-column>
            <el-table-column prop="loginName" label="loginName"></el-table-column>
            <el-table-column prop="id" label="id"></el-table-column>
          </el-table>

  </div>
</template>
<script>
  import _ from 'myloadsh';
  import merge from 'lodash.merge';
  export default {
    data() {
      return {
        data: [{
          "id": "ff808081642509d801642774b2880013",
          "loginName": "yaojialei",
          "password": "Y13RNmw6TBE=",
          "name": "姚家雷",
          "sex": "1",
          "orgCode": "340100YYZX201805230001",
          "registerDate": "2018-06-22 00:00:00",
          "saveDate": "2018-06-22 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "INFORMATION_OPERATING_01,MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-06-22 20:25:16",
        }, {
          "id": "2c909213644bdcf101646a4377fc000f",
          "loginName": "hhht01",
          "password": "Y13RNmw6TBE=",
          "name": "呼和浩特市运营中心",
          "sex": "1",
          "orgCode": "150100YYZX201807030001",
          "registerDate": "2018-07-05 00:00:00",
          "saveDate": "2018-09-12 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-08-16 17:09:44",
          "isLock": "false",
          "lockType": "",
          "lockDate": "2018-07-07 20:41:54",
          "extendStr1": "",
          "extendStr2": "",
          "extendStr3": ""
        }, {
          "id": "4028979763a9e3cf0163aa7a6bb80001",
          "loginName": "yyzx01",
          "password": "Y13RNmw6TBE=",
          "name": "合肥市运营中心",
          "sex": "1",
          "orgCode": "340100YYZX201805230001",
          "registerDate": "2018-05-29 00:00:00",
          "saveDate": "2018-09-05 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "FWZX_OPERATING_01,INFORMATION_OPERATING_01,MONITOR_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-09-05 16:02:15",
          "isLock": "false",
          "lockType": "",
          "lockDate": "2018-07-23 10:34:40",
          "extendStr1": "",
          "extendStr2": "",
          "extendStr3": ""
        }, {
          "id": "ff808081642509d80164276e4f470007",
          "loginName": "baopengfei",
          "password": "Y13RNmw6TBE=",
          "name": "包鹏飞",
          "sex": "1",
          "orgCode": "340100YYZX201805230001",
          "registerDate": "2018-06-22 00:00:00",
          "saveDate": "2018-06-22 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "INFORMATION_OPERATING_01,MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-06-22 20:18:18",
          "isLock": "false",
          "lockType": "",
          "lockDate": "2018-08-29 15:29:41",
          "extendStr1": "",
          "extendStr2": "",
          "extendStr3": ""
        }, {
          "id": "2c909213644bdcf10164daefc9d30084",
          "loginName": "bt01",
          "password": "Y13RNmw6TBE=",
          "name": "包头市运营中心",
          "sex": "1",
          "orgCode": "150200YYZX201807260001",
          "registerDate": "2018-07-27 00:00:00",
          "saveDate": "2018-07-27 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-07-27 16:51:45",
        }, {
          "id": "ff808081642509d8016427738145000d",
          "loginName": "guanjinfu",
          "password": "Y13RNmw6TBE=",
          "name": "关劲夫",
          "sex": "1",
          "orgCode": "340100YYZX201805230001",
          "registerDate": "2018-06-22 00:00:00",
          "saveDate": "2018-06-22 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "INFORMATION_OPERATING_01,MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-06-22 20:23:58",
        }, {
          "id": "2c909213644bdcf10164a6e7a2f7002f",
          "loginName": "lzhsh01",
          "password": "Y13RNmw6TBE=",
          "name": "兰州市运营中心",
          "sex": "1",
          "orgCode": "620100YYZX201807170001",
          "registerDate": "2018-07-17 00:00:00",
          "saveDate": "2018-07-27 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-07-27 17:32:56",
        }, {
          "id": "2c909213644bdcf10164dadbe309007b",
          "loginName": "bd01",
          "password": "Y13RNmw6TBE=",
          "name": "保定市运营中心",
          "sex": "1",
          "orgCode": "130600YYZX201807260001",
          "registerDate": "2018-07-27 00:00:00",
          "saveDate": "2018-07-27 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-07-27 16:30:00",
          "isLock": "false",
          "lockType": "",
          "lockDate": "2018-08-29 15:47:43",
          "extendStr1": "",
          "extendStr2": "",
          "extendStr3": ""
        }, {
          "id": "2c91a65d64d1a84801659331992e006e",
          "loginName": "tiyan",
          "password": "fwR07bI/vrlqjIpM9eY7PQ==",
          "name": "体验用户",
          "sex": "1",
          "orgCode": "340100YYZX201807260001",
          "registerDate": "2018-09-01 00:00:00",
          "saveDate": "2018-09-01 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "FWZX_OPERATING_01,INFORMATION_OPERATING_01,MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-09-01 11:33:45",
        }, {
          "id": "2c91a65d64d1a8480164ee646a6f001b",
          "loginName": "jiuj01",
          "password": "Y13RNmw6TBE=",
          "name": "九江市运营中心",
          "sex": "1",
          "orgCode": "360400YYZX201807260001",
          "registerDate": "2018-07-31 00:00:00",
          "saveDate": "2018-08-30 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 1,
          "pwdUpdateDate": "2018-07-31 11:31:55",
        }, {
          "id": "2c909213644bdcf10164daf510e7008e",
          "loginName": "wh01",
          "password": "Y13RNmw6TBE=",
          "name": "乌海市运营中心",
          "sex": "1",
          "orgCode": "150300YYZX201807260001",
          "registerDate": "2018-07-27 00:00:00",
          "saveDate": "2018-07-27 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-07-27 16:57:31",
        }, {
          "id": "2c91a65d64d1a8480165a9ba53020077",
          "loginName": "linyi01",
          "password": "Y13RNmw6TBE=",
          "name": "临沂市运营中心",
          "sex": "1",
          "orgCode": "371300YYZX201809050001",
          "registerDate": "2018-09-05 00:00:00",
          "saveDate": "2018-09-05 00:00:00",
          "deleteFlag": "0",
          "activateState": "0",
          "saveType": "0",
          "tenantId": "",
          "belongRoleName": "MONITOR_OPERATING_01,YYZX_OPERATING_01",
          "userType": 0,
          "pwdUpdateDate": "2018-09-05 20:34:45",
        }]
      }
    },
    methods: {

    },
    mounted() {
     this.data = _.sortBy(this.data, function(item){
        return item.pwdUpdateDate;
      })

       var object = {
  'a': [{ 'b': 2,'ss':5 }, { 'b': 2,'ss':5 }]
};
 
var other = {
  'a': [{ 'b': 3,'c': 3 }, { 'b': 3,'c': 63 }]
};
//console.log(merge(object, other).a);

// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }

        
        // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }

    }

  };

</script>

<style lang="scss" scoped>
.el-table{    height: calc(100vh - 141px);
    overflow-y: auto;} 

</style>
