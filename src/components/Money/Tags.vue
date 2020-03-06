<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.value"
        @click="toggle(tag)"
        :class="{selected:selected(tag)}"
      >
        <span class="icon-wrapper">
          <Icon :name="`${tag.name}`"></Icon>
        </span>
        <span class="tagName">{{tag.value}}</span>
      </li>
      <li>
        <span class="icon-wrapper">
          <Icon name="add"></Icon>
        </span>
        <span class="tagName">添加</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import TagHelper from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import { expenseTags, incomeTags } from "@/constants/tagList";

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop() type!: string;

  selectedTag: Tag = { name: "food", value: "餐饮" };
  expenseTags = expenseTags;
  incomeTags = incomeTags;
  created() {
    this.$store.commit("fetchTags");
  }
  get tagList() {
    return this.$store.state.tagList;
  }
  selected(tag: Tag) {
    if (
      this.selectedTag.name === tag.name &&
      this.selectedTag.value === tag.value
    ) {
      return true;
    }
    return false;
  }
  toggle(tag: Tag) {
    this.selectedTag = tag;
    this.$emit("update:selectedTag", this.selectedTag);
  }
}
</script>

<style lang='scss' scoped>
.tags {
  height: 60vh;
  background: #fefefe;
  display: flex;
  flex-wrap: wrap;
  margin: 12px 0;
  padding: 8px;
  > .current {
    width: 100%;
    height: 100%;
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 20%;
      height: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      > .icon-wrapper {
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
        > .tagName {
          margin: 8px;
        }
      }
      &.selected {
        .icon {
          color: #fee0a5;
        }
      }
    }
  }
}
</style>
