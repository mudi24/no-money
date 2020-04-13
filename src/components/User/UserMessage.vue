<template>
  <div class="message">
    <header>
      <TopBar title="我的消息" />
    </header>
    <main>
      <div class="icon-wrapper">
        <Icon name="empty" />
      </div>
      <p>你还没有消息哦~</p>
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
export default class Message extends Vue {}
</script>

<style lang="scss" scoped>
main {
  .icon-wrapper {
    padding: 5vh 0;
    text-align: center;
    .icon {
      width: 8em;
      height: 8em;
    }
  }
  p {
    text-align: center;
    font-size: 12px;
    color: gray;
  }
}
</style>
