<template>
  <Layout class-prefix="home">
    <HomeHeader :month="getRecentMonth()" :total="getMonthTotal()"></HomeHeader>
    <ol v-if="groupedList.length>0" class="statistics">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>支出：￥{{group.totalExponse}}</span>
          <span>收入：￥{{group.totalIncome}}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span class="statistics-tags">
              <Icon :name="item.tag.name"></Icon>
            </span>
            <span class="statistics-tags">{{ item.tag.value }}</span>
            <span class="statistics-notes">{{ item.notes }}</span>
            <span>{{item.type}}{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录</div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import HomeHeader from "@/components/HomeHeader.vue";
import clone from "@/lib/clone";
import dayjs from "dayjs";

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
export default class Home extends Vue {
  created() {
    this.$store.commit("fetchRecords");
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
      return day.format("MM月D日");
    } else {
      return day.format("YYYY年MM月D日");
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  createList() {
    return clone(this.recordList).sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
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
        value: dayjs().format("M")
      });
    } else {
      let monthList = [
        ...new Set(
          this.createList().map(item => dayjs(item.createdAt).format("M"))
        )
      ]; // 或者 return Array.from(new Set(array))
      monthList = monthList.length >= 3 ? monthList.splice(3) : monthList;
      monthList.map(item => {
        recentMonth.push({ text: item + "月", value: item });
      });
    }
    return recentMonth;
  }

  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }

    const newList = this.createList();
    if (newList.length === 0) {
      return [];
    }

    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        totalExponse: 0,
        totalIncome: 0,
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
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
%item {
  padding: 0 16px;
  min-height: 40px;
  // padding: 8px 16px;
  // line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.statistics {
  margin-top: 12vh;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.statistics-tags {
  white-space: nowrap;
}
.statistics-notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
}
</style>