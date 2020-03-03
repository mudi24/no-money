<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :value.sync="record.type" class-prefix="type" :data-source="recordTypeList" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
    </div>
    <Tags @update:value="onUpdateTags" />
  </Layout>
</template>

<style lang="scss" >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tags, FormItem, Tabs, NumberPad }
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0
  };
  recordTypeList = recordTypeList;
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateTags(value: []) {
    this.record.tags = value;
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("请至少选择一个标签");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
    }
    this.record.notes = "";

    // this.record.tags = [];
  }
}
</script>



// 数据迁移
// const version = window.localStorage.getItem("version");
// if (version === "0.0.1") {
//   // 数据库升级，数据迁移
//   recordList.forEach(record => {
//     record.createdAt = new Date(2020, 0, 1);
//   });
//   // 保存数据
//   window.localStorage.setItem("recordList", JSON.stringify(recordList));
// }
// window.localStorage.setItem("version", "0.0.2");