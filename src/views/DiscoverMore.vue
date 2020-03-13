<template>
  <div id="app">
    <div id="main" style="width: 350px;height:300px;"></div>
  </div>
</template>

<script lang="js">
export default {
  name: "app",
  methods: {
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
          title: {
                text: 'ECharts 入门示例'
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                lineStyle: {
                    opacity: 1
                }
              },
            },
            yAxis: {
              axisLine:{
                // show:false
                lineStyle: {
                  opacity: 0
                }
              },
              splitLine: {
                lineStyle: {
                    opacity: 0
                }
              },
              axisTick:{
                show:false
              },
              axisLabel: undefined,
            },

            series: [{
                // name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20],
                markLine: { // markLine 也是同理
                  symbol:['none','triangle'],
                  symbolSize: [10,10],
                  itemStyle: {
                    normal: {
                        borderWidth: 1,
                        lineStyle: {
                            opacity: 0,
                            type: 'dotted',
                            color: 'gray',
                            width: 1,
                        },
                    },
                      emphasis:{
                        borderWidth: 1,
                        lineStyle: {
                            opacity: 1,
                            type: 'dotted',
                            color: 'gray',
                            width: 2,
                        },
                      }
                    },
                    label: {
                          normal:{
                            show:false,
                            formatter: '￥82.00',
                            textStyle: {
                                fontSize: 14,
                                fontWeight: "bolder",
                            },

                          },
                          emphasis:{
                            show:true,
                          }
                        },
                    data: [
                    [{
                        coord: ['雪纺衫', 0]
                    }, {
                        coord: ['雪纺衫', 40]
                    }],
                    [{
                        coord: ['高跟鞋', 0]
                    }, {
                        coord: ['高跟鞋', 40]
                    }],
                    [{
                        coord: ['衬衫', 0]
                    }, {
                        coord: ['衬衫', 40]
                    }]
                ],
                },
                cursor : 'pointer',
                label: {
                  // show:true,
                },
                itemStyle:{
                  color:'#403f67'
                },
                lineStyle:{
                  width:2
                },
                // symbol: 'star',
                symbolSize:1,
                // showSymbol:true,
                smooth: 0.5,
            }]
          }
      myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style lang="scss" scoped></style>
