<template>
  <Layout>
    <ChartHeader :dataSource="tabsInfo"></ChartHeader>
    <main></main>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import ChartHeader from "@/components/ChartHeader.vue";

@Component({
  components: {
    ChartHeader
  }
})
export default class Chart extends Vue {
  tabsInfo = ["周", "月", "年"];
}
</script>

<style lang="scss" scoped>
</style>
