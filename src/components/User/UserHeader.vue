<template>
  <div class="header">
    <div class="img-wrapper">
      <img src="@/assets/images/avatar.jpg" alt="头像" />
      <span>{{ $store.state.user.nickname }}</span>
    </div>
    <div>
      <div class="count">
        <span>688</span>
        <span>460</span>
        <span>1369</span>
      </div>
      <div class="type">
        <span>已连续记账</span>
        <span>记账总天数</span>
        <span>记账总笔数</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class UserHeader extends Vue {
  created() {
    this.$store.commit("fetchUser");
  }
}
</script>

<style lang="scss" scoped>
.header {
  color: #ebebec;
  padding: 5vh 4vw 2vh 4vw;
  background: #26232a;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  .img-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4vh;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 8px;
    }
  }
  .count {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    font: bold 18px sans-serif;
    span {
      text-align: center;
      width: 33.33%;
    }
  }
  .type {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    span {
      width: 33.33%;
      text-align: center;
    }
  }
}
</style>
