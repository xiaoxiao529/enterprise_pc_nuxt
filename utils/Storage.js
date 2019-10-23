/*
 * @Author: TanZer.hanyu
 * @Date: 2019-05-10 17:34:14
 * --- 封装localStorage ----
 * */
const _Storage = class Storage {
    /**
     * 判断浏览器是否支持localStorage
     */
    _hasLocalStorage() {
        if (!window.localStorage) {
            console.log('浏览器不支持localStorage');
            return true;
        }
        return false;
    }
    /**
     * 存储localStorage
     * @param {*} key
     * @param {*} content
     */
    set(key, content) {
        if (this._hasLocalStorage()) {
            return;
        }
        if (!key) {
            return;
        }
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        // 防止超出本地存储限额！
        try {
            window.localStorage.setItem(key, content);
        } catch (oException) {
            if (oException.name == 'QuotaExceededError') {
                console.log('超出本地存储限额！');
            }
        }
    }
    /**
     * 获取localStorage
     * @param {*} key
     */
    get(key) {
        if (this._hasLocalStorage()) {
            return;
        }
        if (!key) {
            return;
        }
        return window.localStorage.getItem(key);
    }
    /**
     * 存储localStorage 对象
     * @param {*} _KEY
     * @param {*} key 对象内的key
     * @param {*} content
     */
    setObj(_KEY, key, content) {
        if (this._hasLocalStorage()) {
            return;
        }
        let OB = this.get(_KEY);
        OB = !OB ? {} : JSON.parse(OB);
        OB[key] = content;
        this.set(_KEY, OB);
    }
    /**
     * 获取localStorage 对象
     * @param {*} _KEY
     * @param {*} key 对象内的key
     */
    getObj(_KEY, key) {
        if (this._hasLocalStorage()) {
            return;
        }
        let OB = this.get(_KEY);
        OB = !OB ? {} : JSON.parse(OB);

        return OB[key];
    }
    /**
     * 删除localStorage
     * @param {*} key
     */
    remove(key) {
        if (this._hasLocalStorage()) {
            return;
        }
        if (!key) {
            return;
        }
        window.localStorage.removeItem(key);
    }
    /**
     * 清空clearStorage
     * @param {*} key
     */
    clear(key) {
        if (this._hasLocalStorage()) {
            return;
        }
        if (!key) {
            return;
        }
        window.localStorage.clear();
    }
    /**
     * 当前localStorage剩余容量
     */
    querySize() {
        if (this._hasLocalStorage()) {
            return;
        }
        var size = 0;
        for (let key in window.localStorage) {
            if (window.localStorage.hasOwnProperty(key)) {
                size += window.localStorage.getItem(key).length;
            }
        }
        console.log('当前localStorage剩余容量为' + (size / 1024).toFixed(2) + 'kb');
    }

    // =============Dylan

    getStorage(name, val) {
        var v = localStorage.getItem(name),
            w
        if (v == null) {
            return val
        }
        if (typeof v == 'string') {
            try {
                w = JSON.parse(v)
                if (typeof(w) == 'object') {
                    return w
                } else {
                    return v
                }
            } catch (e) {
                return v
            }
        }
    }
    setStorage(name, data, source) {
        if (typeof(data) == 'object') {
            if (typeof(source) == 'undefined') {
                source = {}
            }
            for (var key in data) {
                source[key] = data[key]
                if (typeof(data[key]) == 'object') {
                    localStorage.setItem(name + "_" + key, JSON.stringify(data[key]))
                } else {
                    localStorage.setItem(name + "_" + key, data[key])
                }
            }
        } else {
            source = data
            localStorage.setItem(name, data)
        }
        return source
    }
};
export default new _Storage();