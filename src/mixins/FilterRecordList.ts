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
      let arr = [];
      for (let i = 0; i <= 6; i++) {
        let currentWeekDay = dayjs().subtract(i, "day").format("MM/DD")
        arr.push(...this.createList().filter(
          item => dayjs(item.createdAt).format('MM/DD') === currentWeekDay
        ))
      }

      return arr
    }
  }
  getCurrentMonthOrYear(newRecordTime: string) {
    if (newRecordTime === '周') {
      const x = dayjs().format('MM/DD')
      const y = dayjs().subtract(6, "day").format("MM/DD")
      return (`${y}-${x}`)
    } else if (newRecordTime === '月') {
      return dayjs().format("YYYY/MM")
    } else {
      return dayjs().format('YYYY')
    }
  }
  getMonthOptionList(selectedMonth: string, type: string) {
    let arr: ChartOption[] = []

    if (selectedMonth.length === 11) {
      this.changeMonth(selectedMonth)!.filter(item => item.type === type).map(item => {
        const chartNameList = arr.map(i => i.name)
        if (chartNameList.indexOf(dayjs(item.createdAt).format('MM/DD')) >= 0) {
          arr.filter(i => i.name === dayjs(item.createdAt).format('MM/DD'))[0].value += item.amount
        } else {
          let chartItem: ChartOption = { name: '', value: 0 }
          chartItem.name = dayjs(item.createdAt).format('MM/DD')
          chartItem.value = item.amount
          arr.push(chartItem)
        }
      })
    } else {
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
    }
    return arr
  }
  getTotalAmount(selectedMonth: string, type: string) {
    return this.getMonthOptionList(selectedMonth, type).reduce((sum, item) => { return sum + item.value }, 0)
  }
}

export default FilterRecordList