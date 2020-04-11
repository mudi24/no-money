<template>
  <div class="header">
    <div class="title">
      <span class="time">{{ year }}</span>
      <span class="time">收入</span>
      <span class="time">支出</span>
    </div>
    <div class="content">
      <span>
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            @change="change"
          />
        </van-dropdown-menu>
      </span>
      <span>￥{{ beautifyAccount(total.income) }}</span>
      <span>￥{{ beautifyAccount(total.exponse) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import dayjs from "dayjs";
import { mixins } from "vue-class-component";
import BeautifyAccount from "@/mixins/BeautifyAccount";

@Component
export default class HomeHeader extends mixins(BeautifyAccount) {
  @Prop() readonly total!: {
    exponse: number;
    income: number;
  };
  @Prop() readonly month!: Month[];
  value1 = this.month[0].value;
  year = this.month[0].value.split("/")[0];
  option1 = this.month;
  // option1 = [
  //   { text: "3月", value: "2020/03" },
  //   { text: "2月", value: "2020/02" }
  // ];
  change() {
    this.$emit("update:month", this.value1);
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #403f67;
  color: white;
  width: 100vw;
  .title {
    margin-top: 16px;
    margin-left: 30px;
    display: flex;
    color: #d7d6df;
    > span {
      width: 33.33%;
    }
  }
  .content {
    margin-top: 8px;
    margin-left: 8px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    > span {
      width: 33.33%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 18px;
      font-weight: 600;
    }
    .van-dropdown-menu {
      width: 80px;
      height: 30px;
      background: #403f67;
      font-size: 16px;
      font-weight: 600;
      &.van-hairline--top-bottom {
        position: static; // 可能是 VantUI 的bug
      }
    }
  }
}
</style>
