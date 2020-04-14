<template>
  <Layout>
    <div>
      <header>
        <span>晒成就</span>
        <span class="icon-wrapper">
          <Icon name="share" />
        </span>
      </header>
      <main>
        <div class="result">
          <h4>我的成就</h4>
          <div class="img-wrapper">
            <img src="@/assets/images/avatar.jpg" alt="头像" />
            <span>{{ $store.state.user.nickname }}</span>
          </div>
          <div class="account">
            <div class="count">
              <span>
                <strong>
                  688
                </strong>
                天
              </span>
              <span>
                <strong>460</strong>
                天
              </span>
              <span>
                <strong>1369</strong>
                笔
              </span>
            </div>
            <div class="type">
              <span>已连续记账</span>
              <span>记账总天数</span>
              <span>记账总笔数</span>
            </div>
          </div>
          <div class="bottom-bar">
            <div class="title">
              <img
                class="money-box"
                src="@/assets/images/money-box.png"
                alt=""
              />
              <span class="text">
                <strong>钱夕夕</strong>
                <span>快速记账</span>
              </span>
            </div>
            <span class="qrcode-wrapper">
              <img class="qrcode" src="@/assets/images/qrcode.png" alt="" />
              <span>扫码加入财务自由之路</span>
            </span>
          </div>
        </div>
      </main>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Discover extends Vue {
  hide = true;
}
</script>

<style lang="scss" scoped>
header {
  background: #403f67;
  color: white;
  font-size: 20px;
  position: relative;
  text-align: center;
  padding: 2vh 0;
  .icon-wrapper {
    position: absolute;
    font-size: 24px;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    padding: 8px 10px;
  }
}
main {
  padding: 6vh 10vw;
  .result {
    background: #fff;
    border: 1px solid #ccc;
    h4 {
      padding: 0.8em 0;
      font-size: 18px;
      text-align: center;
    }

    .img-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 3vh;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-bottom: 8px;
      }
    }
    .account {
      margin-bottom: 50px;
    }
    .count {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      font-size: 14px;
      span {
        text-align: center;
        width: 33.33%;
        strong {
          font-size: 18px;
        }
      }
    }
    .type {
      color: gray;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      span {
        width: 33.33%;
        text-align: center;
      }
    }
    .bottom-bar {
      background: #403f67;
      color: #fff;
      display: flex;
      justify-content: space-between;
      .title {
        display: flex;
        padding: 3vh 0 2vh 4vw;
        .money-box {
          width: 3em;
          height: 3em;
        }
        .text {
          display: flex;
          flex-direction: column;
          margin-top: 0.5vh;
          margin-left: 3vw;
          strong {
            font-weight: normal;
            font-size: 18px;
          }
          span {
            font-size: 14px;
          }
        }
      }
      .qrcode-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2vh 4vw 1vh 0;
        .qrcode {
          width: 3em;
          height: 3em;
          margin-bottom: 4px;
        }
        span {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
