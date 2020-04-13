<template>
  <div>
    <router-link to="/user" class="icon-wrapper">
      <Icon name="left"></Icon>
    </router-link>
    <p>{{ title }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class TopBar extends Vue {
  @Prop({ required: true }) readonly title!: string;
}
</script>

<style lang="scss" scoped>
div {
  background: #403f67;
  color: white;
  font-size: 20px;
  position: relative;
  text-align: center;
  padding: 2vh 0;
  .icon-wrapper {
    position: absolute;
    font-size: 24px;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    padding: 8px 10px;
  }
}
</style>
