<template>
  <div class="header">
    <div class="time">
      <span class="title">2019</span>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </div>
    <div class="item income">
      <span class="title">收入</span>
      <span class="content">￥{{total.income}}</span>
    </div>
    <div class="item expense">
      <span class="title">支出</span>
      <span class="content">￥{{total.exponse}}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class HomeHeader extends Vue {
  @Prop() readonly total!: {
    exponse: number;
    income: number;
  };
  @Prop() readonly month!: Month[];
  value1 = this.month[0].value;
  option1 = this.month;
}
</script>

<style lang='scss' scoped>
.header {
  position: absolute;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  background: #403f67;
  color: white;
  height: 12vh;
  > .item {
    margin: 8px;
    display: flex;
    flex-direction: column;
    width: 35%;
    > .title {
      color: #d7d6df;
      font-size: 16px;
    }
    > .content {
      padding: 8px 0;
      font-weight: 600;
    }
  }
  .time {
    width: 30%;
    text-align: start;
    margin: 8px 8px 0 8px;
    > .title {
      color: #d7d6df;
      font-size: 16px;
      margin: 8px 16px;
    }
  }
  .van-dropdown-menu {
    margin-top: 5px;
    margin-bottom: 10px;
    background: #403f67;
    width: 70%;
    height: 30px;
    font-size: 16px;
    font-weight: 600;

    &.van-hairline--top-bottom {
      position: static; // 可能是 VantUI 的bug
    }
  }
}
</style>
