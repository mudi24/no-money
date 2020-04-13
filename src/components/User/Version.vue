<template>
  <div class="version">
    <header>
      <TopBar title="关于钱夕夕" />
    </header>
    <main>
      <h3>钱夕夕使用帮助</h3>
      <ol>
        <li>
          <h4>1、主页</h4>
          通过点击选择月份来查看账目，仅可选择当前日期最近的三个月。
        </li>
        <li>
          <h4>2、图表</h4>
          点击选项卡查看最近七天，本月，本年记录账目绘制成的图标。点击切换收入支出
        </li>
        <li>
          <h4>3、记账</h4>
          <p>
            选择图标，点击输入框弹出数字键盘，输入备注和金额后点击确认按钮即可保存。
            （金额为 0 不会保存到账目中）
          </p>
        </li>
        <li>
          <h4>3、分享</h4>
          分享
        </li>
        <li>
          <h4>4、用户</h4>
          <p>点击进入个人信息页面，修改用户信息完成后点击保存即可。</p>
        </li>
      </ol>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TopBar from "./TopBar.vue";

@Component({
  components: { TopBar }
})
export default class Version extends Vue {}
</script>

<style lang="" scoped></style>
