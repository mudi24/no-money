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
    if (selectedMonth.length === 4) {
      return this.createList().filter(
        item => dayjs(item.createdAt).format('YYYY') === selectedMonth)
    } else if (selectedMonth.length === 7) {
      return this.createList().filter(
        item => dayjs(item.createdAt).format('YYYY/MM') === selectedMonth
      )
    } else {
      this.createList().filter(
        item => dayjs(item.createdAt).format('YYYY/MM') === selectedMonth
      )
    }
  }
  getCurrentMonthOrYear(newRecordTime: string) {
    const { recordList } = this;
    const newTime = newRecordTime === '月' ? 'YYYY/MM' : 'YYYY'
    return dayjs(recordList[recordList.length - 1].createdAt).format(newTime);
  }
  getMonthOptionList(selectedMonth: string, type: string) {
    const arr: ChartOption[] = []
    this.changeMonth(selectedMonth)!.filter(item => item.type === type).map(item => {
      const chartNameList = arr.map(i => i.name)
      if (chartNameList.indexOf(item.tag.value) >= 0) {
        arr.filter(i => i.name === item.tag.value)[0].value += item.amount
      } else {
        let chartItem: ChartOption = { name: '', value: 0, tagValue: '' }
        chartItem.name = item.tag.value
        chartItem.tagValue = item.tag.name
        chartItem.value = item.amount
        arr.push(chartItem)
      }
    })
    return arr
  }
  getTotalAmount(selectedMonth: string, type: string) {
    return this.getMonthOptionList(selectedMonth, type).reduce((sum, item) => { return sum + item.value }, 0)
  }
}

export default FilterRecordList