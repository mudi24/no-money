<template>
  <div class="ChartHeader">
    <div class="title">
      <p>折线统计图</p>
      <span class="icon-wrapper">
        <Icon name="food"></Icon>
      </span>
    </div>
    <div class="tabs-wrapper">
      <ul class="tabs">
        <li
          class="tabs-item"
          v-for="item in dataSource"
          :key="item"
          :class="liClass(item)"
          @click="select(item)"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: string[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  currentSelected = "周";
  liClass(item: string) {
    return {
      selected: item === this.currentSelected
    };
  }
  select(item: string) {
    this.currentSelected = item;
    this.$emit("update:value", item);
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/style/helper.scss";
.ChartHeader {
  background: #403f67;
  color: white;
  .title {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    padding: 16px;
    position: relative;
    .icon-wrapper {
      margin-right: 24px;
      position: absolute;
      right: 0;
      .icon {
        width: 20px;
        height: 20px;
      }
    }
  }
  .tabs-wrapper {
    padding: 10px 0 16px 0;
    .tabs {
      display: flex;
      text-align: center;
      font-size: 14px;
      margin: 0 24px;
      &-item {
        width: 33.33%;
        height: 32px;
        border: 1px solid gray;
        display: flex;
        justify-content: center;
        align-items: center;
        &:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        &:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        &.selected {
          color: black;
          background: white;
        }
      }
    }
  }
}
</style>
