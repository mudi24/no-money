<template>
  <layout class="version">
    <header>
      <TopBar title="关于钱夕夕" />
    </header>
    <main>
      <h3>钱夕夕使用帮助</h3>
      <ol>
        <li>
          <h4>1、查看月份记账明细</h4>
          <p>
            通过点击选择月份来查看账目，仅可查看当前日期最近的三个月的记录。
          </p>
          <img src="@/assets/images/home.jpg" alt="" />
        </li>
        <li>
          <h4>2、不同的图表类型</h4>
          <p>
            折线图展示的是最近七天每天的金额， 而饼图展示的是月、年总和的占比，
            通过百分比的形式让您对支出和收入有个心理判断和预知
          </p>
          <img src="@/assets/images/chart.jpg" alt="" />
        </li>
        <li>
          <h4>3、推荐记账时备注</h4>
          <p>
            我们建议您每次记账的时候，记录2-4个字的备注，方便您未来能够识别具体的消费明细。（金额为
            0 不会保存到账目中）
          </p>
          <img src="@/assets/images/edit.jpg" alt="" />
        </li>
        <li>
          <h4>4、记账正确习惯</h4>
          <p>
            我们建议您养成消费后及时记账的习惯，这样才能帮助您未来对收支情况进行有效的分析。
          </p>
        </li>
      </ol>
    </main>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TopBar from "./TopBar.vue";

@Component({
  components: { TopBar },
})
export default class Version extends Vue {}
</script>

<style lang="scss" scoped>
header {
  position: absolute;
  width: 100vw;
}
main {
  margin-top: calc(4vh + 20px);
  padding: 20px 10px;
  ol {
    li {
      margin: 12px 8px;
      p {
        text-indent: 2em;
      }
    }
    img {
      display: block;
      margin: 0 auto;
      width: 70vw;
      height: 70vh;
    }
    @media screen and(min-height: 800px) {
      img {
        height: 60vh;
      }
    }
  }
}
</style>
