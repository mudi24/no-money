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
  @Prop() chartOption!: ChartOption[];
  @Prop() type!: string;
  @Prop() dateType!: string;
  name = "chart";
  xDate = this.chartOption.map(i => i.name);
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
            data: this.chartOption.map(i => {
              return { name: i.name, value: this.beautifyAccount(i.value) };
            })
          }
        ]
      };
    } else {
      option = {
        xAxis: {
          data: this.xDate,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            fontSize: 10
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
            type: "line",
            data: this.chartOption,
            label: {
              show: true,
              formatter: "￥{c}",
              textStyle: {
                fontSize: 10,
                fontWeight: "bolder",
                color: "#403f67"
              }
            },
            itemStyle: {
              color: "#cac7d5"
            },
            lineStyle: {
              width: 2
            },
            symbolSize: 3,
            smooth: 0.5
          }
        ]
      };
    }
    myChart.clear();
    myChart.setOption(option);
  }

  mounted() {
    this.drawChart();
  }
}
</script>

<style lang="scss" scoped></style>
