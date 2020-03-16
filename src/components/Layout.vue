<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav class="nav"></Nav>
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout",
  props: ["classPrefix"]
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  .content {
    // height: 92vh;
    overflow: auto;
    flex-grow: 1;
    margin-bottom: 8vh;
  }
  .nav {
    position: absolute;
    width: 100%;
    height: 8vh;
    bottom: 0;
    left: 0;
  }
}
</style>
