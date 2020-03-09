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
        <div class="chart"></div>
      </div>
      <div class="leaderboard">本周支出排行榜</div>
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

@Component({
  components: {
    ChartHeader
  }
})
export default class Chart extends mixins(FilterRecordList) {
  tabsInfo = ["周", "月", "年"];
  currentMonth = "";
  created() {
    this.$store.commit("fetchRecords");
    const currentMonth = this.getCurrentMonthOrYear("月");
    const x = this.changeMonth(currentMonth);
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
  .chart {
    width: 100%;
    height: 120px;
  }
}
</style>
