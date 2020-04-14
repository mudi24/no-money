<template>
  <Layout>
    <UserHeader></UserHeader>
    <div class="bill">
      <p>账单</p>
      <div>
        <span class="month"
          ><span>{{ month }}</span
          >月</span
        >
        <ol>
          <li>
            <span>收入</span>
            <span>{{ beautifyAccount(totalIncome) }}</span>
          </li>
          <li>
            <span>支出</span>
            <span>{{ beautifyAccount(totalExponse) }}</span>
          </li>
          <li>
            <span>结余</span>
            <span>{{ beautifyAccount(remaining) }}</span>
          </li>
        </ol>
      </div>
    </div>
    <div>
      <ul>
        <router-link to="/userInfo">
          <li>
            <span>
              <Icon name="info"></Icon>
              <span>个人信息</span>
            </span>
            <Icon name="right"></Icon>
          </li>
        </router-link>
        <router-link to="/message">
          <li>
            <span>
              <Icon name="message"></Icon>
              <span>我的消息</span>
            </span>
            <Icon name="right"></Icon>
          </li>
        </router-link>
        <router-link to="/version">
          <li class="last">
            <span>
              <Icon name="version"></Icon>
              <span>关于钱夕夕</span>
            </span>
            <span class="version">v1.0.0</span>
            <Icon name="right"></Icon>
          </li>
        </router-link>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import dayjs from "dayjs";
import { mixins } from "vue-class-component";
import UserHeader from "@/components/User/UserHeader.vue";
import BeautifyAccount from "@/mixins/BeautifyAccount";

@Component({
  components: {
    UserHeader
  }
})
export default class User extends mixins(BeautifyAccount) {
  month = "";
  totalIncome = 0;
  totalExponse = 0;
  remaining = 0;
  created() {
    this.month = dayjs().format("MM");
    this.$store.commit("fetchRecords");
    this.totalIncome = this.getMonthTotal(this.month, "+");
    this.totalExponse = this.getMonthTotal(this.month, "-");
    this.remaining = this.totalIncome - this.totalExponse;
  }
  getMonthTotal(month: string, type: string) {
    return this.$store.state.recordList
      .filter(
        (i: RecordItem) =>
          dayjs(i.createdAt).format("MM") === month && i.type === type
      )
      .reduce((sum: number, item: RecordItem) => {
        return sum + item.amount;
      }, 0);
  }
}
</script>

<style lang="scss" scoped>
.bill {
  margin: 20px 15px;
  background: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  div {
    margin-top: 8px;
    display: flex;
    .month {
      padding-right: 1em;
      border-right: 1px solid #333;
      height: 48px;
      line-height: 48px;
      > span {
        font-size: 24px;
      }
    }
    ol {
      display: flex;
      flex: 1;
      justify-content: space-between;
      li {
        padding: 0 3vw;
        display: flex;
        flex-direction: column;
        span {
          text-align: center;
        }
      }
    }
  }
}
ul {
  margin: 20px 15px;
  border-radius: 8px;
  background: #fff;
  li {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    span > .icon {
      margin-right: 12px;
      color: #cbb2fb;
    }
    .version {
      color: gray;
    }
  }
  .last {
    border: none;
  }
}
</style>
