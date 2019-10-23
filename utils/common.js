  export default {
    /**
     * @description 专门处理请求回的json父子数据
     * @param {Array} json 待处理的json数据
     * @param {String} children 子数组名称  
     * @param {String} id  id字段名称
     * @param {String} parentId 父id字段名称
     */
    // formatJSONTreeData(json, children, id, parentId) {
    //   var ret = [],
    //     o = {};

    //   function add(arr, data) {

    //     var obj = data;
    //     o[data[id]] = obj;
    //     if (!o[data[id]][children]) {
    //       o[data[id]][children] = [];
    //     }
    //     arr.push(obj);
    //   }

    //   json.forEach(x => {
    //     if (o[x[parentId]]) {
    //       add(o[x[parentId]][children], x);
    //     } else {
    //       add(ret, x);
    //     }
    //   });
    //   return ret;

    // },

    formatJSONTreeData(arr, children_attr, id_attr, parentId_attr) {
      for (var t = [],
          a = {},
          s = id_attr,
          c = parentId_attr,
          l = children_attr,
          u = 0,
          i = 0,
          p = arr.length; u < p; u++)
        a[arr[u][id_attr]] = arr[u];
      for (; i < p; i++) {
        var f = arr[i],
          h = a[f[c]];
        h ?
          (
            !h[l] && (h[l] = []), h[l].push(f)
          ) : t.push(f)
      }
      return t
    },
    /**
     * TODO: 针对民政局不同缩写 特殊id进行处理
     * 针对民政局 民政厅缩写不同,特殊化处理json
     */
    formatJSONTreeDataSpecial(json, children, id, parentId) {
      var ret = [],
        o = {},
        REG_MZ = new RegExp(/\w{4}_(MZ)(T|J)_\d{8}/);

      function add(arr, data) {

        var obj = data;
        o[data[id]] = obj;
        if (!o[data[id]][children]) {
          o[data[id]][children] = [];
        }
        arr.push(obj);
      }

      json.forEach(x => {
        // 先判断x.id 是否符合 民政局形式
        if (REG_MZ.test(x[parentId])) {

        } else {
          add(o[x[parentId]][children], x);
        }
        if (o[x[parentId]]) {


        } else {
          add(ret, x);
        }
      });

      return ret;

    },

    /**
     * 用于复制出一个无关联的新对象
     * 用于解决同组件间重复引用数据产生的数据关联问题
     * @param {Object} json json对象
     */
    deepCopy(json) {
      return JSON.parse(JSON.stringify(json))
    },

    formatJSONMenu(srcarr, tgtarr) {

      var SRC_NAME_TXT = 'menuName';
      var SRC_VALUE_TXT = 'name';
      var CHILD_TXT = 'children';
      

      /**
       * 遍历原数组 得到比对属性
       * @param arr 原数组
       */
      var FilterSrc = function (arr, tgtarr) {
        for (var i = 0; i < arr.length; i++) {
          var src_obj = arr[i];
          FilterSrcAttr(src_obj, tgtarr)
        }
        return tgtarr;
      }
      /**
       * 
       * @param src_obj 当前原数组对象
       */
      var FilterSrcAttr = function (src_obj, tgtarr) {
        var res;
        for (var obj_attr_name in src_obj) {
          // 若当前属性为比对属性
          if (obj_attr_name == SRC_NAME_TXT) {
            res = FilterTarget(src_obj, tgtarr)
          }
          // 若当前属性为子数组属性
          if (obj_attr_name == CHILD_TXT) {
            FilterSrc(src_obj[obj_attr_name], tgtarr)
          }
        }
        return res;

      }

      /**
       * @param src_obj 参照对象
       * @param arr 添加属性的数组
       */
      var FilterTarget = function (src_obj, arr) {
        // src_obj 已经确定有index 属性、menuName属性的对象 现在要拿这个对象去比对该目标数组

        for (var i = 0; i < arr.length; i++) {
          arr[i] = FilterTargetAttr(src_obj, arr[i]);
        }
        return arr
      }
      /**
       * 
       * @param obj 目标对象
       * @param attr 
       */
      var FilterTargetAttr = function (src_obj, obj) {
        // 如果menuName属性对应

        if (obj[SRC_NAME_TXT] == src_obj[SRC_NAME_TXT] && src_obj['parentName']==obj['parentName']) {
          // 判断对象是否已经存在 需要添加的属性 如果已经存在,就不赋值了
          if (!obj[SRC_VALUE_TXT]) {
            obj[SRC_VALUE_TXT] = src_obj['name']
          }
        }
        if (!!obj[CHILD_TXT]) {
          FilterTarget(src_obj, obj[CHILD_TXT])
        }
        // 如果存在child属性，则以该属性为基础数组，迭代
        return obj;

      }
      // 为数组每个元素添加parentName属性,以便于比较
      var FilterArr  = function(arr, parentName) {
        parentName = parentName || '虚根节点'
        for (var i = 0; i < arr.length; i++) {
          FilterAttr(arr[i], parentName)
        }
        return arr
      }

      var FilterAttr  = function(obj, parentName) {
        obj.parentName = parentName
        if (obj.children) {
          FilterArr(obj.children, obj.menuName)
        }
      }
      srcarr = FilterArr(srcarr)
      tgtarr = FilterArr(tgtarr)
      var menuO = FilterSrc(srcarr, tgtarr)
      return menuO
    }
  }
