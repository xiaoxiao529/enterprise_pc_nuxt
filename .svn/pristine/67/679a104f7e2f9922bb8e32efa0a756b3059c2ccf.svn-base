<template>
  <div id="echarts">
    <div id="myChart"></div>
    <div id="myChart2"></div>
    <!-- 折线图 -->
    <div id="chartmainline" style=""></div>
    <!-- 柱状图 -->
    <div id="chartmainbar" style=""></div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'Echarts',
    data() {
      return {
        optionline: {
          title: {
            text: 'ECharts 折线图'
          },
          tooltip: {},
          legend: {
            data: ['用户来源']
          },
          xAxis: {
            data: ["Android", "IOS", "PC", "Ohter"]
          },
          yAxis: {

          },
          series: [{
            name: '访问量',
            type: 'line', //设置图表主题
            data: [500, 200, 360, 100]
          }]
        },
        optionbar: {
          title: {
            text: 'ECharts 柱状图'
          },
          tooltip: {},
          legend: {
            data: ['用户来源']
          },
          xAxis: {
            data: ["Android", "IOS", "PC", "Ohter"]
          },
          yAxis: {

          },
          series: [{
            name: '访问量',
            type: 'bar', //设置图表主题
            data: [500, 200, 360, 100]
          }]
        }
      }
    },
    methods: {
      echartsInit() {
        // 找到容器
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 开始渲染
        myChart.setOption({
          title: {
            text: '在Vue中使用echarts'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      },
      echartsInit2() {
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        myChart.setOption({
          title: {
            text: 'echarts 饼图'
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [{
                value: 235,
                name: '视频广告'
              },
              {
                value: 274,
                name: '联盟广告'
              },
              {
                value: 310,
                name: '邮件营销'
              },
              {
                value: 335,
                name: '直接访问'
              },
              {
                value: 400,
                name: '搜索引擎'
              }
            ]
          }]
        })
      },
      drawLine: function () {
        //基于准本好的DOM，初始化echarts实例
        let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
        let chartmainbar = this.$echarts.init(document.getElementById("chartmainbar"));
        //绘制图表
        chartmainline.setOption(this.optionline);
        chartmainbar.setOption(this.optionbar);


      }
    },
    mounted() {
      this.echartsInit()
      this.echartsInit2()
      this.drawLine()
    }

  }

</script>
<style lang="scss" scoped>
  #echarts {
    margin-left: auto;
    margin-right: auto;

    #myChart {
      width: 600px;
      height: 300px;
      float: left;
    }

    #myChart2 {
      width: 600px;
      height: 300px;
      float: right;
    }

    #chartmainline {
      width: 600px;
      height: 400px;
      float: left;
    }

    #chartmainbar {
      width: 600px;
      height: 400px;
      float: right;
    }
  }

</style>
