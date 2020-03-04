<template>
  <Layout class-prefix="editLabel">
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
        <span class="name">
          <span class="icon-wrapper">
            <Icon name="food"></Icon>
          </span>
          <span class="tagName">餐饮</span>
        </span>
        <input type="text" value="0.00" @focus="showNumberPad" />
      </label>
      <Tags></Tags>
      <NumberPad :show="show"></NumberPad>
    </main>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

@Component({ components: { Tags, NumberPad } })
export default class EditLabel extends Vue {
  show = "hide";
  mounted() {
    console.log(this.show);
  }
  showNumberPad() {
    this.show = "show";
  }
}
</script>

<style lang='scss' scoped>
.editLabel-wrapper {
  overflow: hidden;
}
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
    padding: 8px;
    display: flex;
    justify-content: space-between;
    .name {
      display: flex;
      justify-content: center;
      .icon-wrapper {
        width: 36px;
        height: 36px;
        margin: 8px;
        background: #f4f5ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        > .icon {
          width: 30px;
          height: 30px;
          color: gray;
        }
      }
      > .tagName {
        margin: auto 0;
      }
    }
    > input {
      text-align: right;
      background: transparent;
      border: none;
    }
  }

  // .numberPad {
  //   position: absolute;
  //   left: 0;
  //   bottom: -50%;
  // }
}
</style>
