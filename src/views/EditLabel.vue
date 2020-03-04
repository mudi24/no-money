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
      <label class="amount">
        <span class="name">餐饮</span>
        <input type="text" value="0.00" />
      </label>
      <Tags></Tags>
    </main>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";

@Component({ components: { Tags } })
export default class EditLabel extends Vue {}
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
    > input {
      text-align: right;
      background: transparent;
      border: none;
    }
  }
}
</style>
