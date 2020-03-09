import Vue from 'vue';
import Component from 'vue-class-component'
import clone from '@/lib/clone';
import dayjs from "dayjs";


@Component
class FilterRecordList extends Vue {
  created() {
    this.$store.commit("fetchRecords");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  createList() {
    return clone(this.recordList).sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
  }
  changeMonth(selectedMonth: string) {
    return this.createList().filter(
      item => dayjs(item.createdAt).format("M") === selectedMonth
    );
  }
  getCurrentMonthOrYear(newRecordTime: string) {
    const { recordList } = this;
    newRecordTime = newRecordTime === '月' ? 'M' : 'YYYY'
    return dayjs(recordList[recordList.length - 1].createdAt).format(newRecordTime);
  }

}

export default FilterRecordList