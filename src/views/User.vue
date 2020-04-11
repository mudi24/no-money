<template>
  <Layout>
    <UserHeader></UserHeader>
    <div>
      <ul>
        <router-link to="/userInfo">
          <li>
            <span>
              <Icon name="home"></Icon>
              <span>用户信息</span>
            </span>
            <Icon name="right"></Icon>
          </li>
        </router-link>
        <router-link to="/version">
          <li>
            <span>
              <Icon name="home"></Icon>
              <span>系统设置</span>
            </span>
            <Icon name="right"></Icon>
          </li>
        </router-link>
        <router-link to="/version">
          <li class="last">
            <span>
              <Icon name="home"></Icon>
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
ul {
  margin: 20px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  li {
    padding: 16px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    span > .icon {
      margin-right: 8px;
      color: #cbb2fb;
    }
  }
  .last {
    border: none;
  }
}
</style>
