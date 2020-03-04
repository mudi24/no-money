<template>
  <nav>
    <router-link to="/Home" class="item" active-class="selected">
      <Icon name="home" />主页
    </router-link>
    <router-link to="/Labels" class="item" active-class="selected">
      <Icon name="chart" />图表
    </router-link>
    <router-link to="/EditLabel" class="addTag" active-class="selected">
      <Icon name="add" />
    </router-link>
    <router-link to="/DiscoverMore" class="item" active-class="selected">
      <Icon name="find" />发现
    </router-link>
    <router-link to="/UserInfo" class="item" active-class="selected">
      <Icon name="me" />我的
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav"
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  background: white;
  > .item {
    padding: 6px 0;
    width: 19%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 24px;
      height: 24px;
    }
  }
  > .item.selected {
    color: $color-highlight;
  }
  > .addTag {
    padding: 4px 0 8px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    color: #3b3b63;
    width: 24%;
    & > .icon {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
