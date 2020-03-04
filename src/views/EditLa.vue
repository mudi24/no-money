<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"></Icon>
      <span class="title">编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="currentTag.name"
        @update:value="updateTag"
        field-name="标签名"
        placeholder="请输入标签名"
      ></FormItem>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { FormItem, Button }
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", this.$route.params.id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  goBack() {
    this.$router.back();
  }
  updateTag(name: string) {
    console.log("sss");

    if (this.currentTag) {
      this.$store.commit("updateTag", { id: this.currentTag.id, name });
    }
  }
  remove() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
    } else {
      window.alert("删除失败");
    }
  }
}
</script>

<style lang='scss' scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  position: relative;
  padding: 12px;
  background: white;
  > .leftIcon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>
