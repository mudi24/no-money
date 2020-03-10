<template>
  <Layout>
    <ChartHeader :dataSource="tabsInfo"></ChartHeader>
    <main>
      <div class="chart-wrapper">
        <div class="chart-title">
          <div class="chart-title-left">
            <span class="info">10/14-10/20，支出总额</span>
            <span class="amount">￥718.00</span>
          </div>
          <div class="chart-title-right">
            <span class="exponse">支出</span>
            <span class="income">收入</span>
          </div>
        </div>
        <Echarts :chartOption="currentChartOption"></Echarts>
      </div>
      <div class="leaderboard">
        <p class="title">本周支出排行榜</p>
        <ol v-for="item in currentChartOption" :key="item.name">
          <li class="item">
            <span class="icon-wrapper">
              <Icon :name="item.tagValue"></Icon>
            </span>
            <div class="info-wrapper">
              <div class="info">
                <span class="tag">{{ item.name }}</span>
                <span class="amount">{{ item.value }}</span>
              </div>
              <!-- <div class="line">111</div> -->
            </div>
          </li>
        </ol>
      </div>
    </main>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import dayjs from "dayjs";
import ChartHeader from "@/components/ChartHeader.vue";
import FilterRecordList from "@/mixins/FilterRecordList";
import Echarts from "@/components/Echarts.vue";

@Component({
  components: {
    ChartHeader,
    Echarts
  }
})
export default class Chart extends mixins(FilterRecordList) {
  tabsInfo = ["周", "月", "年"];
  currentMonth = "";
  currentChartOption: ChartOption[] = [];
  created() {
    this.$store.commit("fetchRecords");
    this.currentMonth = this.getCurrentMonthOrYear("月");
    this.currentChartOption = this.getMonthOptionList(this.currentMonth, "-");
    console.log(this.currentChartOption);
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  background: #ffffff;
  .chart-title {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    .chart-title-left {
      display: flex;
      flex-direction: column;
      .info {
        font-size: 14px;
        color: gray;
      }
      .amount {
        font-size: 18px;
        font-weight: 600;
        color: #403f67;
      }
    }
    .chart-title-right {
      padding: 8px;
      font-size: 12px;
      .exponse {
        padding: 3px 10px;
        border: 1px solid #000;
        border-radius: 16px;
      }
      .income {
        margin-left: 2em;
        padding: 3px 10px;
        border: 1px solid #000;
        border-radius: 16px;
      }
    }
  }
}
.leaderboard {
  background: #ffffff;
  margin: 8px 0;
  padding: 10px;
  .title {
    font-size: 12px;
    padding: 8px;
    color: gray;
  }
  .item {
    display: flex;
    padding: 8px 0;
    .icon-wrapper {
      width: 36px;
      height: 36px;
      margin: 8px;
      background: #f4f5ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      > .icon {
        width: 30px;
        height: 30px;
        color: gray;
      }
    }
    .info-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
      // justify-content: center;
      margin-right: 16px;
      .info {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
      }
      &::after {
        content: "";
        width: 100%;
        height: 2px;
        border: 1px solid #85a4ff;
        background: #85a4ff;
        border-radius: 4px;
      }
    }
  }
}
</style>
