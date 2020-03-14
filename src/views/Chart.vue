<template>
  <Layout>
    <ChartHeader
      :dataSource="tabsInfo"
      @update:value="changeDateType"
    ></ChartHeader>
    <main>
      <div class="chart-wrapper">
        <div class="chart-title">
          <div class="chart-title-left">
            <span class="info">{{ currentMonth }}，{{ typeText }}总额</span>
            <span
              class="amount"
              :class="{ [type === '-' ? 'exponse' : 'income']: true }"
              >￥{{ totalAmount }}</span
            >
          </div>
          <div class="chart-title-right">
            <span class="exponse" :class="liClass('-')" @click="changeType('-')"
              >支出</span
            >
            <span class="income" :class="liClass('+')" @click="changeType('+')"
              >收入</span
            >
          </div>
        </div>
        <Echarts
          :chartOption="currentChartOption"
          :type="typeText"
          :dateType="dateType"
        ></Echarts>
      </div>
      <div class="leaderboard">
        <p class="title">本周{{ typeText }}排行榜</p>
        <ol v-for="item in leaderboardData" :key="item.name">
          <li class="item">
            <span class="icon-wrapper">
              <Icon :name="item.tagValue"></Icon>
            </span>
            <div class="info-wrapper">
              <div class="info">
                <span class="tag">{{ item.name }}</span>
                <span class="amount">{{ beautifyAccount(item.value) }}</span>
              </div>
              <span
                class="line"
                ref="xxx"
                :style="{
                  width: (item.value / leaderboardData[0].value) * 100 + '%'
                }"
              ></span>
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
import BeautifyAccount from "@/mixins/BeautifyAccount";
import Echarts from "@/components/Echarts.vue";
import clone from "@/lib/clone";

@Component({
  components: {
    ChartHeader,
    Echarts
  }
})
export default class Chart extends mixins(FilterRecordList, BeautifyAccount) {
  tabsInfo = ["周", "月", "年"];
  dateType = "周";
  type = "-";
  currentMonth = "";
  totalAmount: number = 0;
  currentChartOption: ChartOption[] = [];
  leaderboardData: ChartOption[] = [];
  created() {
    this.$store.commit("fetchRecords");
    this.getChartInfo(this.dateType, this.type);
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  getChartInfo(selectedMonth: string, type: string) {
    this.currentMonth = this.getCurrentMonthOrYear(selectedMonth);
    this.currentChartOption = this.getMonthOptionList(this.currentMonth, type);
    this.leaderboardData =
      this.dateType === "周"
        ? this.getWeekLeaderboard(this.dateType, this.type)
        : this.currentChartOption.sort((a, b) => b.value - a.value);

    this.totalAmount = this.getTotalAmount(this.currentMonth, type);
  }
  get typeText() {
    return this.type === "-" ? "支出" : "收入";
  }
  liClass(type: string) {
    return {
      selected: this.type === type
    };
  }
  changeDateType(dateType: string) {
    this.dateType = dateType;
    this.getChartInfo(dateType, this.type);
  }
  changeType(type: string) {
    this.type = type;
    this.getChartInfo(this.dateType, type);
  }
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 114px;
}
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
        &.exponse {
          color: #403f67;
        }
        &.income {
          color: #29c98d;
        }
      }
    }
    .chart-title-right {
      padding: 8px;
      font-size: 12px;
      .exponse {
        padding: 3px 10px;
        border-radius: 16px;
        &.selected {
          border: 1px solid #403f67;
          background: #403f67;
          color: white;
        }
      }
      .income {
        margin-left: 2em;
        padding: 3px 10px;
        border-radius: 16px;
        &.selected {
          border: 1px solid #29c98d;
          background: #29c98d;
          color: white;
        }
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
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      > .icon {
        width: 30px;
        height: 30px;
      }
    }
    .info-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-right: 16px;
      .info {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
      }
      .line {
        width: 100%;
        height: 4px;
        border: 1px solid #dae8ff;
        background: #dae8ff;
        border-radius: 4px;
      }
    }
  }
}
</style>
