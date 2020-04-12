<template>
  <Layout>
    <UserHeader></UserHeader>
    <div class="bill">
      <p>账单</p>
      <div>
        <span class="month"><span>04</span>月</span>
        <ol>
          <li>
            <span>收入</span>
            <span>0.00</span>
          </li>
          <li>
            <span>支出</span>
            <span>0.00</span>
          </li>
          <li>
            <span>结余</span>
            <span>0.00</span>
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
        <router-link to="/version">
          <li>
            <span>
              <Icon name="help"></Icon>
              <span>帮助</span>
            </span>
            <Icon name="right"></Icon>
          </li>
        </router-link>
        <router-link to="/version">
          <li class="last">
            <span>
              <Icon name="version"></Icon>
              <span>版本介绍</span>
            </span>
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
import UserHeader from "@/components/User/UserHeader.vue";

@Component({
  components: {
    UserHeader
  }
})
export default class User extends Vue {}
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
        padding: 0 4vw;
        display: flex;
        flex-direction: column;
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
  }
  .last {
    border: none;
  }
}
</style>
