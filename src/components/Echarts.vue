<template>
  <div id="chart">
    <div id="main" style="width: 100%vw;height:30vh;"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Echarts extends Vue {
  @Prop() chartOption!: ChartOption;
  name = "chart";
  drawChart() {
    let myChart = (this as any).$echarts.init(document.getElementById("main"));
    let option = {
      title: [
        {
          text: "支出",
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
    myChart.setOption(option);
  }

  mounted() {
    this.drawChart();
  }
}
</script>

<style lang="scss" scoped></style>
