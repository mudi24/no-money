<template>
  <Layout class-prefix="home">
    <HomeHeader
      :month="getRecentMonth()"
      :total="getMonthTotal()"
      @update:month="changeCurrentList($event)"
    ></HomeHeader>
    <div class="statistics">
      <ol v-if="groupedList.length > 0">
        <li v-for="(group, index) in groupedList" :key="index">
          <div class="title">
            <div>
              {{ beautify(group.title) }}
              <span class="weekDay">
                {{ getWeekDay(group.title) }}
              </span>
            </div>
            <div class="total">
              <span>支出：{{ beautifyAccount(group.totalExponse) }}</span>
              <span class="totalIncome"
                >收入：{{ beautifyAccount(group.totalIncome) }}</span
              >
            </div>
          </div>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <div class="statistics-left">
                <span class="tag-wrapper">
                  <Icon :name="item.tag.name"></Icon>
                </span>
                <span class="statistics-info">
                  <span class="statistics-tags-name">{{ item.tag.value }}</span>
                  <span class="statistics-notes">{{ item.notes }}</span>
                </span>
              </div>
              <span
                class="statistics-account"
                :class="{ [item.type === '-' ? 'exponse' : 'income']: true }"
                >{{ item.type }}{{ beautifyAccount(item.amount) }}</span
              >
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        <router-link to="/EditLabel" class="record-wrapper">
          <Icon name="notes" />
          <p>
            点击开始你的记账生活吧！
          </p>
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import HomeHeader from "@/components/HomeHeader.vue";
import clone from "@/lib/clone";
import dayjs from "dayjs";
import { mixins } from "vue-class-component";
import BeautifyAccount from "@/mixins/BeautifyAccount";
import FilterRecordList from "@/mixins/FilterRecordList";

type ResultItem = {
  title: string;
  totalExponse?: number;
  totalIncome?: number;
  items: RecordItem[];
};
type Result = ResultItem[];

@Component({
  components: { HomeHeader }
})
export default class Home extends mixins(BeautifyAccount, FilterRecordList) {
  currentRecordList: RecordItem[] = [];
  created() {
    this.$store.commit("fetchRecords");
    const currentMonth = this.getRecentMonth()[0].value; // 初始化记录列表（重要）
    this.changeCurrentList(currentMonth);
  }
  changeCurrentList(selectedMonth: string) {
    this.currentRecordList = this.changeMonth(selectedMonth);
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (dayjs(string).isSame(new Date(), "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月DD日");
    } else {
      return day.format("YYYY年MM月DD日");
    }
  }
  getWeekDay(string: string) {
    const cnWeek = {
      Mon: "周一",
      Tue: "周二",
      Wed: "周三",
      Thu: "周四",
      Fri: "周五",
      Sat: "周六",
      Sun: "周日"
    };
    type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
    const day = dayjs(string).format("ddd") as WeekDay;
    return cnWeek[day];
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  getDayTotal(group: ResultItem, type: string) {
    return group.items
      .filter(item => item.type === type)
      .reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
  }

  getRecentMonth() {
    let recentMonth: Month[] = [];
    if (this.recordList.length === 0) {
      recentMonth.push({
        text: dayjs().format("M") + "月",
        value: dayjs().format("YYYY/MM")
      });
    } else {
      let monthList = [
        ...new Set(
          this.createList().map(item => dayjs(item.createdAt).format("YYYY/MM"))
        )
      ]; // 或者 return Array.from(new Set(array))
      monthList = monthList.length >= 3 ? monthList.splice(3) : monthList;
      monthList.map(item => {
        recentMonth.push({ text: dayjs(item).format("M") + "月", value: item });
      });
    }
    return recentMonth;
  }

  get groupedList() {
    const { recordList } = this;
    const { currentRecordList } = this;
    if (recordList.length === 0) {
      return [];
    }

    if (currentRecordList.length === 0) {
      return [];
    }

    const result: Result = [
      {
        title: dayjs(currentRecordList[0].createdAt).format("YYYY-MM-DD"),
        totalExponse: 0,
        totalIncome: 0,
        items: [currentRecordList[0]]
      }
    ];
    for (let i = 1; i < currentRecordList.length; i++) {
      const current = currentRecordList[i];
      const last = result[result.length - 1];

      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          totalExponse: 0,
          totalIncome: 0,
          items: [current]
        });
      }
    }

    result.forEach(group => {
      group.totalExponse = this.getDayTotal(group, "-");
      group.totalIncome = this.getDayTotal(group, "+");
    });

    return result;
  }
  getMonthTotal() {
    let total = { exponse: 0, income: 0 };
    if (this.groupedList !== []) {
      const exponseList = this.groupedList.map(group => group.totalExponse);
      const incomeList = this.groupedList.map(group => group.totalIncome);
      if (exponseList.length !== 0) {
        total.exponse = exponseList.reduce((sum, item) => {
          return (sum as number) + (item as number);
        }, 0) as number;
      }
      if (incomeList.length !== 0) {
        total.income = incomeList.reduce((sum, item) => {
          return (sum as number) + (item as number);
        }, 0) as number;
      }
      return total;
    } else {
      return total;
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  height: calc(100% - 88px);
  margin-top: 88px;
  background: #ffffff;
}
.title {
  padding: 4px 16px;
  font-size: 12px;
  font-weight: 600;
  color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .weekDay {
    margin-left: 8px;
  }
  .totalIncome {
    margin-left: 2em;
  }
}

%item {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record {
  @extend %item;
  .statistics-left {
    display: flex;
    .tag-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      > .icon {
        width: 32px;
        height: 32px;
      }
    }
    .statistics-info {
      display: flex;
      flex-direction: column;
      margin-left: 8px;
      .statistics-notes {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: wrap;
      }
    }
  }
  .statistics-account {
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
.noResult {
  width: 200px;
  height: 100px;
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  .record-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .icon {
    width: 48px;
    height: 48px;
    transform: rotate(-30deg);
  }
  p {
    margin-top: 16px;
    font-size: 12px;
    color: gray;
  }
}
</style>
