<template>
  <div id="chart">
    <div id="main" style="width: 100%vw;height:30vh;"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Echarts extends Vue {
  @Prop() chartOption!: ChartOption;
  @Prop() type!: string;
  @Prop() dateType!: string;
  name = "chart";
  @Watch("type")
  onTypeChang() {
    this.drawChart();
  }
  @Watch("dateType")
  onChartOptionChang() {
    this.drawChart();
  }
  drawChart() {
    let myChart = (this as any).$echarts.init(document.getElementById("main"));
    let option;
    if (this.dateType === "月" || this.dateType === "年") {
      option = {
        title: [
          {
            text: this.type,
            top: "45%",
            left: "45%",
            textStyle: {
              color: "#000",
              fontSize: 14,
              fontWeight: 500
            }
          }
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["30%", "60%"],
            // center: "支出",
            label: {
              formatter: "{b}: {d}%"
            },
            color: [
              "#a7e566",
              "#85a4ff",
              "#64d4ea",
              "#c2a0ff",
              "#ffd1ad",
              "#ffecb8"
            ],
            data: this.chartOption
            // [
            //   { value: 235, name: "餐饮", itemStyle: { color: "#a7e566" } },
            //   { value: 274, name: "购物", itemStyle: { color: "#85a4ff" } },
            //   { value: 310, name: "日用", itemStyle: { color: "#64d4ea" } },
            //   { value: 335, name: "交通", itemStyle: { color: "#c2a0ff" } },
            //   { value: 400, name: "医疗", itemStyle: { color: "yellowgreen" } }
            // ]
          }
        ]
      };
    } else {
      option = {
        xAxis: {
          data: ["餐饮", "购物", "日用", "交通", "医疗"],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          splitLine: {
            lineStyle: {
              opacity: 0
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: undefined
        },
        series: [
          {
            name: "销量",
            type: "line",
            data: [
              { value: 235, name: "餐饮" },
              { value: 274, name: "购物" },
              { value: 310, name: "日用" },
              { value: 335, name: "交通" },
              { value: 400, name: "医疗" }
            ],
            markLine: {
              symbol: ["none", "triangle"],
              symbolSize: [10, 10],
              itemStyle: {
                normal: {
                  lineStyle: {
                    opacity: 0,
                    width: 40
                  }
                },
                emphasis: {
                  borderWidth: 1,
                  lineStyle: {
                    opacity: 1,
                    type: "dotted",
                    color: "#ecebf0",
                    width: 2
                  }
                }
              },
              label: {
                normal: {
                  show: false,
                  formatter: "￥{c}",
                  textStyle: {
                    fontSize: 14,
                    fontWeight: "bolder",
                    color: "#403f67"
                  }
                },
                emphasis: {
                  show: true
                }
              },
              data: [
                [
                  {
                    coord: [0, 0]
                  },
                  {
                    coord: [0, 400]
                  }
                ],
                [
                  {
                    coord: [1, 0]
                  },
                  {
                    coord: [1, 400]
                  }
                ]
                // [
                //   {
                //     coord: ["雪纺衫", 0]
                //   },
                //   {
                //     coord: ["雪纺衫", 400]
                //   }
                // ]
              ]
            },
            itemStyle: {
              color: "#cac7d5"
            },
            lineStyle: {
              width: 2
            },
            symbolSize: 1,
            smooth: 0.5
          }
        ]
      };
    }

    myChart.setOption(option);
  }

  mounted() {
    this.drawChart();
  }
}
</script>

<style lang="scss" scoped></style>
