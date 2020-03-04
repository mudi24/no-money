<template>
  <Layout class-prefix="home">
    <HomeHeader></HomeHeader>
    <div>
      <div>
        <span>10月20日 周日</span>
        <span>支出：36.00</span>
        <span>收入：3.00</span>
      </div>
      <ol>
        <li>餐饮</li>
        <li>理财</li>
        <li>交通</li>
      </ol>
    </div>
  </Layout>
</template>

<style lang="scss" >
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

<script lang='js'>
import HomeHeader from '@/components/HomeHeader'

export default {
  name: "home",
  components:{HomeHeader},
  
};
</script>
