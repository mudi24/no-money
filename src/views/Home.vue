<template>
  <Layout class-prefix="home">
    <header>
      <div class="time">
        <span class="title">2019</span>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div class="item income">
        <span class="title">收入</span>
        <span class="content">￥689.00</span>
      </div>
      <div class="item expense">
        <span class="title">支出</span>
        <span class="content">￥629.00</span>
      </div>
    </header>
  </Layout>
</template>

<style lang="scss" >
header {
  display: flex;
  flex-wrap: nowrap;
  background: #403f67;
  color: white;
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
    .van-dropdown-menu__item {
      > .van-dropdown-menu__title {
        font-size: 18px;
        color: white;
        > &::after {
          border-color: transparent transparent white white;
        }
      }
    }
  }
}
</style>

<script lang='js'>

export default {
  name: "home",
  data() {
    return {
      value1: 0,
      option1: [
        { text: '10月', value: 0 },
        { text: '10月', value: 1 },
        { text: '10月', value: 2 }
      ],
      
    }
  }
};
</script>
