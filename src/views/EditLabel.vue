<template>
  <Layout class>
    <header class="header">
      <button>取消</button>
      <span class="toggleContent">
        <button class="toggle expense selected">支出</button>
        <button class="toggle income">收入</button>
      </span>
      <button>保存</button>
    </header>
    <main class="content">
      <div class="amount">
        <span class="icon">餐饮</span>
        <span class="icon">0.00</span>
      </div>
      <ol class="tags">
        <li>餐饮</li>
        <li>购物</li>
        <li>交通</li>
        <li>炸物</li>
        <li>理财</li>
        <li>购物</li>
        <li>餐饮</li>
        <li>购物</li>
        <li>交通</li>
        <li>炸物</li>
        <li>理财</li>
        <li>购物</li>
      </ol>
    </main>
  </Layout>
</template>

<script lang='js'>

export default {
  components: {},
  data () {
    return {

    };
  },
  methods: {

  }
};
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  justify-content: space-between;
  background: #403f67;
  padding: 16px;
  font-size: 14px;
  button {
    border: none;
    color: white;
    background: inherit;
  }
  .income {
    padding: 3px 16px;
    border: 1px solid white;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .expense {
    padding: 3px 16px;
    border: 1px solid white;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .toggle.selected {
    color: black;
    background: #fefefe;
  }
}
.content {
  background: #f0f3f6;
  .amount {
    background: #fefefe;
    padding: 12px;
    display: flex;
    justify-content: space-between;
  }
  .tags {
    height: 50vh;
    background: #fefefe;
    display: flex;
    flex-wrap: wrap;
    margin: 12px 0;
    > li {
      border: 1px solid #000;
      width: 20%;
      height: 60px;
    }
  }
}
</style>
