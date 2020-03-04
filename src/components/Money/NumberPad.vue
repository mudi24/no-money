<template>
  <div class="numberPad" :class="`${show}`">
    <!-- <div class="output">{{output}}</div> -->
    <label class="notes">
      <span class="name">备注：</span>
      <input
        type="text"
        placeholder="点击输入备注"
        :value="value"
        @input="onValueChange($event.target.value)"
      />
    </label>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">确认</button>
      <button @click="clear">清空</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop() readonly value!: number;
  @Prop() readonly show!: string;
  output = this.value.toString();
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement; //断言写法1
    const input = button.textContent!; // 断言写法2 断言它不是null
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    this.$emit("update:value", parseFloat(this.output));
    this.$emit("submit", parseFloat(this.output));
    this.output = "0";
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  background: #393960;
  color: white;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -50%;
  transition: all 0.3s;
  &.show {
    bottom: 60px;
  }
  .notes {
    padding: 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    > .name {
      padding-right: 16px;
    }
    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: 1px solid #8d8ea6;
      &.ok {
        height: 64 * 2px;
        background: #25c489;
        float: right;
      }
    }
  }
}
</style>
