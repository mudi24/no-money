import Vue from 'vue';
import Component from 'vue-class-component'



@Component
class BeautifyAccount extends Vue {
  beautifyAccount(account: number | string) {
    if (typeof account === 'number') {
      account = account.toString()
    }
    const decimalPlaces = account.indexOf('.') >= 0 ? account.split(".")[1].length : 0
    if (decimalPlaces === 0) {
      return account += '.00'
    } else if (decimalPlaces === 1) {
      return account += '0'
    } else if (decimalPlaces === 2) {
      return account
    }
  }
}

export default BeautifyAccount