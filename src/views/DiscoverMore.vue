<template>
  <div id="app">
    <div id="main" style="width: 350px;height:400px;"></div>
  </div>
</template>

<script lang="js">
export default {
  name: "app",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            itemStyle: {
                // 设置扇形的颜色
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            data:[
                {value:235, name:'餐饮',itemStyle: {color: '#a7e566'}},
                {value:274, name:'购物',itemStyle: {color: '#85a4ff'}},
                {value:310, name:'日用',itemStyle: {color: '#64d4ea'}},
                {value:335, name:'交通',itemStyle: {color: '#c2a0ff'}},
                {value:400, name:'医疗',itemStyle: {color: 'yellowgreen'}}
            ]
        }
    ]

      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style lang="scss" scoped></style>
