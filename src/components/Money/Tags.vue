<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.value"
        @click="toggle(tag)"
        :class="{ selected: selected(tag) }"
      >
        <span class="icon-wrapper">
          <Icon :name="tag.name"></Icon>
        </span>
        <span class="tagName">{{ tag.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import TagHelper from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import { expenseTags, incomeTags } from "@/constants/tagList";

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop() type!: string;
  @Prop() selectedTag!: Tag;
  @Watch("selectedTag")
  onTagChange() {
    this.recordTag = this.selectedTag;
  }
  expenseTags = expenseTags;
  incomeTags = incomeTags;
  recordTag = this.selectedTag;
  get tagList() {
    return this.type === "-" ? expenseTags : incomeTags;
  }
  selected(tag: Tag) {
    if (
      this.recordTag.name === tag.name &&
      this.recordTag.value === tag.value
    ) {
      return true;
    }
    return false;
  }
  toggle(tag: Tag) {
    this.recordTag = tag;
    this.$emit("update:selectedTag", this.recordTag);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  height: 60vh;
  background: #fefefe;
  display: flex;
  flex-wrap: wrap;
  margin: 12px 0;
  padding: 8px;
  .current {
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
      .icon-wrapper {
        width: 36px;
        height: 36px;
        margin: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
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
          color: #ffb3b3;
        }
      }
    }
  }
}
</style>
