<template>
  <div class="info">
    <header>
      <div>
        <router-link to="/user" class="icon-wrapper">
          <Icon name="left"></Icon>
        </router-link>
        <p>个人信息</p>
      </div>
    </header>
    <main>
      <ul>
        <li>
          <span>ID</span>
          <span class="id">8888</span>
        </li>
        <li>
          <span>昵称</span>
          <label for="name">
            <input
              type="text"
              id="name"
              name="name"
              v-model="user.nickname"
              required
              minlength="1"
              maxlength="8"
              size="10"
            />
            <Icon name="edit"></Icon>
          </label>
        </li>
        <li>
          <div>
            <span>性别</span>
            <van-action-sheet
              v-model="show"
              :actions="actions"
              @select="onSelect"
            />
          </div>
          <span class="gender" @click="show = true"
            >{{ user.gender }}
            <Icon name="edit"></Icon>
          </span>
        </li>
        <li>
          <span>手机号</span>
          <label for="telNo">
            <input
              id="telNo"
              type="tel"
              name="telNo"
              v-model="user.tel"
              required
              @keyup="onKeyUp"
              minlength="11"
              maxlength="11"
              size="10"
            />
            <Icon name="edit"></Icon>
          </label>
        </li>
      </ul>
      <button class="save" @click="saveInfo">保存</button>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class UserInfo extends Vue {
  user: User = {
    nickname: "",
    gender: "",
    tel: ""
  };
  show = false;
  actions = [{ name: "男" }, { name: "女" }];
  created() {
    this.$store.commit("fetchUser");
    this.user = this.$store.state.user;
  }
  onSelect(item: any) {
    this.show = false;
    this.user.gender = item.name;
  }
  onKeyUp() {
    this.user.tel = this.user.tel.replace(/[^\d]/g, "");
  }
  saveInfo() {
    console.log(this.user);

    this.$store.commit("saveUser", this.user);
    this.$router.push({ path: "/user" });
  }
}
</script>

<style lang="scss" scoped>
header {
  background: #403f67;
  color: white;
  font-size: 20px;
  div {
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
}
main {
  input {
    outline: none;
    border: none;
    text-align: right;
    margin-left: auto;
    width: 40vw;
  }
  .icon {
    margin-left: 0.5em;
    color: #408aff;
  }
  .id {
    margin-right: 1em;
  }
  .gender {
    width: 40vw;
    text-align: right;
  }
  ul {
    padding: 0 6vw;
    font-size: 16px;
    background: #fff;
    li {
      display: flex;
      justify-content: space-between;
      padding: 2vh 0;
      border-bottom: 1px solid #ccc;
      &:last-child {
        border: none;
      }
    }
  }
  .save {
    margin: 5vh auto;
    display: block;
    width: 80vw;
    height: 6vh;
    background: #1989fa;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 4px;
  }
}
</style>
