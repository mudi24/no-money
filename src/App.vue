<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background: #f5f5f5;
  // background: #f0f3f6;
}
// Vant UI样式
.van-dropdown-menu__item {
  > .van-dropdown-menu__title {
    font-size: 18px;
    color: white;
    > &::after {
      border-color: transparent transparent white white;
    }
  }
}
</style>
