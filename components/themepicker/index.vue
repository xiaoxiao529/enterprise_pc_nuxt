<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    popper-class="theme-picker-dropdown"/>
</template>

<script>

const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color

export default {
  data () {
    return {
      chalk: '', // content of theme-chalk css
      theme: ORIGINAL_THEME
    }
  },
  watch: {
    theme (val, oldVal) {
      console.log(val,oldVal)
      if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      console.log(themeCluster, originalCluster)
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        this.getCSSString(url, chalkHandler, 'chalk')
      } else {
        chalkHandler()
      }

      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(style => {
        console.log(style)
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })
      let subItem = [].slice.call(document.getElementsByClassName('el-menu-item')).filter(item => {
        item.onmouseover = function(){
          let _child = item.childNodes[0]
          if(_child.nodeName === 'SPAN'){
            _child.style.background = val
          }

        }
        item.onclick = function () {
          [].slice.call(document.getElementsByClassName('el-menu-item')).map(i => {
            i.isClick = false
            let _child = i.childNodes[0]
            if(_child.nodeName === 'SPAN'){
              _child.style.background = ''
            }
          })
          item.isClick = true
          let _child = item.childNodes[0]
          if(_child.nodeName === 'SPAN'){
            _child.style.background = val
          }
        }
        item.onmouseleave = function(){
          if(!item.isClick) {
            item.childNodes[0].style.background = ''
          }

        }
      })
      let _active = document.getElementsByClassName('el-menu-item is-active')
      if(_active.length !== 0){
        let _child = _active[0].childNodes[0]
        if(_child.nodeName === 'SPAN'){
          _child.style.background = val
        }
      }
      document.getElementById('change-style-header').style.background = val
      this.$message({
        message: '换肤成功',
        type: 'success'
      })
    }
  },
  updated (){
    let val = this.theme

      document.getElementById('change-style-header').style.background = val
  },
  methods: {
    updateStyle (style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    getCSSString (url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          callback()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },

    getThemeCluster (theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>

<style>
.el-color-picker{
  /* position: absolute !important; */
  position: relative;
  top: 10px;
  display: none;
}
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
  margin-bottom: 20px;
  margin-left: 10px;
  /* top: 10px;
  right: 285px; */
}
.theme-picker :after{
    content: '';
    position: absolute;
    top: 30%;
    bottom: 0;
    right: 0;
    width: 0px;
    height: 40%;
    background-color: #d9d9d9;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
